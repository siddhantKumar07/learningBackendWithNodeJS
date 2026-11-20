import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
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
  const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${token}`;
  const subject = "Verify your email";
  const html = `<p>Please click the following link to verify your email:</p><a href="${verificationUrl}">${verificationUrl}</a>`;
  await sendEmail({to,subject,html});
}

const sendResetPasswordEmail = async({to,token})=>{
    const resetPasswordUrl = `${process.env.CLIENT_URL}/reset-password?token=${token}`;
    const subject = "Reset your password";
    const html = `<p>Please click the following link to reset your password:</p><a href="${resetPasswordUrl}">${resetPasswordUrl}</a> <br> <p> this link expires in 15 minutes </p>`;
    await sendEmail({to,subject,html});
}

export {
sendVerificationEmail,
sendResetPasswordEmail
}