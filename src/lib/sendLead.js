// Free email delivery via FormSubmit (https://formsubmit.co) — no backend or API key needed.
// Quote and contact requests are emailed to this address. The FIRST submission triggers a one-time
// "Activate Form" email to it; click that link once and every later request arrives normally.
export const LEAD_TO = 'misbah7370@gmail.com'
const ENDPOINT = `https://formsubmit.co/ajax/${LEAD_TO}`

export async function sendLead(d, source = 'Website') {
  if (d._honey) return { ok: true } // bots fill the hidden field — pretend success, send nothing
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      _subject: `New quote request — ${d.service || 'Website enquiry'} (${d.name})`,
      _template: 'table',
      _captcha: 'false',
      _replyto: d.email || undefined,
      Name: d.name,
      Phone: d.phone || '-',
      Email: d.email || '-',
      Service: d.service || '-',
      Message: d.message || '-',
      Source: source,
      Page: typeof location !== 'undefined' ? location.href : '',
    }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok || data.success === false || data.success === 'false') throw new Error(data.message || 'Send failed')
  return { ok: true }
}
