import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const emailTo = process.env.RESEND_EMAIL_TO || 'emailtreehousemusic@gmail.com';
const emailFrom = process.env.RESEND_EMAIL_FROM || 'onboarding@resend.dev';

export async function POST(req) {
  try {
    const { formData } = await req.json();

    // Check if the form is a newsletter or full contact form
    const isNewsletter = formData?.email && !formData?.firstname;

    let subject;
    let htmlContent;

    if (isNewsletter) {
      // Newsletter Submission
      const { email } = formData;
      subject = 'Newsletter Signup';
      htmlContent = `
        <html>
          <body>
            <h1>New Newsletter Signup</h1>
            <p><strong>Email:</strong> ${email}</p>
          </body>
        </html>
      `;
    } else {
      // Full Contact Form Submission
      const {
        firstname,
        lastname,
        email,
        phone,
        instruments = [],
        pastExperience,
        availability = [],
        additionalComments,
        CMPValue,
      } = formData;

      const availabilityFormatted = availability
        .map(item => `<li>${item.day}: ${item.fromTime} to ${item.toTime}</li>`)
        .join('');

      subject = 'New Form Submission';
      htmlContent = `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                margin: 0;
                padding: 20px;
                background-color: #f4f4f4;
              }
              .container {
                background-color: #ffffff;
                border-radius: 5px;
                padding: 20px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              h1 {
                color: #333;
                text-align: center;
                font-size: 24px;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin: 20px 0;
              }
              th, td {
                border: 1px solid #ddd;
                padding: 10px;
                text-align: left;
              }
              th {
                background-color: #f2f2f2;
                color: #333;
              }
              ul {
                margin: 10px 0;
                padding-left: 20px;
              }
              li {
                margin: 5px 0;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>New Contact Form Submission</h1>
              <table>
                <tr><th>Field</th><th>Details</th></tr>
                <tr><td>First Name</td><td>${firstname}</td></tr>
                <tr><td>Last Name</td><td>${lastname}</td></tr>
                <tr><td>Email</td><td>${email}</td></tr>
                <tr><td>Phone</td><td>${phone}</td></tr>
                <tr><td>Instruments</td><td>${instruments.join(', ')}</td></tr>
                <tr><td>Past Experience</td><td>${pastExperience}</td></tr>
                <tr><td>Availability</td><td><ul>${availabilityFormatted}</ul></td></tr>
                <tr><td>Additional Comments</td><td>${additionalComments}</td></tr>
                <tr><td>CMP Value</td><td>${CMPValue}</td></tr>
              </table>
            </div>
          </body>
        </html>
      `;
    }

    // Send the email
    const emailResponse = await resend.emails.send({
      from: emailFrom,
      to: emailTo,
      subject,
      html: htmlContent,
    });

    return new Response(
      JSON.stringify({ success: true, message: 'Email sent successfully' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Failed to send email',
        error: error.message,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
