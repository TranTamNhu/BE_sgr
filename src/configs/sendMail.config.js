import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true', 
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const mailService = {
  async sendMail(
    {
      emailFrom,
      emailTo,
      emailSubject,
      emailText
    }
  ) {
    const mailOptions = {
      from: emailFrom,
      to: emailTo,
      subject: emailSubject,
      text: emailText,
    };
    
    console.log("mailOptions: ", mailOptions);
    
    try {
      const result = await transporter.sendMail(mailOptions);
      console.log("Email sent successfully");
      return result;
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  },
};