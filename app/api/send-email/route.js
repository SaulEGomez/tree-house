import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const emailTo = process.env.RESEND_EMAIL_TO || 'onboarding@resend.dev';
const emailFrom = process.env.RESEND_EMAIL_FROM || 'saegomez@ucsc.edu';

export async function POST(req) {
  try {
    const { formData } = await req.json();     
    const {
      firstname,
      lastname,
      email,
      instruments,
      pastExperience,
      availability,
      additionalComments,
      CMPValue,
    } = formData;

    const availabilityFormatted = availability
      .map(item => `<li>${item.day}: ${item.fromTime} to ${item.toTime}</li>`)
      .join('');

      const htmlContent = `
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
            p {
              color: #555;
              font-size: 16px;
              margin: 10px 0;
            }
            ul {
              margin: 10px 0;
              padding-left: 20px;
            }
            li {
              margin: 5px 0;
              color: #333;
            }
            .footer {
              margin-top: 20px;
              font-size: 14px;
              color: #777;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>New Form Submission</h1>
            <table>
              <tr>
                <th>Field</th>
                <th>Details</th>
              </tr>
              <tr>
                <td><strong>First Name</strong></td>
                <td>${firstname}</td>
              </tr>
              <tr>
                <td><strong>Last Name</strong></td>
                <td>${lastname}</td>
              </tr>
              <tr>
                <td><strong>Email</strong></td>
                <td>${email}</td>
              </tr>
              <tr>
                <td><strong>Instruments</strong></td>
                <td>${instruments.join(', ')}</td>
              </tr>
              <tr>
                <td><strong>Past Experience</strong></td>
                <td>${pastExperience}</td>
              </tr>
              <tr>
                <td><strong>Availability</strong></td>
                <td>
                  <ul>${availabilityFormatted}</ul>
                </td>
              </tr>
              <tr>
                <td><strong>Additional Comments</strong></td>
                <td>${additionalComments}</td>
              </tr>
              <tr>
                <td><strong>CMP Value</strong></td>
                <td>${CMPValue}</td>
              </tr>
            </table>
          </div>
          <div class="footer">
            <p>Thank you for your submission!</p>
          </div>
        </body>
      </html>
    `;
    


    const emailResponse = await resend.emails.send({
      from: emailFrom,
      to: emailTo,
      subject: 'New Form Submission',
      html: htmlContent,
    });

    return new Response(JSON.stringify({ success: true, message: 'Email sent successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error sending email:', error);
    
    return new Response(JSON.stringify({ success: false, message: 'Failed to send email', error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
