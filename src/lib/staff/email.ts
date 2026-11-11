import 'server-only'

// One transactional email, through Amazon SES. On Amplify the compute role
// carries the permission (ses:SendEmail on the verified identity), so no key
// sits in an env var; `STAFF_MAIL_FROM` is the verified sender. Without it
// (local, or staging before Prince sets it up) nothing is sent and the caller
// says so.

export const mailConfigured = () => !!process.env.STAFF_MAIL_FROM

export async function sendEmail(input: { to: string; subject: string; text: string; html?: string }): Promise<void> {
  if (!mailConfigured()) throw new Error('STAFF_MAIL_FROM is not set')
  const { SESClient, SendEmailCommand } = await import('@aws-sdk/client-ses')
  const client = new SESClient({ region: process.env.STAFF_MAIL_REGION || process.env.AWS_REGION || 'ap-southeast-1' })
  await client.send(new SendEmailCommand({
    Source: process.env.STAFF_MAIL_FROM,
    Destination: { ToAddresses: [input.to] },
    Message: { Subject: { Data: input.subject, Charset: 'UTF-8' }, Body: { Text: { Data: input.text, Charset: 'UTF-8' }, ...(input.html ? { Html: { Data: input.html, Charset: 'UTF-8' } } : {}) } },
  }))
}
