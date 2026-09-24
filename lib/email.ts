import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export async function sendVerificationEmail(email: string, otp: string) {
  try {
    const mailOptions = {
      from: `"DocuFlow" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Verify your DocuFlow account',
      html: `
        <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #f9fafb; color: #111827;">
          <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 16px; padding: 40px; text-align: center; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);">
            
            <h2 style="color: #111827; font-size: 28px; font-weight: 700; margin-top: 0; margin-bottom: 20px; letter-spacing: -0.5px;">Welcome to DocuFlow</h2>
            
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
              Thank you for registering. Please use the following One-Time Password (OTP) to verify your login or email address. 
              This code will expire in 10 minutes.
            </p>
            
            <div style="background-color: #f0f6ff; border: 1px solid #bfdbfe; padding: 24px; border-radius: 12px; margin: 30px 0;">
              <h1 style="margin: 0; font-size: 42px; letter-spacing: 12px; color: #0078D4; font-weight: 800;">${otp}</h1>
            </div>
            
            <p style="color: #6b7280; font-size: 14px; margin-top: 40px; padding-top: 20px; border-top: 1px solid #f3f4f6;">
              If you didn't request this code, you can safely ignore this email. Your account remains secure.
            </p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    return { success: true, data: info };
  } catch (error) {
    console.error('Exception while sending email via Nodemailer:', error);
    return { success: false, error };
  }
}

export async function sendPasswordResetEmail(email: string, token: string) {
  try {
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reset-password?token=${token}`;

    const mailOptions = {
      from: `"DocuFlow" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Reset your DocuFlow password',
      html: `
        <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #f9fafb; color: #111827;">
          <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 16px; padding: 40px; text-align: center; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);">
            
            <h2 style="color: #111827; font-size: 28px; font-weight: 700; margin-top: 0; margin-bottom: 20px; letter-spacing: -0.5px;">Reset your Password</h2>
            
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 40px;">
              You requested a password reset for your DocuFlow account. Click the button below to choose a new password. This link is secure and will expire in 1 hour.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetLink}" style="background-color: #0078D4; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; display: inline-block; box-shadow: 0 4px 6px rgba(0, 120, 212, 0.2);">
                Reset Password
              </a>
            </div>
            
            <p style="color: #6b7280; font-size: 14px; margin-top: 40px; padding-top: 20px; border-top: 1px solid #f3f4f6;">
              If you didn't request a password reset, you can safely ignore this email. Your password will not change.
            </p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    return { success: true, data: info };
  } catch (error) {
    console.error('Exception while sending reset email via Nodemailer:', error);
    return { success: false, error };
  }
}

