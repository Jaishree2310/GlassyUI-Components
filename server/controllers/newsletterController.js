import NewsLetter from '../model/Newsletter.js';
import { sendMailToSubscriber } from '../sendSuscribedMail.js';

export async function saveNewsletter(req, res) {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newNewsLetter = new NewsLetter({ name, email });
    await newNewsLetter.save();
    await sendMailToSubscriber(newNewsLetter);

    res.status(201).json({ message: 'Subscription successful!' });
  } catch (error) {
    if (error?.code === 11000) {
      return res
        .status(409)
        .json({ message: 'This email is already subscribed.' });
    }
    console.error('Error saving newsletter subscription:', error);
    res.status(500).json({ message: 'Failed to subscribe.' });
  }
}

export async function getNewsletter(_req, res) {
  res.status(200).json({ message: 'Newsletter API is running.' });
}
