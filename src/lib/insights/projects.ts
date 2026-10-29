import 'server-only'
import { unstable_cache } from 'next/cache'
import { zohoTableRows } from './zoho'
import { actionId } from './actions'
import { calendarPeriods, type RangeKey } from './ranges'

// Marketing team roadmap & execution for /internal-insights (Roadmap tab).
// Source: the Zoho Projects tables synced into Zoho Analytics ("Marketing Team Workspace"), as used
// by the "08 Roadmap and Execution" tab of the "Marketing Command Center - MW" dashboard.
// - Planned hours: "Task Work Hours Planned" by owner and date (whole calendar period, so future days count)
// - Logged hours: "Time Logs" by user and date
// - Tasks & status: tasks with planned hours in the period, per owner, by current status
// Checked against that dashboard for Oct 2026 (Dineshgandhi 146.4 h logged / 186 h planned; 36 closed, 4 in progress, 1 on hold).

const TABLES = {
  tasks: '2553974000072406278',
  users: '2553974000072406327',
  timeLogs: '2553974000072406349',
  projects: '2553974000072406377',
  plannedHours: '2553974000072406427',
}

/** The current marketing team (confirmed by Dg 2026-10-29; the head of marketing is not included) */
const TEAM = [
  'Christin Wong Li Yan', 'Deewakshi Shrestha', 'Dineshgandhi S', 'Kritika Arora', 'Navneeth Rajendran', 'Rif-at Wanwang',
  'Rukshana Rizwie', 'Safwaan Hussain', 'Saibhavani A', 'Savita Saravanan', 'Shamin Logan', 'Sherlee Mujipur Rahiman',
  'Sukriti Taneja', 'Sumaiya Shukri',
]

export const TASK_STATUSES = ['Closed', 'In Progress', 'ON HOLD', 'Open'] as const
export type TaskStatus = (typeof TASK_STATUSES)[number]
type Priority = 'High' | 'Medium' | 'Low'

export interface PersonRow {
  name: string
  planned: number
  plannedToDate: number
  logged: number
  tasks: Record<TaskStatus, number>
  overdue: number
}

export interface ProjectRow { name: string; tasks: number; logged: number }
export interface TaskLog { person: string; task: string; project: string; hours: number }
export interface ProjectTotals { planned: number; logged: number; closed: number; active: number; onHold: number; overdue: number; tasks: number }

export interface ProjectsDashboard {
  generatedAt: string
  range: RangeKey
  period: { start: string; end: string; prevStart: string; prevEnd: string }
  current: ProjectTotals
  previous: ProjectTotals
  people: PersonRow[]
  projects: ProjectRow[]
  taskLogs: TaskLog[]
  working: { title: string; detail: string }[]
  notWorking: { title: string; detail: string }[]
  actions: { id: string; priority: Priority; category: string; title: string; detail: string }[]
}

const num = (s: string | undefined) => Number(String(s ?? '').replace(/,/g, '')) || 0
/** Zoho Projects dates are "MM-dd-yyyy hh:mm" */
const isoDate = (s: string) => (s ? `${s.slice(6, 10)}-${s.slice(0, 2)}-${s.slice(3, 5)}` : '')
const nextDay = (d: string) => new Date(Date.parse(d + 'T00:00:00Z') + 86_400_000).toISOString().slice(0, 10)
const h1 = (n: number) => `${Math.round(n * 10) / 10} h`
const quoteList = (ids: string[]) => ids.map((i) => `'${i}'`).join(',')
const firstName = (n: string) => n.split(' ')[0]

async function periodRows(ids: string[], start: string, end: string) {
  const dates = `"Date" >= '${start}' and "Date" < '${nextDay(end)}'`
  const [logs, planned] = await Promise.all([
    zohoTableRows(TABLES.timeLogs, { criteria: `${dates} and "User ID" in (${quoteList(ids)})`, columns: ['Date', 'Hours', 'Task ID', 'User ID', 'Project ID'] }),
    zohoTableRows(TABLES.plannedHours, { criteria: `${dates} and "Owner ID" in (${quoteList(ids)})`, columns: ['Task ID', 'Owner ID', 'Date', 'Work Hours Planned'] }),
  ])
  return { logs, planned }
}

