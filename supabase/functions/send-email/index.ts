import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  service: string;
  budget?: string;
  message: string;
}

interface MeetingRequest {
  name: string;
  email: string;
  date: string;
  time: string;
  timezone: string;
  message?: string;
}

// SendGrid configuration
const SENDGRID_API_KEY = "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"
const FROM_EMAIL = 'adityakumar2482@gmail.com' // Your verified sender email
const ADMIN_EMAIL = 'adityakumar2482@gmail.com'





// serve(async (req) => {
//   // Handle CORS preflight requests
//   if (req.method === 'OPTIONS') {
//     return new Response('ok', { headers: corsHeaders })
//   }

//   try {
//     // Check if SendGrid API key is configured
//     if (!SENDGRID_API_KEY) {
//       throw new Error('SendGrid API key not configured')
//     }

//     const { type, data } = await req.json()

//     if (type === 'contact') {
//       return await handleContactForm(data as ContactFormData)
//     } else if (type === 'meeting') {
//       return await handleMeetingRequest(data as MeetingRequest)
//     } else {
//       throw new Error('Invalid request type')
//     }
//   } catch (error) {
//     console.error('Error processing request:', error)
//     return new Response(
//       JSON.stringify({ error: error.message }),
//       { 
//         status: 400,
//         headers: { ...corsHeaders, 'Content-Type': 'application/json' }
//       }
//     )
//   }
// })


// async function sendEmail(to: string, subject: string, html: string, text?: string) {
//   const emailData = {
//     personalizations: [
//       {
//         to: [{ email: to }],
//         subject: subject
//       }
//     ],
//     from: { email: FROM_EMAIL, name: 'DigitalCraft Team' },
//     content: [
//       {
//         type: 'text/html',
//         value: html
//       }
//     ]
//   }

//   // Add plain text version if provided
//   if (text) {
//     emailData.content.unshift({
//       type: 'text/plain',
//       value: text
//     })
//   }

//   const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
//     method: 'POST',
//     headers: {
//       'Authorization': `Bearer ${SENDGRID_API_KEY}`,
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(emailData)
//   })

//   if (!response.ok) {
//     const errorText = await response.text()
//     console.error('SendGrid error:', errorText)
//     throw new Error(`Failed to send email: ${response.status} ${response.statusText}`)
//   }

//   return response
// }

// async function handleContactForm(formData: ContactFormData) {
//   try {
//     console.log('Processing contact form submission:', formData)

//     // Email to admin
//     const adminSubject = `New Contact Form Submission from ${formData.name}`
//     const adminHtml = `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <meta charset="utf-8">
//         <style>
//           body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
//           .container { max-width: 600px; margin: 0 auto; padding: 20px; }
//           .header { background: linear-gradient(135deg, #3B82F6, #10B981); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
//           .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
//           .field { margin-bottom: 15px; }
//           .label { font-weight: bold; color: #555; }
//           .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; border-left: 4px solid #3B82F6; }
//           .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
//         </style>
//       </head>
//       <body>
//         <div class="container">
//           <div class="header">
//             <h2>🚀 New Contact Form Submission</h2>
//             <p>You have received a new inquiry from your website!</p>
//           </div>
//           <div class="content">
//             <div class="field">
//               <div class="label">👤 Name:</div>
//               <div class="value">${formData.name}</div>
//             </div>
//             <div class="field">
//               <div class="label">📧 Email:</div>
//               <div class="value"><a href="mailto:${formData.email}">${formData.email}</a></div>
//             </div>
//             <div class="field">
//               <div class="label">🏢 Company:</div>
//               <div class="value">${formData.company || 'Not provided'}</div>
//             </div>
//             <div class="field">
//               <div class="label">🛠️ Service Needed:</div>
//               <div class="value">${formData.service}</div>
//             </div>
//             <div class="field">
//               <div class="label">💰 Budget:</div>
//               <div class="value">${formData.budget || 'Not specified'}</div>
//             </div>
//             <div class="field">
//               <div class="label">💬 Message:</div>
//               <div class="value">${formData.message.replace(/\n/g, '<br>')}</div>
//             </div>
//           </div>
//           <div class="footer">
//             <p>📅 Submitted at: ${new Date().toLocaleString()}</p>
//             <p>This email was sent from your DigitalCraft website contact form.</p>
//           </div>
//         </div>
//       </body>
//       </html>
//     `

