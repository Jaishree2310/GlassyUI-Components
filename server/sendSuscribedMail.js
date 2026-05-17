import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { escapeHtml } from './utils/escapeHtml.js';

dotenv.config();

const sendMailToSubscriber = async userdata => {
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

  const safeName = escapeHtml(userdata.name);

  await transporter.sendMail({
    from: {
      name: 'GlassyUI-Components',
      address: process.env.EMAIL_ID,
    },
    to: userdata.email,
    subject: 'Welcome to GlassyUI-Components!',
    text: `Thank you for subscribing, ${userdata.name}!`,
    html: `
                <div style="background-color: #e0f7fa; color: #333; padding: 20px; font-family: Arial, sans-serif;">
                    <div style="max-width: 600px; margin: 0 auto; background: rgba(255, 255, 255, 0.8); padding: 20px; border-radius: 15px;">
                        <h2 style="text-align: center; color: #00acc1;">Welcome to GlassyUI-Components, ${safeName}!</h2>
                        <p style="font-size: 16px; line-height: 1.6; color: #555;">
                            Thank you for subscribing. We are glad to have you in the community.
                        </p>
                        <p style="font-size: 16px; line-height: 1.6; color: #555;">
                            Best Regards,<br/>
                            The GlassyUI-Components Team
                        </p>
                    </div>
                </div>
            `,
  });
};

export { sendMailToSubscriber };
