import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Signup successful, navigating to home...');
        navigate('/');
      } else {
        console.log('Wrong credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Invalid Credentials');
    }
    setEmail('');
    setPassword('');
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black'>
      <form
        onSubmit={handleSubmit}
        className='bg-white bg-opacity-10 p-3 rounded-lg shadow-md border border-white border-opacity-20 backdrop-filter backdrop-blur-lg w-96 h-auto'
      >
        <h2 className='text-2xl mb-4 text-center text-white'>Login</h2>

        <div className='mb-4'>
          <label className='block text-white mb-2' htmlFor='username'>
            Email
          </label>
          <input
            type='text'
            id='username'
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
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
