import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { toast } from 'react-toastify';
import SignInwithGoogle from './SignInWithGoogle';
import backgroundImage from '../bg.jpg';
import home from '../home.png';
import { useNavigate } from 'react-router-dom';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, Seterror] = useState(null);
  const navigate = useNavigate();
  const Email = useRef();
  const Password = useRef();

  const handleSubmit = async e => {
    const auth = getAuth();
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        navigate('/');
        console.log(user);
        // ...
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;

        Seterror('Sorry, your email or password is wrong!');
      });
  };

  return (
    <div className='flex justify-center items-center h-screen bg-gradient-to-r from-blue-900 to-red-900'>
      {/* Background image */}
      <div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat'
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>

      <div className='absolute top-16 left-24 w-11 h-11 z-20'>
        <a href='/'>
          {' '}
          <img
            src={home}
            alt='Home'
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
              cursor: 'pointer',
              transition: 'transform 0.2s ease-in-out',
            }}
            onMouseOver={e => (e.target.style.transform = 'scale(1.1)')}
            onMouseOut={e => (e.target.style.transform = 'scale(1)')}
          ></img>{' '}
        </a>
      </div>

      <div className='relative bg-black bg-opacity-70 shadow-lg rounded-lg p-8 w-full max-w-md'>
        <h3 className='text-center text-white text-3xl font-bold mb-6'>
          Login
        </h3>
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className='mb-6'>
            <label
              className='block text-white text-sm font-bold mb-2'
              htmlFor='email'
            >
              Email address
            </label>
            <input
              ref={Email}
              className='w-full px-4 py-3 rounded-lg bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
              id='email'
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          {/* Password Field */}
          <div className='mb-6'>
            <label
              className='block text-white text-sm font-bold mb-2'
              htmlFor='password'
            >
              Password
            </label>
            <input
              ref={Password}
              className='w-full px-4 py-3 rounded-lg bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
              id='password'
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <p className='text-red-600 font-semibold p-2'>{error}</p>
          {/* Remember me and Forgot password */}
          <div className='flex items-center justify-between mb-6'>
            <label className='flex items-center text-gray-400 text-sm'>
              <input type='checkbox' className='mr-2 leading-tight' />
              <span>Remember me</span>
            </label>
            <a
              href='/forgot-password'
              className='text-sm text-blue-400 hover:text-blue-500'
            >
              Forgot password?
            </a>
          </div>
          {/* Submit Button */}
          <button
            type='submit'
            className='w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-colors duration-300'
          >
            Login
          </button>
          {/* Register link */}
          <div className='text-center mt-6'>
            <a
              href='/register'
              className='text-sm text-gray-400 hover:text-white'
            >
              Don't have an account?{' '}
              <span className='font-bold text-white'>Register</span>
            </a>
          </div>
          <SignInwithGoogle />
        </form>
      </div>
    </div>
  );
}

export default Login;
