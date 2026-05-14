import React, { useState } from 'react';
import { z } from 'zod';

const DonationPage: React.FC = () => {
  const [formData, setFormData] = useState({
    amount: '',
    name: '',
    email: '',
  });
  const [errors, setErrors] = useState({
    amount: '',
    name: '',
    email: '',
  });

  const donationSchema = z.object({
    amount: z
      .string()
      .regex(/^\d+$/, { message: 'Amount must be a number' })
      .min(1, { message: 'Amount is required' }),
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email({ message: 'Invalid email format' }),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      donationSchema.parse(formData);
      setErrors({ amount: '', name: '', email: '' });
      alert('Form submitted successfully!');
    } catch (err: any) {
      const formattedErrors: any = {};
      err.errors.forEach((error: any) => {
        formattedErrors[error.path[0]] = error.message;
      });
      setErrors(formattedErrors);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 via-gray-900 to-black p-10'>
      {/* Glassmorphism Container */}
      <div className='w-full max-w-lg p-10 bg-opacity-40 bg-gray-900 backdrop-blur-xl rounded-3xl shadow-2xl border border-opacity-30 border-gray-300'>
        <div className='text-center mb-8'>
          <h1 className='text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2'>
            Support Us!
          </h1>
          <p className='text-lg text-gray-200'>
            Your contributions help us continue our work.
          </p>
        </div>

        <form noValidate onSubmit={handleSubmit} className='space-y-6'>
          {/* Donation Amount */}
          <div className='w-full'>
            <label
              className='block text-gray-400 text-sm font-semibold mb-2'
              htmlFor='amount'
            >
              DONATION AMOUNT (₹) <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              id='amount'
              name='amount'
              placeholder='Enter amount in Rupees'
              className='w-full p-4 rounded-lg bg-gray-800 text-white border border-transparent transition-all duration-300 ease-in-out transform hover:bg-gray-700 focus:bg-gray-700 focus:border-blue-500 outline-none'
              value={formData.amount}
              onChange={handleChange}
              required
            />
            {errors.amount && (
              <p className='text-red-500 text-sm mt-2'>{errors.amount}</p>
            )}
          </div>

          {/* Name */}
          <div className='w-full'>
            <label
              className='block text-gray-400 text-sm font-semibold mb-2'
              htmlFor='name'
            >
              YOUR NAME <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              id='name'
              name='name'
              placeholder='Enter your name'
              className='w-full p-4 rounded-lg bg-gray-800 text-white border border-transparent transition-all duration-300 ease-in-out transform hover:bg-gray-700 focus:bg-gray-700 focus:border-blue-500 outline-none'
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && (
              <p className='text-red-500 text-sm mt-2'>{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className='w-full'>
            <label
              className='block text-gray-400 text-sm font-semibold mb-2'
              htmlFor='email'
            >
              YOUR EMAIL <span className='text-red-500'>*</span>
            </label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='Enter your email'
              className='w-full p-4 rounded-lg bg-gray-800 text-white border border-transparent transition-all duration-300 ease-in-out transform hover:bg-gray-700 focus:bg-gray-700 focus:border-blue-500 outline-none'
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && (
              <p className='text-red-500 text-sm mt-2'>{errors.email}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            className='w-full bg-blue-600 text-white py-4 rounded-lg font-bold hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none shadow-lg'
          >
            Donate Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonationPage;
