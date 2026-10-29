'use client'

// Roadmap & execution tab: marketing team planned vs logged hours, task status and projects (Zoho Projects data).
import type { ProjectsDashboard, TaskStatus } from '@/lib/insights/projects'
import { ActionList, Details, FindingList, Kpi, TH, THR, fmtDate, nf, type StatusMap } from './ui'

const TASK_STATUSES: TaskStatus[] = ['Closed', 'In Progress', 'ON HOLD', 'Open']
const STATUS_COLOR: Record<TaskStatus, string> = {
  Closed: 'bg-[#6C8EEF]',
  'In Progress': 'bg-[#5DDBC4]',
  'ON HOLD': 'bg-[#F06A80]',
  Open: 'bg-[#F7A35C]',
}
const STATUS_LABEL: Record<TaskStatus, string> = { Closed: 'Closed', 'In Progress': 'In progress', 'ON HOLD': 'On hold', Open: 'Open' }

const hours = (n: number) => (n ? (Math.round(n * 10) / 10).toLocaleString('en-US') : '0')
const firstName = (n: string) => n.split(' ')[0]

function PlannedVsLogged({ data }: { data: ProjectsDashboard }) {
  const rows = data.people.filter((p) => p.planned || p.logged)
  const max = Math.max(1, ...rows.map((p) => Math.max(p.planned, p.logged)))
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="flex flex-wrap gap-4 text-xs text-gray-600 mb-4">
        <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-[#1E76BB]" />Planned hours</span>
        <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-[#8FD18F]" />Logged hours</span>
      </div>
      <ul className="space-y-3">
        {rows.map((p) => (
          <li key={p.name} className="grid grid-cols-[110px_1fr] sm:grid-cols-[180px_1fr] items-center gap-3">
            <span className="text-sm text-gray-800 truncate" title={p.name}>{p.name}</span>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="h-3 rounded-r bg-[#1E76BB]" style={{ width: `${(p.planned / max) * 100}%`, minWidth: p.planned ? 2 : 0 }} />
                <span className="text-xs text-gray-600 whitespace-nowrap">{hours(p.planned)} h planned</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 rounded-r bg-[#8FD18F]" style={{ width: `${(p.logged / max) * 100}%`, minWidth: p.logged ? 2 : 0 }} />
                <span className="text-xs text-gray-600 whitespace-nowrap">{hours(p.logged)} h logged</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function TaskStatusChart({ data }: { data: ProjectsDashboard }) {
  const rows = data.people.filter((p) => TASK_STATUSES.some((s) => p.tasks[s]))
  const max = Math.max(1, ...rows.map((p) => TASK_STATUSES.reduce((n, s) => n + p.tasks[s], 0)))
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="flex flex-wrap gap-4 text-xs text-gray-600 mb-4">
        {TASK_STATUSES.map((s) => (
          <span key={s} className="inline-flex items-center gap-1.5"><span className={`w-2.5 h-2.5 rounded-sm ${STATUS_COLOR[s]}`} />{STATUS_LABEL[s]}</span>
        ))}
      </div>
      <ul className="space-y-2.5">
        {rows.map((p) => {
          const total = TASK_STATUSES.reduce((n, s) => n + p.tasks[s], 0)
          return (
            <li key={p.name} className="grid grid-cols-[110px_1fr] sm:grid-cols-[180px_1fr] items-center gap-3">
              <span className="text-sm text-gray-800 truncate" title={p.name}>{p.name}</span>
              <div className="flex items-center gap-2">
                <div className="flex h-5 overflow-hidden rounded" style={{ width: `${(total / max) * 100}%` }}>
                  {TASK_STATUSES.filter((s) => p.tasks[s]).map((s) => (
                    <div key={s} className={`${STATUS_COLOR[s]} flex items-center justify-center text-[10px] font-semibold text-gray-900`} style={{ width: `${(p.tasks[s] / total) * 100}%` }} title={`${STATUS_LABEL[s]}: ${p.tasks[s]}`}>
                      {p.tasks[s] / max > 0.04 ? p.tasks[s] : ''}
                    </div>
                  ))}
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap">{total}{p.overdue ? <span className="text-red-600"> · {p.overdue} overdue</span> : null}</span>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default function ProjectsTab({ data, statuses }: { data: ProjectsDashboard; statuses: StatusMap }) {
  const c = data.current
  const p = data.previous
  const partial = data.range.startsWith('this')
  const prevLabel = data.range.endsWith('week') ? 'last week' : data.range.endsWith('month') ? 'last month' : 'last year'

  return (
    <>
      {/* Headline numbers */}
      <section className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6" aria-label="Headline numbers for the marketing team">
        <Kpi label="Hours planned" value={hours(c.planned)} cur={c.planned} prev={p.planned} hideDelta={partial} note={partial ? `${prevLabel}: ${hours(p.planned)}` : undefined}
          info="Work hours planned on tasks owned by the marketing team in this whole period, including days still to come (Zoho Projects)." />
        <Kpi label="Hours logged" value={hours(c.logged)} cur={c.logged} prev={p.logged} hideDelta={partial} note={partial ? `${prevLabel}: ${hours(p.logged)}` : undefined}
          info="Hours the team logged in Zoho Projects time logs during this period." />
        <Kpi label="Tasks closed" value={nf(c.closed)} cur={c.closed} prev={p.closed} hideDelta={partial} note={partial ? `${prevLabel}: ${nf(p.closed)}` : undefined}
          info="Tasks with work planned in this period that are now closed." />
        <Kpi label="Tasks in progress" value={nf(c.active)} cur={c.active} prev={p.active} hideDelta note="open or in progress"
          info="Tasks with work planned in this period that are still open or in progress." />
        <Kpi label="Overdue" value={nf(c.overdue)} cur={c.overdue} prev={p.overdue} hideDelta note="not closed, past due date"
          info="Tasks with work planned in this period that are past their due date and not closed." />
        <Kpi label="On hold" value={nf(c.onHold)} cur={c.onHold} prev={p.onHold} hideDelta
          info="Tasks with work planned in this period that are on hold." />
      </section>

      <section className="grid lg:grid-cols-2 gap-4 mb-8">
        <div>
          <h2 className="text-lg font-bold text-[#062068] mb-3">Planned vs logged hours</h2>
          <PlannedVsLogged data={data} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-[#062068] mb-3">Tasks &amp; status</h2>
          <TaskStatusChart data={data} />
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-4 mb-8">
        <FindingList title="✓ What's going well" items={data.working} tone="good" />
        <FindingList title="⚠ What needs attention" items={data.notWorking} tone="bad" />
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 mb-8">
        <h2 className="text-lg font-bold text-[#062068]">→ Action items</h2>
        <p className="text-sm text-gray-500 mb-4">Based on overdue, on-hold and time-logging gaps in Zoho Projects.</p>
        <ActionList actions={data.actions} initial={statuses} />
      </section>

      <h2 className="text-lg font-bold text-[#062068] mb-3">Details</h2>
      <Details title="Projects" summary={`${data.projects.length} project${data.projects.length === 1 ? '' : 's'} the team planned or logged work on in this period`}>
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
              <tr><th scope="col" className={TH}>Project</th><th scope="col" className={THR}>Tasks planned</th><th scope="col" className={THR}>Hours logged</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.projects.map((pr) => (
                <tr key={pr.name}><td className="px-3 py-2 font-semibold text-gray-900">{pr.name}</td><td className="px-3 py-2 text-right">{nf(pr.tasks)}</td><td className="px-3 py-2 text-right">{hours(pr.logged)}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </Details>
      <Details title="Time logged by task" summary={`${data.taskLogs.length} tasks with time logged in this period, by person`}>
        {data.taskLogs.length === 0 ? (
          <p className="text-sm text-gray-500">No time logged in this period.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                <tr><th scope="col" className={TH}>Person</th><th scope="col" className={TH}>Task</th><th scope="col" className={TH}>Project</th><th scope="col" className={THR}>Hours</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.taskLogs.map((t, i) => (
                  <tr key={`${t.person}|${t.task}|${i}`}>
                    <td className="px-3 py-2 whitespace-nowrap text-gray-700">{i === 0 || data.taskLogs[i - 1].person !== t.person ? firstName(t.person) : ''}</td>
                    <td className="px-3 py-2 text-gray-900">{t.task}</td>
                    <td className="px-3 py-2 text-xs text-gray-500">{t.project}</td>
                    <td className="px-3 py-2 text-right">{hours(t.hours)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Details>

      <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-5">
        <h2 className="font-semibold text-gray-900 mb-2">How the numbers work</h2>
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-600">
          <li><strong>Source:</strong> Zoho Projects data in Zoho Analytics (Marketing Team Workspace), the same as the &ldquo;08 Roadmap and Execution&rdquo; tab of the Marketing Command Center dashboard. Covers the 14 people in the marketing team.</li>
          <li><strong>Periods are whole calendar periods</strong> ({fmtDate(data.period.start)} – {fmtDate(data.period.end)}), so planned hours include days still to come. Logged hours only grow as the period goes on.</li>
          <li><strong>Tasks &amp; status</strong> count each task once per owner when it has planned hours in the period, by its current status. &ldquo;Overdue&rdquo; = past due date and not closed.</li>
          <li>Everyone in the team is included everywhere. (The Zoho report&apos;s &ldquo;Log Time by Tasks&rdquo; and &ldquo;Involvement in Projects&rdquo; charts currently leave out Navneeth, so their totals are lower.)</li>
          <li>Refreshes every 6 hours · last refreshed {new Date(data.generatedAt).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}.</li>
        </ul>
      </section>
    </>
  )
}
