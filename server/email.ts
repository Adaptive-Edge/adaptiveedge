import { MailService } from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY environment variable must be set");
}

const mailService = new MailService();
mailService.setApiKey(process.env.SENDGRID_API_KEY);

interface ContactFormEmailParams {
  name: string;
  email: string;
  company?: string;
  message: string;
  submissionId: string;
  submissionTime: string;
}

export async function sendContactFormNotification(
  params: ContactFormEmailParams,
  notificationEmail: string = "hello@adaptiveedge.uk"
): Promise<boolean> {
  try {
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #FF6B35 0%, #1E3A8A 100%); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
          <p style="color: #FFE4E1; margin: 5px 0 0 0;">Adaptive Edge Website</p>
        </div>
        
        <div style="padding: 30px; background: #fff;">
          <h2 style="color: #1E3A8A; margin-top: 0;">Contact Details</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Name:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${params.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Email:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="mailto:${params.email}" style="color: #FF6B35;">${params.email}</a></td>
            </tr>
            ${params.company ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Company:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${params.company}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Submitted:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${params.submissionTime}</td>
            </tr>
          </table>
          
          <h3 style="color: #1E3A8A; margin: 30px 0 15px 0;">Message</h3>
          <div style="background: #f8f9fa; padding: 20px; border-left: 4px solid #FF6B35; border-radius: 4px;">
            <p style="margin: 0; line-height: 1.6; color: #333;">${params.message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="margin: 30px 0; text-align: center;">
            <a href="mailto:${params.email}?subject=Re: Your inquiry to Adaptive Edge" 
               style="background: #FF6B35; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Reply to ${params.name}
            </a>
          </div>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #eee;">
          <p style="color: #666; margin: 0; font-size: 12px;">
            Submission ID: ${params.submissionId}<br>
            This email was automatically generated from your Adaptive Edge website contact form.
          </p>
        </div>
      </div>
    `;

    const emailText = `
New Contact Form Submission - Adaptive Edge

Name: ${params.name}
Email: ${params.email}
${params.company ? `Company: ${params.company}` : ''}
Submitted: ${params.submissionTime}

Message:
${params.message}

Submission ID: ${params.submissionId}
Reply to: ${params.email}
    `;

    await mailService.send({
      to: notificationEmail,
      from: {
        email: 'noreply@adaptiveedge.uk',
        name: 'Adaptive Edge Website'
      },
      subject: `New Contact Form Submission from ${params.name}`,
      text: emailText,
      html: emailHtml,
    });

    console.log(`Contact form notification sent for submission ${params.submissionId}`);
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}

export async function sendContactFormConfirmation(
  params: ContactFormEmailParams
): Promise<boolean> {
  try {
    const confirmationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #FF6B35 0%, #1E3A8A 100%); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Thank you for contacting us!</h1>
          <p style="color: #FFE4E1; margin: 5px 0 0 0;">Adaptive Edge</p>
        </div>
        
        <div style="padding: 30px; background: #fff;">
          <p style="font-size: 16px; color: #333; margin-bottom: 20px;">Hi ${params.name},</p>
          
          <p style="line-height: 1.6; color: #333;">
            Thank you for reaching out to Adaptive Edge. We've received your message and will get back to you within 24 hours.
          </p>
          
          <div style="background: #f8f9fa; padding: 20px; border-left: 4px solid #FF6B35; margin: 20px 0; border-radius: 4px;">
            <h3 style="margin: 0 0 10px 0; color: #1E3A8A;">Your message:</h3>
            <p style="margin: 0; color: #666; font-style: italic;">"${params.message}"</p>
          </div>
          
          <p style="line-height: 1.6; color: #333;">
            In the meantime, feel free to explore our approach to strategy and innovation at 
            <a href="https://adaptiveedge.uk" style="color: #FF6B35;">adaptiveedge.uk</a>.
          </p>
          
          <p style="line-height: 1.6; color: #333; margin-top: 30px;">
            Best regards,<br>
            <strong style="color: #1E3A8A;">The Adaptive Edge Team</strong>
          </p>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #eee;">
          <p style="color: #666; margin: 0; font-size: 12px;">
            Adaptive Edge - Strategy and Innovation Consultancy<br>
            Helping organizations thrive in uncertainty through collective intelligence
          </p>
        </div>
      </div>
    `;

    await mailService.send({
      to: params.email,
      from: {
        email: 'hello@adaptiveedge.uk',
        name: 'Adaptive Edge'
      },
      subject: 'Thank you for contacting Adaptive Edge',
      html: confirmationHtml,
    });

    console.log(`Confirmation email sent to ${params.email}`);
    return true;
  } catch (error) {
    console.error('SendGrid confirmation email error:', error);
    return false;
  }
}