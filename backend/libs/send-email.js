import nodeMailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendEmail = async (email, subject, htmlContent) => {
  // Validate SMTP configuration
  if (!process.env.SMTP_HOST || !process.env.SMTP_MAIL || !process.env.SMTP_PASSWORD) {
    throw new Error("SMTP configuration is incomplete. Please check your environment variables: SMTP_HOST, SMTP_MAIL, SMTP_PASSWORD");
  }

  const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || 587,
    service: process.env.SMTP_SERVICE,
    secure: process.env.SMTP_PORT == 465,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const options = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: subject,
    html: htmlContent,
  };

  try {
    const info = await transporter.sendMail(options);
    console.log("✓ Email sent successfully to:", email);
    return info;
  } catch (error) {
    console.error("✗ Error sending email to", email, ":", error.message);
    throw error;
  }
};