//     // Send email to admin
//     await sendEmail(ADMIN_EMAIL, adminSubject, adminHtml)

//     // Confirmation email to user
//     const userSubject = 'Thank you for contacting DigitalCraft! 🎉'
//     const userHtml = `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <meta charset="utf-8">
//         <style>
//           body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
//           .container { max-width: 600px; margin: 0 auto; padding: 20px; }
//           .header { background: linear-gradient(135deg, #3B82F6, #10B981); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
//           .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
//           .highlight { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10B981; }
//           .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 14px; color: #666; }
//           .cta { background: #3B82F6; color: white; padding: 15px 30px; border-radius: 8px; text-decoration: none; display: inline-block; margin: 20px 0; }
//         </style>
//       </head>
//       <body>
//         <div class="container">
//           <div class="header">
//             <h1>✨ Thank You, ${formData.name}!</h1>
//             <p>We've received your inquiry and we're excited to help!</p>
//           </div>
//           <div class="content">
//             <p>Hi ${formData.name},</p>
            
//             <p>Thank you for reaching out to DigitalCraft! We have successfully received your inquiry about <strong>${formData.service}</strong> and our team is already reviewing your requirements.</p>
            
//             <div class="highlight">
//               <h3>📋 Your Submission Summary:</h3>
//               <p><strong>Service:</strong> ${formData.service}</p>
//               <p><strong>Budget Range:</strong> ${formData.budget || 'To be discussed'}</p>
//               <p><strong>Company:</strong> ${formData.company || 'Individual'}</p>
//             </div>
            
//             <h3>🚀 What happens next?</h3>
//             <ul>
//               <li><strong>Within 24 hours:</strong> Our team will review your requirements and prepare a personalized response</li>
//               <li><strong>Initial Response:</strong> We'll send you a detailed email with next steps and any clarifying questions</li>
//               <li><strong>Discovery Call:</strong> If it's a good fit, we'll schedule a free consultation to discuss your project in detail</li>
//               <li><strong>Proposal:</strong> We'll provide a comprehensive proposal with timeline and pricing</li>
//             </ul>
            
//             <div class="highlight">
//               <p><strong>💡 Pro Tip:</strong> While you wait, feel free to check out our portfolio and case studies on our website to see examples of our work!</p>
//             </div>
            
//             <p>We're looking forward to the possibility of working together and helping bring your vision to life!</p>
            
//             <p>Best regards,<br>
//             <strong>The DigitalCraft Team</strong><br>
//             🎨 Branding • 💻 Development • 🤖 AI Solutions</p>
//           </div>
//           <div class="footer">
//             <p><strong>Need immediate assistance?</strong> Reply to this email or contact us directly:</p>
//             <p>📧 Email: <a href="mailto:${ADMIN_EMAIL}">${ADMIN_EMAIL}</a></p>
//             <p>🌐 Website: <a href="https://digitalcraft.com">digitalcraft.com</a></p>
//             <p><small>This is an automated confirmation email. Please do not reply to this message.</small></p>
//           </div>
//         </div>
//       </body>
//       </html>
//     `

//     // Send confirmation email to user
//     await sendEmail(formData.email, userSubject, userHtml)

//     console.log('Contact form emails sent successfully')

//     return new Response(
//       JSON.stringify({ 
//         success: true, 
//         message: 'Contact form submitted successfully. Confirmation emails sent.',
//         data: {
//           name: formData.name,
//           email: formData.email,
//           service: formData.service,
//           timestamp: new Date().toISOString()
//         }
//       }),
//       { 
//         status: 200,
//         headers: { ...corsHeaders, 'Content-Type': 'application/json' }
//       }
//     )
//   } catch (error) {
//     console.error('Error handling contact form:', error)
//     throw new Error(`Failed to process contact form: ${error.message}`)
//   }
// }

