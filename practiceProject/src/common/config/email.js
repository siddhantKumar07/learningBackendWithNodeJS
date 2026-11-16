import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendEmail = async({to,subject,html})=>{
  const info = await transporter.sendMail({
    from: `${process.env.SMTP_FROM_EMAIL}`, // sender address
    to:to, // list of recipients
    subject: subject, // Subject line
    // text: "Hello world?", // plain text body
    html: html, // HTML body
  });
}

const sendVerificationEmail = async({to,token})=>{
  const verificationUrl = `http://localhost:3000/api/v1/auth/verify-email?token=${token}`;
  const subject = "Verify your email";
  const html = `<p>Please click the following link to verify your email:</p><a href="${verificationUrl}">${verificationUrl}</a>`;
  await sendEmail({to,subject,html});
}

const sendResetPasswordEmail = async({to,token})=>{
    const resetPasswordUrl = `http://localhost:3000/api/v1/auth/reset-password?token=${token}`;
    const subject = "Reset your password";
    const html = `<p>Please click the following link to reset your password:</p><a href="${resetPasswordUrl}">${resetPasswordUrl}</a>`;
    await sendEmail({to,subject,html});
}

export {
sendVerificationEmail,
sendResetPasswordEmail
}