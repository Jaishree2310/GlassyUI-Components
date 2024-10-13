import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import backgroundImage from '../bg.jpg';
import { auth, db } from '../Firebase';
import home from '../home.png';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const navigate = useNavigate();
  const Email = useRef();
  const Password = useRef();
  const [error, Seterror] = useState(null);

  const handleRegister = async e => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed up
        const user = userCredential.user;
        navigate('/');
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        Seterror(errorMessage);
        // console.log(errorCode);
        // console.log(errorMessage);
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
          Sign Up
        </h3>
        <form onSubmit={handleRegister}>
          {/* First Name Field */}
          <div className='mb-6'>
            <label
              className='block text-white text-sm font-bold mb-2'
              htmlFor='fname'
            >
              First Name
            </label>
            <input
              className='w-full px-4 py-3 rounded-lg bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
              id='fname'
              type='text'
              placeholder='Enter first name'
              value={fname}
              onChange={e => setFname(e.target.value)}
              required
            />
          </div>
          {/* Last Name Field */}
          <div className='mb-6'>
            <label
              className='block text-white text-sm font-bold mb-2'
              htmlFor='lname'
            >
              Last Name
            </label>
            <input
              className='w-full px-4 py-3 rounded-lg bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
              id='lname'
              type='text'
              placeholder='Enter last name'
              value={lname}
              onChange={e => setLname(e.target.value)}
            />
          </div>
          {/* Email Field */}
          <div className='mb-6'>
            <label
              className='block text-white text-sm font-bold mb-2'
              htmlFor='email'
            >
              Email Address
            </label>
            <input
              ref={Email}
              className='w-full px-4 py-3 rounded-lg bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
              id='email'
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
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
              required
            />
          </div>
          {/* Submit Button */}
          <button
            type='submit'
            className='w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-colors duration-300'
          >
            Sign Up
          </button>
          {/* Already Registered */}
          <div className='text-center mt-6'>
            <a href='/login' className='text-sm text-gray-400 hover:text-white'>
              Already registered?{' '}
              <span className='font-bold text-white'>Login</span>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