// async function handleMeetingRequest(meetingData: MeetingRequest) {
//   try {
//     console.log('Processing meeting request:', meetingData)

//     const meetingDateTime = new Date(`${meetingData.date}T${meetingData.time}`)
//     const endDateTime = new Date(meetingDateTime.getTime() + 30 * 60 * 1000) // 30 minutes
    
//     // Format dates for calendar
//     const startDate = meetingDateTime.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
//     const endDate = endDateTime.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'

//     // Create Google Calendar link
//     const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`DigitalCraft Consultation - ${meetingData.name}`)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(`Consultation meeting with ${meetingData.name}\nEmail: ${meetingData.email}\n${meetingData.message ? `Message: ${meetingData.message}` : ''}`)}&location=Online%20Meeting`

//     // Email to admin
//     const adminSubject = `📅 New Meeting Scheduled - ${meetingData.name}`
//     const adminHtml = `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <meta charset="utf-8">
//         <style>
//           body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
//           .container { max-width: 600px; margin: 0 auto; padding: 20px; }
//           .header { background: linear-gradient(135deg, #8B5CF6, #EC4899); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
//           .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
//           .meeting-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #8B5CF6; }
//           .cta { background: #8B5CF6; color: white; padding: 15px 30px; border-radius: 8px; text-decoration: none; display: inline-block; margin: 10px 0; }
//           .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
//         </style>
//       </head>
//       <body>
//         <div class="container">
//           <div class="header">
//             <h2>📅 New Meeting Scheduled!</h2>
//             <p>A new consultation has been booked through your website.</p>
//           </div>
//           <div class="content">
//             <div class="meeting-details">
//               <h3>👤 Client Information:</h3>
//               <p><strong>Name:</strong> ${meetingData.name}</p>
//               <p><strong>Email:</strong> <a href="mailto:${meetingData.email}">${meetingData.email}</a></p>
              
//               <h3>🕒 Meeting Details:</h3>
//               <p><strong>Date:</strong> ${meetingDateTime.toLocaleDateString()}</p>
//               <p><strong>Time:</strong> ${meetingData.time} (${meetingData.timezone})</p>
//               <p><strong>Duration:</strong> 30 minutes</p>
              
//               ${meetingData.message ? `
//                 <h3>💬 Additional Message:</h3>
//                 <p>${meetingData.message.replace(/\n/g, '<br>')}</p>
//               ` : ''}
//             </div>
            
//             <p><strong>Action Required:</strong></p>
//             <ul>
//               <li>Add this meeting to your calendar using the link below</li>
//               <li>Send the client a meeting link (Zoom, Google Meet, etc.)</li>
//               <li>Prepare for the consultation based on their requirements</li>
//             </ul>
            
//             <a href="${calendarUrl}" class="cta" target="_blank">📅 Add to Google Calendar</a>
//           </div>
//           <div class="footer">
//             <p>📅 Scheduled at: ${new Date().toLocaleString()}</p>
//             <p>This meeting was scheduled through your DigitalCraft website.</p>
//           </div>
//         </div>
//       </body>
//       </html>
//     `

//     // Send email to admin
//     await sendEmail(ADMIN_EMAIL, adminSubject, adminHtml)

