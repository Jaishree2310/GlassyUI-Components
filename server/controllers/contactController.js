import Contact from '../model/contact.js';
import { sendMailToAdmin } from '../utils/sendMail.js';

export async function saveContact(req, res) {
  try {
    const { fullName, phoneNumber, email, message } = req.body;

    if (!fullName || !phoneNumber || !email || !message) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newContact = new Contact({ fullName, phoneNumber, email, message });
    sendMailToAdmin(newContact);

    await newContact.save();

    res
      .status(201)
      .json({ message: 'Contact form submitted successfully!', newContact });
  } catch (error) {
    console.error('Error saving contact form:', error);
    res.status(500).json({ message: 'Failed to submit contact form.', error });
  }
}

export async function getContact(req, res) {
  res.send('hello contact');
}