/** Team, their tasks and project names: fetched once per refresh and shared by every date range */
const getTeamBase = unstable_cache(async () => {
  const users = await zohoTableRows(TABLES.users, { columns: ['User ID', 'User Name'] })
  const team = users.filter((u) => TEAM.includes(u['User Name']))
  const ids = team.map((u) => u['User ID'])
  if (!ids.length) throw new Error('No marketing team members found in Zoho Projects users')
  const [tasks, projects] = await Promise.all([
    zohoTableRows(TABLES.tasks, {
      criteria: `(${ids.map((i) => `"Owner IDs" like '%${i}%'`).join(' or ')})`,
      columns: ['Task ID', 'Task Name', 'Status', 'Project ID', 'Is Overdue'],
    }),
    zohoTableRows(TABLES.projects, { columns: ['Project ID', 'Project Name'] }),
  ])
  return { team, tasks, projects }
}, ['internal-insights-zoho-team', TEAM.join('|')], { revalidate: 6 * 60 * 60, tags: ['internal-insights'] })

async function build(range: RangeKey): Promise<ProjectsDashboard> {
  const p = calendarPeriods(range)
  const today = new Date().toISOString().slice(0, 10)

  const { team, tasks, projects } = await getTeamBase()
  const nameOf = new Map(team.map((u) => [u['User ID'], u['User Name']]))
  const ids = team.map((u) => u['User ID'])

  const [cur, prev] = await Promise.all([
    periodRows(ids, p.start, p.end),
    periodRows(ids, p.prevStart, p.prevEnd),
  ])
  const taskById = new Map(tasks.map((t) => [t['Task ID'], t]))
  const projectName = new Map(projects.map((r) => [r['Project ID'], r['Project Name']]))

  const summarise = (rows: { logs: Record<string, string>[]; planned: Record<string, string>[] }) => {
    const people = new Map<string, PersonRow>()
    const person = (id: string) => {
      const name = nameOf.get(id) || id
      if (!people.has(name)) people.set(name, { name, planned: 0, plannedToDate: 0, logged: 0, tasks: { Closed: 0, 'In Progress': 0, 'ON HOLD': 0, Open: 0 }, overdue: 0 })
      return people.get(name)!
    }
    const ownerTask = new Set<string>()
    for (const r of rows.planned) {
      const pr = person(r['Owner ID'])
      const hours = num(r['Work Hours Planned'])
      pr.planned += hours
      if (isoDate(r.Date) <= today) pr.plannedToDate += hours
      const key = `${r['Owner ID']}|${r['Task ID']}`
      const t = taskById.get(r['Task ID'])
      if (ownerTask.has(key) || !t) continue
      ownerTask.add(key)
      if ((TASK_STATUSES as readonly string[]).includes(t.Status)) pr.tasks[t.Status as TaskStatus]++
      if (t['Is Overdue'] === 'Yes' && t.Status !== 'Closed') pr.overdue++
    }
    for (const r of rows.logs) person(r['User ID']).logged += num(r.Hours)
    const list = [...people.values()]
    const sum = (f: (x: PersonRow) => number) => list.reduce((n, x) => n + f(x), 0)
    const totals: ProjectTotals = {
      planned: sum((x) => x.planned),
      logged: sum((x) => x.logged),
      closed: sum((x) => x.tasks.Closed),
      active: sum((x) => x.tasks.Open + x.tasks['In Progress']),
      onHold: sum((x) => x.tasks['ON HOLD']),
      overdue: sum((x) => x.overdue),
      tasks: new Set(rows.planned.map((r) => r['Task ID'])).size,
    }
    return { people: list, totals }
  }

  const current = summarise(cur)
  const previous = summarise(prev)
  const people = current.people.sort((a, b) => a.name.localeCompare(b.name))

  // Projects: distinct tasks with planned hours, and hours logged, per project
  const projectTasks = new Map<string, Set<string>>()
  for (const r of cur.planned) {
    const pid = taskById.get(r['Task ID'])?.['Project ID']
    if (!pid) continue
    if (!projectTasks.has(pid)) projectTasks.set(pid, new Set())
    projectTasks.get(pid)!.add(r['Task ID'])
  }
  const projectHours = new Map<string, number>()
  for (const r of cur.logs) projectHours.set(r['Project ID'], (projectHours.get(r['Project ID']) || 0) + num(r.Hours))
  const projectRows: ProjectRow[] = [...new Set([...projectTasks.keys(), ...projectHours.keys()])]
    .map((pid) => ({ name: projectName.get(pid) || 'Other project', tasks: projectTasks.get(pid)?.size || 0, logged: projectHours.get(pid) || 0 }))
    .sort((a, b) => b.tasks - a.tasks || b.logged - a.logged)

  // Time logged per person per task
  const logMap = new Map<string, TaskLog>()
  for (const r of cur.logs) {
    const key = `${r['User ID']}|${r['Task ID']}`
    const row = logMap.get(key) || { person: nameOf.get(r['User ID']) || '', task: taskById.get(r['Task ID'])?.['Task Name'] || 'Untitled task', project: projectName.get(r['Project ID']) || '', hours: 0 }
    row.hours += num(r.Hours)
    logMap.set(key, row)
  }
  const taskLogs = [...logMap.values()].sort((a, b) => a.person.localeCompare(b.person) || b.hours - a.hours)

  // ---- Findings ----
  const c = current.totals
  const working: ProjectsDashboard['working'] = []
  const notWorking: ProjectsDashboard['notWorking'] = []
  if (c.closed) working.push({ title: `${c.closed} planned task${c.closed > 1 ? 's' : ''} closed`, detail: `Out of ${c.closed + c.active + c.onHold} tasks with work planned in this period.` })
  const goodLoggers = people.filter((x) => x.plannedToDate >= 10 && x.logged / x.plannedToDate >= 0.7)
  if (goodLoggers.length) working.push({ title: `Time logged in line with plan: ${goodLoggers.map((x) => firstName(x.name)).join(', ')}`, detail: goodLoggers.map((x) => `${firstName(x.name)} ${h1(x.logged)} of ${h1(x.plannedToDate)} planned so far`).join('; ') + '.' })
  const topProject = projectRows[0]
  if (topProject) working.push({ title: `Most work: ${topProject.name}`, detail: `${topProject.tasks} tasks planned and ${h1(topProject.logged)} logged in this period.` })

  const notLogging = people.filter((x) => x.plannedToDate >= 10 && x.logged / x.plannedToDate < 0.25)
  if (notLogging.length) notWorking.push({ title: `Little or no time logged: ${notLogging.map((x) => firstName(x.name)).join(', ')}`, detail: notLogging.map((x) => `${firstName(x.name)} ${h1(x.logged)} of ${h1(x.plannedToDate)} planned so far`).join('; ') + '. Logged hours under-report the team\'s real work.' })
  if (c.overdue) {
    const who = people.filter((x) => x.overdue).sort((a, b) => b.overdue - a.overdue)
    notWorking.push({ title: `${c.overdue} overdue task${c.overdue > 1 ? 's' : ''} still open`, detail: who.map((x) => `${firstName(x.name)} ${x.overdue}`).join(', ') + '.' })
  }
  if (c.onHold) notWorking.push({ title: `${c.onHold} task${c.onHold > 1 ? 's' : ''} on hold`, detail: people.filter((x) => x.tasks['ON HOLD']).map((x) => `${firstName(x.name)} ${x.tasks['ON HOLD']}`).join(', ') + '.' })
  if (c.planned && c.logged / c.planned < 0.5 && range.startsWith('last')) notWorking.push({ title: `Team logged ${Math.round((c.logged / c.planned) * 100)}% of planned hours`, detail: `${h1(c.logged)} logged vs ${h1(c.planned)} planned.` })

  // ---- Actions (stable ids so a status survives refreshes) ----
  const actions: ProjectsDashboard['actions'] = []
  if (c.overdue) actions.push({ id: actionId(['projects', 'overdue']), priority: c.overdue >= 5 ? 'High' : 'Medium', category: 'Deadlines', title: `Review ${c.overdue} overdue task${c.overdue > 1 ? 's' : ''}`, detail: 'Close what is done, re-plan the due date for the rest, or flag blockers in the weekly review.' })
  if (notLogging.length) actions.push({ id: actionId(['projects', 'timelog']), priority: 'Medium', category: 'Time logging', title: 'Log time against planned tasks', detail: `${notLogging.map((x) => firstName(x.name)).join(', ')}: log hours in Zoho Projects daily (or weekly at minimum) so planned vs actual is accurate.` })
  if (c.onHold) actions.push({ id: actionId(['projects', 'on-hold']), priority: 'Low', category: 'Blockers', title: `Unblock or close ${c.onHold} on-hold task${c.onHold > 1 ? 's' : ''}`, detail: 'Agree a next step and owner for each, or close it if it is no longer needed.' })

  return {
    generatedAt: new Date().toISOString(),
    range,
    period: p,
    current: c,
    previous: previous.totals,
    people,
    projects: projectRows,
    taskLogs,
    working,
    notWorking,
    actions,
  }
}

// Bump when the calculation changes so cached results are rebuilt
const CACHE_VERSION = 'p3'

export const getProjectsDashboard = (range: RangeKey) =>
  unstable_cache(() => build(range), ['internal-insights-projects', CACHE_VERSION, range], { revalidate: 6 * 60 * 60, tags: ['internal-insights'] })()