//     // Confirmation email to client
//     const clientSubject = '🎉 Your DigitalCraft Consultation is Confirmed!'
//     const clientHtml = `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <meta charset="utf-8">
//         <style>
//           body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
//           .container { max-width: 600px; margin: 0 auto; padding: 20px; }
//           .header { background: linear-gradient(135deg, #8B5CF6, #EC4899); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
//           .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
//           .meeting-card { background: white; padding: 25px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #8B5CF6; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
//           .highlight { background: linear-gradient(135deg, #EDE9FE, #F3E8FF); padding: 20px; border-radius: 8px; margin: 20px 0; }
//           .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 14px; color: #666; }
//           .cta { background: #8B5CF6; color: white; padding: 15px 30px; border-radius: 8px; text-decoration: none; display: inline-block; margin: 10px 5px; }
//         </style>
//       </head>
//       <body>
//         <div class="container">
//           <div class="header">
//             <h1>🎉 Consultation Confirmed!</h1>
//             <p>We're excited to discuss your project, ${meetingData.name}!</p>
//           </div>
//           <div class="content">
//             <p>Hi ${meetingData.name},</p>
            
//             <p>Great news! Your consultation with DigitalCraft has been successfully scheduled. We're looking forward to learning more about your project and discussing how we can help bring your vision to life.</p>
            
//             <div class="meeting-card">
//               <h3>📅 Your Meeting Details:</h3>
//               <p><strong>📆 Date:</strong> ${meetingDateTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
//               <p><strong>🕒 Time:</strong> ${meetingData.time} (${meetingData.timezone})</p>
//               <p><strong>⏱️ Duration:</strong> 30 minutes</p>
//               <p><strong>📍 Location:</strong> Online (link will be provided)</p>
//             </div>
            
//             <div class="highlight">
//               <h3>🚀 What to expect during our call:</h3>
//               <ul>
//                 <li><strong>Project Discovery:</strong> We'll discuss your goals, requirements, and vision</li>
//                 <li><strong>Solution Overview:</strong> We'll outline how we can help achieve your objectives</li>
//                 <li><strong>Timeline & Process:</strong> We'll explain our workflow and project timeline</li>
//                 <li><strong>Q&A Session:</strong> You can ask any questions about our services</li>
//                 <li><strong>Next Steps:</strong> If it's a good fit, we'll discuss the next steps</li>
//               </ul>
//             </div>
            
//             <h3>📋 How to prepare:</h3>
//             <ul>
//               <li>Think about your project goals and requirements</li>
//               <li>Prepare any questions you have about our services</li>
//               <li>Have examples of designs or websites you like (if applicable)</li>
//               <li>Consider your timeline and budget expectations</li>
//             </ul>
            
//             <div style="text-align: center; margin: 30px 0;">
//               <a href="${calendarUrl}" class="cta" target="_blank">📅 Add to Calendar</a>
//               <a href="mailto:${ADMIN_EMAIL}?subject=Consultation%20Question" class="cta">✉️ Contact Us</a>
//             </div>
            
//             <p><strong>Meeting Link:</strong> We'll send you the meeting link (Zoom/Google Meet) 24 hours before our scheduled call.</p>
            
//             <p><strong>Need to reschedule?</strong> No problem! Just reply to this email and we'll find a time that works better for you.</p>
            
//             <p>We're excited to learn about your project and explore how DigitalCraft can help you achieve your goals!</p>
            
//             <p>Best regards,<br>
//             <strong>The DigitalCraft Team</strong><br>
//             🎨 Branding • 💻 Development • 🤖 AI Solutions</p>
//           </div>
//           <div class="footer">
//             <p><strong>Questions before our meeting?</strong> Feel free to reach out:</p>
//             <p>📧 Email: <a href="mailto:${ADMIN_EMAIL}">${ADMIN_EMAIL}</a></p>
//             <p>🌐 Website: <a href="https://digitalcraft.com">digitalcraft.com</a></p>
//             <p><small>This is an automated confirmation email.</small></p>
//           </div>
//         </div>
//       </body>
//       </html>
//     `

//     // Send confirmation email to client
//     await sendEmail(meetingData.email, clientSubject, clientHtml)

//     console.log('Meeting emails sent successfully')

