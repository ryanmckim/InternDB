import nodemailer from "nodemailer";
import { EmailOptions } from "../types/email";

export default function sendEmail(options: EmailOptions) {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    secure: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    html: options.text,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(err);
    } else {
      console.log(info);
    }
  });
}
