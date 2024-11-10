import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const sendMailToSubscriber = userdata => {
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

  async function main() {
    await transporter.sendMail({
      from: {
        name: 'GlassyUI-Components',
        address: process.env.EMAIL_ID,
      },
      to: userdata.email,
      subject: 'Welcome to GlassyUI-Components! 🎉',
      text: 'Thank you for subscribing to GlassyUI-Components!',
      html: `
                <div style="background-color: #e0f7fa; color: #333; padding: 20px; font-family: Arial, sans-serif;">
                    <div style="max-width: 600px; margin: 0 auto; background: rgba(255, 255, 255, 0.8); padding: 20px; border-radius: 15px; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); backdrop-filter: blur(10px);">
                        <h2 style="text-align: center; color: #00acc1;">Welcome to GlassyUI-Components, ${userdata.name}!</h2>
                        <p style="font-size: 16px; line-height: 1.6; color: #555;">
                            Hi ${userdata.name},
                        </p>
                        <p style="font-size: 16px; line-height: 1.6; color: #555;">
                            We’re thrilled to have you join us at GlassyUI-Components, an open-source library that brings you beautiful glassmorphism-themed React components. Our library is perfect for creating sleek, modern web applications, and we can’t wait for you to explore and enjoy it!
                        </p>
                        <h3 style="color: #00acc1; margin-top: 20px;">✨ Features</h3>
                        <ul style="font-size: 16px; line-height: 1.6; color: #555;">
                            <li>Glassmorphism-themed React components</li>
                            <li>Customizable styles with SCSS</li>
                            <li>Beginner-friendly and easy to contribute</li>
                            <li>Modular and reusable components</li>
                        </ul>
                        <p style="font-size: 16px; line-height: 1.6; color: #555;">
                            Stay tuned for the latest updates and don’t hesitate to contribute to make GlassyUI-Components even better!
                        </p>
                        <p style="font-size: 16px; line-height: 1.6; color: #555;">
                            Best Regards, <br/>
                            The GlassyUI-Components Team
                        </p>
                    </div>
                </div>
            `,
    });
  }

  main().catch(console.error);
};

export { sendMailToSubscriber };
