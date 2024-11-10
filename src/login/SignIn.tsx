import React, { useState, FormEvent } from 'react';
import { Link, Navigate } from 'react-router-dom';
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from './firebase/auth';
import { useAuth } from './contexts/authContext';

const SignIn: React.FC = () => {
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithEmailAndPassword(email, password);
        // Optionally, send email verification
      } catch (err) {
        setErrorMessage('Failed to sign in. Please try again.');
        setIsSigningIn(false);
      }
    }
  };

  const onGoogleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithGoogle();
      } catch (err) {
        setErrorMessage('Google sign-in failed. Please try again.');
        setIsSigningIn(false);
      }
    }
  };

  if (userLoggedIn) {
    return <Navigate to='/' replace />;
  }

  return (
    <div>
      <main className='w-full h-screen flex items-center justify-center bg-gray-900'>
        <div className='w-96 text-gray-200 space-y-6 p-6 shadow-xl border border-gray-700 rounded-xl bg-gray-800'>
          <div className='text-center'>
            <h3 className='text-gray-100 text-2xl font-semibold'>
              Welcome Back
            </h3>
          </div>
          <form onSubmit={onSubmit} className='space-y-6'>
            <div>
              <label className='text-sm font-semibold text-gray-400'>
                Email
              </label>
              <input
                type='email'
                autoComplete='email'
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className='w-full mt-2 px-4 py-2 text-gray-200 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition duration-300'
              />
            </div>
            <div>
              <label className='text-sm font-semibold text-gray-400'>
                Password
              </label>
              <input
                type='password'
                autoComplete='current-password'
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className='w-full mt-2 px-4 py-2 text-gray-200 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition duration-300'
              />
            </div>
            {errorMessage && (
              <span className='text-red-500 font-semibold'>{errorMessage}</span>
            )}
            <button
              type='submit'
              disabled={isSigningIn}
              className={`w-full px-4 py-2 text-white font-semibold rounded-lg ${isSigningIn ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-lg transition duration-300'}`}
            >
              {isSigningIn ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
          <p className='text-center text-sm text-gray-400'>
            Don&apos;t have an account?{' '}
            <Link
              to='/signup'
              className='text-blue-500 hover:underline font-semibold'
            >
              Sign up
            </Link>
          </p>
          <div className='flex items-center w-full'>
            <div className='border-b border-gray-600 flex-grow'></div>
            <span className='mx-3 text-sm text-gray-400 font-bold'>OR</span>
            <div className='border-b border-gray-600 flex-grow'></div>
          </div>
          <button
            disabled={isSigningIn}
            onClick={onGoogleSignIn}
            className={`w-full flex items-center justify-center gap-x-3 py-3 px-4 border hover:text-blue-300 border-gray-600 rounded-lg text-gray-200 font-medium ${isSigningIn ? 'cursor-not-allowed bg-gray-700' : 'bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 active:scale-95'}`}
          >
            <svg
              className='w-5 h-5'
              viewBox='0 0 48 48'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z'
                fill='#4285F4'
              />
              <path
                d='M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z'
                fill='#34A853'
              />
              <path
                d='M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z'
                fill='#FBBC04'
              />
              <path
                d='M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z'
                fill='#EA4335'
              />
            </svg>
            {isSigningIn ? 'Signing In...' : 'Continue with Google'}
          </button>
        </div>
      </main>
    </div>
  );
};

export default SignIn;
