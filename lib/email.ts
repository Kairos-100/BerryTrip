import nodemailer from 'nodemailer'

// Email configuration
const transporter = nodemailer.createTransporter({
  service: 'gmail', // You can change this to your preferred email service
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
})

export const emailService = {
  // Send password reset email
  sendPasswordResetEmail: async (email: string, resetToken: string): Promise<boolean> => {
    try {
      const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`
      
      const mailOptions = {
        from: process.env.EMAIL_USER || 'your-email@gmail.com',
        to: email,
        subject: 'BerryTrip - Reset Your Password',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #ec4899, #8b5cf6); padding: 20px; text-align: center;">
              <h1 style="color: white; margin: 0;">BerryTrip</h1>
            </div>
            
            <div style="padding: 30px; background: #f9fafb;">
              <h2 style="color: #1f2937; margin-bottom: 20px;">Password Reset Request</h2>
              
              <p style="color: #4b5563; line-height: 1.6;">
                Hello! We received a request to reset your password for your BerryTrip account.
              </p>
              
              <p style="color: #4b5563; line-height: 1.6;">
                Click the button below to reset your password:
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}" 
                   style="background: linear-gradient(135deg, #ec4899, #8b5cf6); 
                          color: white; 
                          padding: 12px 30px; 
                          text-decoration: none; 
                          border-radius: 8px; 
                          display: inline-block;
                          font-weight: 600;">
                  Reset Password
                </a>
              </div>
              
              <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">
                If the button doesn't work, copy and paste this link into your browser:<br>
                <a href="${resetUrl}" style="color: #ec4899;">${resetUrl}</a>
              </p>
              
              <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">
                This link will expire in 1 hour for security reasons.
              </p>
              
              <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">
                If you didn't request this password reset, please ignore this email.
              </p>
            </div>
            
            <div style="background: #f3f4f6; padding: 20px; text-align: center; color: #6b7280; font-size: 12px;">
              <p>© 2024 BerryTrip. All rights reserved.</p>
              <p>This email was sent to ${email}</p>
            </div>
          </div>
        `
      }
      
      await transporter.sendMail(mailOptions)
      return true
    } catch (error) {
      console.error('Error sending password reset email:', error)
      return false
    }
  },
  
  // Send welcome email
  sendWelcomeEmail: async (email: string, firstName: string): Promise<boolean> => {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER || 'your-email@gmail.com',
        to: email,
        subject: 'Welcome to BerryTrip! 🎉',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #ec4899, #8b5cf6); padding: 20px; text-align: center;">
              <h1 style="color: white; margin: 0;">Welcome to BerryTrip!</h1>
            </div>
            
            <div style="padding: 30px; background: #f9fafb;">
              <h2 style="color: #1f2937; margin-bottom: 20px;">Hi ${firstName}! 👋</h2>
              
              <p style="color: #4b5563; line-height: 1.6;">
                Welcome to the BerryTrip community! We're thrilled to have you join thousands of women 
                traveling safely around the world.
              </p>
              
              <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #1f2937; margin-bottom: 15px;">What's next?</h3>
                <ul style="color: #4b5563; line-height: 1.8;">
                  <li>✅ Complete your profile</li>
                  <li>✅ Explore our safety map</li>
                  <li>✅ Connect with other travelers</li>
                  <li>✅ Set up emergency contacts</li>
                </ul>
              </div>
              
              <p style="color: #4b5563; line-height: 1.6;">
                Your account is now active and ready to use. Start exploring safe travel destinations 
                and connect with our amazing community!
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}" 
                   style="background: linear-gradient(135deg, #ec4899, #8b5cf6); 
                          color: white; 
                          padding: 12px 30px; 
                          text-decoration: none; 
                          border-radius: 8px; 
                          display: inline-block;
                          font-weight: 600;">
                  Start Exploring
                </a>
              </div>
            </div>
            
            <div style="background: #f3f4f6; padding: 20px; text-align: center; color: #6b7280; font-size: 12px;">
              <p>© 2024 BerryTrip. All rights reserved.</p>
              <p>This email was sent to ${email}</p>
            </div>
          </div>
        `
      }
      
      await transporter.sendMail(mailOptions)
      return true
    } catch (error) {
      console.error('Error sending welcome email:', error)
      return false
    }
  }
}
