// app/api/send-email/route.js
import { Resend } from 'resend'

export const runtime = 'nodejs'         // ensure Node runtime (not edge)
export const dynamic = 'force-dynamic'  // never cache

const resend = new Resend(process.env.RESEND_API_KEY)
const emailTo = process.env.RESEND_EMAIL_TO || 'emailtreehousemusic@gmail.com'
const emailFrom = process.env.RESEND_EMAIL_FROM || 'onboarding@resend.dev'

// minimal HTML escape so user input can’t inject markup
const escapeHtml = (str = '') =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')

const newsletterHtml = ({ email }) => ({
  subject: 'Newsletter Signup',
  text: `New newsletter signup\nEmail: ${email}`,
  html: `
    <html><body>
      <h1>New Newsletter Signup</h1>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    </body></html>
  `,
})

const kingdomSoundHtml = (data) => {
  const {
    firstname, lastname, email, phone,
    instruments = [], pastExperience, additionalComments,
  } = data
  const safeList = (arr) => escapeHtml(arr.filter(Boolean).join(', '))
  return {
    subject: 'New Kingdom Sound Interest Form Submission',
    text:
`New Kingdom Sound Interest Form Submission
Name: ${firstname} ${lastname}
Email: ${email}
Phone: ${phone}
Instruments: ${instruments.join(', ')}
Past Experience: ${pastExperience || '-'}
Additional Comments: ${additionalComments || '-'}`,
    html: `
      <html><head><style>
        body{font-family:Arial,sans-serif;line-height:1.6;margin:0;padding:20px;background:#f4f4f4}
        .container{background:#fff;border-radius:5px;padding:20px;box-shadow:0 0 10px rgba(0,0,0,.1)}
        table{width:100%;border-collapse:collapse;margin:20px 0}
        th,td{border:1px solid #ddd;padding:10px;text-align:left}
        th{background:#f2f2f2;color:#333}
      </style></head><body>
        <div class="container">
          <h1>New Kingdom Sound Interest Form Submission</h1>
          <table>
            <tr><th>Field</th><th>Details</th></tr>
            <tr><td>First Name</td><td>${escapeHtml(firstname)}</td></tr>
            <tr><td>Last Name</td><td>${escapeHtml(lastname)}</td></tr>
            <tr><td>Email</td><td>${escapeHtml(email)}</td></tr>
            <tr><td>Phone</td><td>${escapeHtml(phone)}</td></tr>
            <tr><td>Instruments</td><td>${safeList(instruments)}</td></tr>
            <tr><td>Past Experience</td><td>${escapeHtml(pastExperience || '-')}</td></tr>
            <tr><td>Additional Comments</td><td>${escapeHtml(additionalComments || '-')}</td></tr>
          </table>
        </div>
      </body></html>
    `,
  }
}

const contactHtml = (data) => {
  const {
    firstname, lastname, email, phone,
    instruments = [], pastExperience,
    availability = [], additionalComments,
  } = data
  const availabilityText = availability
    .map((a) => `${a.day}: ${a.fromTime} to ${a.toTime}`)
    .join('\n')
  const availabilityHtml = availability
    .map((a) => `<li>${escapeHtml(a.day)}: ${escapeHtml(a.fromTime)} to ${escapeHtml(a.toTime)}</li>`)
    .join('')

  return {
    subject: 'New Contact Form Submission',
    text:
`New Contact Form Submission
Name: ${firstname} ${lastname}
Email: ${email}
Phone: ${phone}
Instruments: ${instruments.join(', ')}
Past Experience: ${pastExperience || '-'}
Availability:
${availabilityText || '-'}
Additional Comments: ${additionalComments || '-'}`,
    html: `
      <html><head><style>
        body{font-family:Arial,sans-serif;line-height:1.6;margin:0;padding:20px;background:#f4f4f4}
        .container{background:#fff;border-radius:5px;padding:20px;box-shadow:0 0 10px rgba(0,0,0,.1)}
        table{width:100%;border-collapse:collapse;margin:20px 0}
        th,td{border:1px solid #ddd;padding:10px;text-align:left}
        th{background:#f2f2f2;color:#333}
        ul{margin:10px 0;padding-left:20px}
      </style></head><body>
        <div class="container">
          <h1>New Contact Form Submission</h1>
          <table>
            <tr><th>Field</th><th>Details</th></tr>
            <tr><td>First Name</td><td>${escapeHtml(firstname)}</td></tr>
            <tr><td>Last Name</td><td>${escapeHtml(lastname)}</td></tr>
            <tr><td>Email</td><td>${escapeHtml(email)}</td></tr>
            <tr><td>Phone</td><td>${escapeHtml(phone)}</td></tr>
            <tr><td>Instruments</td><td>${escapeHtml(instruments.join(', '))}</td></tr>
            <tr><td>Past Experience</td><td>${escapeHtml(pastExperience || '-')}</td></tr>
            <tr><td>Availability</td><td><ul>${availabilityHtml || ''}</ul></td></tr>
            <tr><td>Additional Comments</td><td>${escapeHtml(additionalComments || '-')}</td></tr>
          </table>
        </div>
      </body></html>
    `,
  }
}

export async function POST(req) {
  try {
    const { formData = {}, formType } = await req.json()

    const isNewsletter = formData?.email && !formData?.firstname
    const payload = isNewsletter
      ? newsletterHtml({ email: formData.email })
      : formType === 'kingdomsound'
      ? kingdomSoundHtml(formData)
      : contactHtml(formData)

    const to = Array.isArray(emailTo) ? emailTo : [emailTo]

    const sendResult = await resend.emails.send({
      from: emailFrom,         // use a verified domain in production
      to,
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
      // NOTE: If you want replies to go to the submitter, include reply-to:
      // reply_to: formData.email, // or `replyTo` depending on your SDK version
      // tags: [{ name: 'form', value: formType || (isNewsletter ? 'newsletter' : 'contact') }],
    })

    if (sendResult.error) throw new Error(sendResult.error?.message || 'Resend failed')

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error sending email:', error)
    return new Response(JSON.stringify({ success: false, message: error.message || 'Failed to send email' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