//     return new Response(
//       JSON.stringify({ 
//         success: true, 
//         message: 'Meeting scheduled successfully. Confirmation emails sent.',
//         data: {
//           meetingId: `meeting_${Date.now()}`,
//           name: meetingData.name,
//           email: meetingData.email,
//           date: meetingData.date,
//           time: meetingData.time,
//           timezone: meetingData.timezone,
//           calendarUrl: calendarUrl,
//           timestamp: new Date().toISOString()
//         }
//       }),
//       { 
//         status: 200,
//         headers: { ...corsHeaders, 'Content-Type': 'application/json' }
//       }
//     )
//   } catch (error) {
//     console.error('Error handling meeting request:', error)
//     throw new Error(`Failed to schedule meeting: ${error.message}`)
//   }
// }


serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { type, data } = await req.json();

    if (type === 'contact') {
      validateContactData(data);
      return await handleContactForm(data);
    }

    if (type === 'meeting') {
      validateMeetingData(data);
      return await handleMeetingRequest(data);
    }

    throw new Error('Invalid request type');
  } catch (error) {
    console.error('❌ Error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Server Error' }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

// Send email using SendGrid API
async function sendEmail(to: string, subject: string, html: string, text?: string) {
  const emailPayload = {
    personalizations: [{ to: [{ email: to }], subject }],
    from: { email: FROM_EMAIL, name: 'DigitalCraft Team' },
    content: text
      ? [{ type: 'text/plain', value: text }, { type: 'text/html', value: html }]
      : [{ type: 'text/html', value: html }]
  };

  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SENDGRID_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(emailPayload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('SendGrid error:', errorText);
    throw new Error('Failed to send email');
  }
}

// Validate contact form data
function validateContactData(data: unknown): asserts data is ContactFormData {
  if (
    typeof data !== 'object' ||
    data === null ||
    typeof (data as any).name !== 'string' ||
    typeof (data as any).email !== 'string' ||
    typeof (data as any).service !== 'string' ||
    typeof (data as any).message !== 'string'
  ) {
    throw new Error('Missing required contact fields');
  }
}

// Validate meeting form data
function validateMeetingData(data: unknown): asserts data is MeetingRequest {
  if (
    typeof data !== 'object' ||
    data === null ||
    typeof (data as any).name !== 'string' ||
    typeof (data as any).email !== 'string' ||
    typeof (data as any).date !== 'string' ||
    typeof (data as any).time !== 'string' ||
    typeof (data as any).timezone !== 'string'
  ) {
    throw new Error('Missing required meeting fields');
  }
}

// Contact form handler
async function handleContactForm(data: ContactFormData): Promise<Response> {
  const html = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Company:</strong> ${data.company || 'Not provided'}</p>
    <p><strong>Service:</strong> ${data.service}</p>
    <p><strong>Budget:</strong> ${data.budget || 'Not specified'}</p>
    <p><strong>Message:</strong><br>${data.message.replace(/\n/g, '<br>')}</p>
  `;

  await sendEmail(ADMIN_EMAIL, `New Contact from ${data.name}`, html);
  await sendEmail(data.email, 'Thanks for contacting DigitalCraft!', `<p>Hi ${data.name},<br>We received your message and will get back to you soon.</p>`);

  return new Response(
    JSON.stringify({
      success: true,
      message: 'Contact form submitted successfully',
    }),
    { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

// Meeting form handler
async function handleMeetingRequest(data: MeetingRequest): Promise<Response> {
  const html = `
    <h2>New Meeting Request</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Date:</strong> ${data.date}</p>
    <p><strong>Time:</strong> ${data.time} (${data.timezone})</p>
    <p><strong>Message:</strong><br>${data.message || 'No message'}</p>
  `;

  await sendEmail(ADMIN_EMAIL, `New Meeting Scheduled by ${data.name}`, html);
  await sendEmail(data.email, 'Meeting Scheduled with DigitalCraft', `<p>Hi ${data.name},<br>Your meeting has been scheduled. We'll contact you soon.</p>`);

  return new Response(
    JSON.stringify({
      success: true,
      message: 'Meeting scheduled successfully',
    }),
    { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}
