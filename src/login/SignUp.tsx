import React, { useState, FormEvent } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from './contexts/authContext/index';
import { doCreateUserWithEmailAndPassword } from './firebase/auth';

const Register = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { userLoggedIn } = useAuth();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isRegistering) {
      setIsRegistering(true);
      try {
        await doCreateUserWithEmailAndPassword(email, password);
      } catch (error) {
        setErrorMessage('An error occurred. Please try again.');
      } finally {
        setIsRegistering(false);
      }
    }
  };

  if (userLoggedIn) {
    return <Navigate to='/sign-in' replace />;
  }

  return (
    <main className='w-full h-screen flex items-center justify-center bg-gray-900 text-gray-300'>
      <div className='w-96 p-6 bg-gray-800 border border-gray-700 rounded-xl shadow-lg space-y-6'>
        <div className='text-center'>
          <h3 className='text-white text-2xl font-semibold'>
            Create a New Account
          </h3>
        </div>
        <form onSubmit={onSubmit} className='space-y-5'>
          <div>
            <label className='block text-sm font-semibold'>Email</label>
            <input
              type='email'
              autoComplete='email'
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className='w-full mt-2 px-3 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg outline-none focus:border-blue-500 focus:bg-gray-600 transition duration-300'
            />
          </div>
          <div>
            <label className='block text-sm font-semibold'>Password</label>
            <input
              type='password'
              autoComplete='new-password'
              disabled={isRegistering}
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className='w-full mt-2 px-3 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg outline-none focus:border-blue-500 focus:bg-gray-600 transition duration-300'
            />
          </div>
          <div>
            <label className='block text-sm font-semibold'>
              Confirm Password
            </label>
            <input
              type='password'
              autoComplete='off'
              disabled={isRegistering}
              required
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className='w-full mt-2 px-3 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg outline-none focus:border-blue-500 focus:bg-gray-600 transition duration-300'
            />
          </div>
          {errorMessage && (
            <span className='text-red-500 text-sm font-semibold'>
              {errorMessage}
            </span>
          )}
          <button
            type='submit'
            disabled={isRegistering}
            className={`w-full py-2 mt-4 text-white font-medium hover:text-white rounded-lg ${isRegistering ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-lg transition duration-300'}`}
          >
            {isRegistering ? 'Signing Up...' : 'Sign Up'}
          </button>
          <div className='text-sm text-center'>
            Already have an account?{' '}
            <Link to={'/signin'} className='text-blue-400 hover:underline'>
              Continue
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Register;
