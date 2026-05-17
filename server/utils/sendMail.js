import nodemailer from 'nodemailer';
import 'dotenv/config';
import { escapeHtml } from './escapeHtml.js';

const sendMailToAdmin = async userdata => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.PASS_KEY,
    },
  });

  const safeName = escapeHtml(userdata.fullName);
  const safePhone = escapeHtml(userdata.phoneNumber);
  const safeEmail = escapeHtml(userdata.email);
  const safeMessage = escapeHtml(userdata.message);
  const submittedAt = escapeHtml(new Date().toLocaleString());

  await transporter.sendMail({
    from: {
      name: `GLASSYUI Contact Form - ${new Date().toLocaleString()}`,
      address: process.env.EMAIL_ID,
    },
    to: process.env.ADMIN_EMAIL_ID,
    subject: 'New Contact Form Submission from GLASSYUI',
    text: `Name: ${userdata.fullName}\nPhone: ${userdata.phoneNumber}\nEmail: ${userdata.email}\nMessage: ${userdata.message}`,
    html: `<div style="background: #e3f2fd; color: #333; padding: 20px; font-family: Arial, sans-serif;">
                        <div style="font-size: 1.5rem; text-align: center; margin-bottom: 20px; color: #0288d1;">
                            GLASSYUI Contact Form Submission
                        </div>
                        <table style="width: 60%; border-collapse: collapse; margin: 0 auto; background: white; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                            <thead>
                                <tr>
                                    <th style="border: 1px solid #ddd; padding: 10px; text-align:center; background-color: #0288d1; color: white;">Field</th>
                                    <th style="border: 1px solid #ddd; padding: 10px; text-align:center; background-color: #0288d1; color: white;">Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td style="border: 1px solid #ddd; padding: 10px; text-align:center;">Name</td><td style="border: 1px solid #ddd; padding: 10px; text-align:center;">${safeName}</td></tr>
                                <tr><td style="border: 1px solid #ddd; padding: 10px; text-align:center;">Phone</td><td style="border: 1px solid #ddd; padding: 10px; text-align:center;">${safePhone}</td></tr>
                                <tr><td style="border: 1px solid #ddd; padding: 10px; text-align:center;">Email</td><td style="border: 1px solid #ddd; padding: 10px; text-align:center;">${safeEmail}</td></tr>
                                <tr><td style="border: 1px solid #ddd; padding: 10px; text-align:center;">Message</td><td style="border: 1px solid #ddd; padding: 10px; text-align:center;">${safeMessage}</td></tr>
                                <tr><td style="border: 1px solid #ddd; padding: 10px; text-align:center;">Submitted At</td><td style="border: 1px solid #ddd; padding: 10px; text-align:center;">${submittedAt}</td></tr>
                            </tbody>
                        </table>
                    </div>`,
  });
};

export { sendMailToAdmin };
