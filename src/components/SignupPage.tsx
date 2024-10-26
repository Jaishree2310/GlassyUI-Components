import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
        navigate('/');
      } else {
        alert(data.message || 'An error occurred');
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }

    // Clear form fields
    setUsername('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black'>
      <form
        onSubmit={handleSubmit}
        className='bg-white bg-opacity-10 p-8 rounded-lg shadow-md border border-white border-opacity-20 backdrop-filter backdrop-blur-lg w-96 h-auto'
      >
        <h2 className='text-2xl mb-4 text-center text-white'>Sign Up</h2>

        <div className='mb-4'>
          <label className='block text-white mb-2' htmlFor='username'>
            Username
          </label>
          <input
            type='text'
            id='username'
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            className='w-full p-2 rounded bg-gray-200'
            placeholder='Enter Username'
          />
        </div>

        <div className='mb-4'>
          <label className='block text-white mb-2' htmlFor='email'>
            Email
          </label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className='w-full p-2 rounded bg-gray-200'
            placeholder='Enter Email'
          />
        </div>

        <div className='mb-4'>
          <label className='block text-white mb-2' htmlFor='password'>
            Password
          </label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className='w-full p-2 rounded bg-gray-200'
            placeholder='Enter Password'
          />
        </div>

        <button
          type='submit'
          className='w-full p-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded transition duration-200'
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
