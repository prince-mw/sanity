import 'server-only'

// Gate for the hidden admin pages/routes (e.g. the mock-up face marker).
// Set ADMIN_KEY in Amplify (staging first). On a developer's machine with no
// key set, access is open — never on a deployed site.

export function adminAllowed(key: string | null | undefined): boolean {
  const want = process.env.ADMIN_KEY
  if (!want) return process.env.NODE_ENV === 'development'
  return !!key && key === want
}
