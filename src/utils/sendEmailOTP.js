import nodemailer from "nodemailer";

export const sendEmailOTP = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Lunch Home" <${process.env.MAIL_USER}>`,
    to: email,
    subject: "Your OTP for Lunch Home Verification",
    text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
  });
};
