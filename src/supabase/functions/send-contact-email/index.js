import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

serve(async (req) => {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        return new Response('ok', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
            },
        })
    }

    if (req.method !== 'POST') {
        return new Response(
            JSON.stringify({ error: 'Method not allowed' }),
            {
                status: 405,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                }
            }
        )
    }

    try {
        const { email, message } = await req.json()

        if (!email || !message) {
            return new Response(
                JSON.stringify({ error: 'Email and message are required' }),
                {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }
                }
            )
        }

        const apiKey = Deno.env.get('SENDGRID_API_KEY')

        if (!apiKey) {
            return new Response(
                JSON.stringify({ error: 'Email service not configured' }),
                {
                    status: 500,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }
                }
            )
        }

        // SendGrid request with proper reply-to headers
       // SendGrid request with proper reply-to headers
const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'X-Supabase-Auth-Override': 'true'  // ✅ ADD THIS LINE to bypass Auth templates
    },
    body: JSON.stringify({
        personalizations: [{
            to: [{
                email: 'deepbluecargo@gmail.com',
                name: 'Deep Blue Cargo'
            }],
            subject: `🚢 New inquiry from ${email}`
        }],
        from: {
            email: 'deepbluecargo@gmail.com',
            name: 'Deep Blue Cargo'
        },
        reply_to: {
            email: email,
            name: email.split('@')[0]
        },
        content: [
            {
                type: 'text/plain',
                value: `
New Contact Form Inquiry

From: ${email}

Message:
${message}

---
Reply to this email to respond directly to ${email}
Received: ${new Date().toLocaleString()}
                `
            },
            {
                type: 'text/html',
                value: `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <style>
                            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
                            .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
                            .header { background: #050530; padding: 30px; border-radius: 12px 12px 0 0; }
                            .header h2 { color: white; margin: 0; font-size: 24px; }
                            .content { background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px; }
                            .badge { background: #f97316; color: white; padding: 6px 16px; border-radius: 20px; font-size: 14px; font-weight: bold; display: inline-block; margin-bottom: 20px; }
                            .info-box { background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 20px; }
                            .message-box { background: #f1f5f9; padding: 20px; border-radius: 8px; border-left: 4px solid #f97316; margin-top: 15px; }
                            .reply-box { background: #fff7ed; padding: 20px; border-radius: 8px; margin-top: 20px; }
                            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 13px; }
                            .visitor-email { color: #2563eb; font-size: 18px; font-weight: bold; }
                            a { color: #2563eb; text-decoration: none; }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="header">
                                <h2>🚢 New Contact Form Submission</h2>
                            </div>
                            
                            <div class="content">
                                <span class="badge">NEW INQUIRY</span>
                                
                                <div class="info-box">
                                    <p style="margin: 0 0 10px 0; font-size: 16px;">
                                        <strong style="color: #050530;">From:</strong><br />
                                        <span class="visitor-email">${email}</span>
                                    </p>
                                    
                                    <p style="margin: 20px 0 10px 0; font-size: 16px;">
                                        <strong style="color: #050530;">Message:</strong>
                                    </p>
                                    <div class="message-box">
                                        <p style="margin: 0; color: #1e293b; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                                    </div>
                                </div>
                                
                                <div class="reply-box">
                                    <p style="margin: 0 0 10px 0; color: #9a3412; font-weight: bold; font-size: 16px;">
                                        ⚡ Quick Reply
                                    </p>
                                    <p style="margin: 0; color: #7c2d12; font-size: 15px;">
                                        <strong>Option 1:</strong> Click this link to reply directly:<br />
                                        <a href="mailto:${email}?subject=Re: Your inquiry about Deep Blue Cargo&body=Hello,%0D%0A%0D%0AThank you for contacting Deep Blue Cargo.%0D%0A%0D%0A">✉️ Click here to reply to ${email.split('@')[0]}</a>
                                    </p>
                                    <p style="margin: 15px 0 0 0; color: #7c2d12; font-size: 15px;">
                                        <strong>Option 2:</strong> Hit the Gmail <strong style="background: white; padding: 2px 8px; border-radius: 4px;">Reply</strong> button below
                                    </p>
                                </div>
                                
                                <div class="footer">
                                    <p style="margin: 0;">
                                        Received: ${new Date().toLocaleString()}<br />
                                        This is an automated message from your logistics website contact form.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </body>
                    </html>
                `
            }
        ]
    })
})
        console.log('SendGrid status:', response.status)

        if (!response.ok) {
            const errorText = await response.text()
            console.error('SendGrid error:', errorText)

            return new Response(
                JSON.stringify({
                    error: 'SendGrid error',
                    status: response.status,
                    details: errorText
                }),
                {
                    status: 500,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }
                }
            )
        }

        return new Response(
            JSON.stringify({ success: true }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            }
        )

    } catch (error) {
        console.error('Function error:', error.message)
        return new Response(
            JSON.stringify({ error: error.message }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            }
        )
    }
})