import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, otp: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'DocuFlow <onboarding@resend.dev>', // You should update this to your verified domain later
      to: [email],
      subject: 'Verify your DocuFlow account',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #333; text-align: center;">Welcome to DocuFlow!</h2>
          <p style="color: #555; font-size: 16px;">
            Thank you for registering. Please use the following One-Time Password (OTP) to verify your email address. 
            This code will expire in 10 minutes.
          </p>
          <div style="background-color: #f4f4f4; padding: 15px; text-align: center; border-radius: 5px; margin: 20px 0;">
            <h1 style="margin: 0; font-size: 32px; letter-spacing: 5px; color: #000;">${otp}</h1>
          </div>
          <p style="color: #777; font-size: 14px; text-align: center;">
            If you didn't request this code, you can safely ignore this email.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Error sending email via Resend:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Exception while sending email:', error);
    return { success: false, error };
  }
}
