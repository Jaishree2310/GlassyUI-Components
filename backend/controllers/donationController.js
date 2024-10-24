const { z } = require('zod');
const Donation = require('../models/donation.model.js');

const donationSchema = z.object({
  amount: z
    .string()
    .regex(/^\d+$/, { message: 'Amount must be a number' })
    .min(1, { message: 'Amount is required' }),
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email format' }),
});

async function createDonation(req, res) {
  try {
    const validationResult = donationSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationResult.error.errors,
      });
    }

    const donationData = validationResult.data;
    const donation = await Donation.create(donationData);

    res.status(201).json({
      success: true,
      message: 'Donation recorded successfully',
      data: donation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while recording the donation',
      error: error.message,
    });
  }
}

module.exports = { createDonation };
