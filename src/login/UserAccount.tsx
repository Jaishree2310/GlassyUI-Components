import React, { useState } from 'react';
import { doSignOut } from '../login/firebase/auth';

interface UserAccountProps {
  email: string;
  username?: string;
}

const UserAccount: React.FC<UserAccountProps> = ({ email, username }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Extract the first letter of the email for the avatar
  const avatarLetter = email.charAt(0).toUpperCase();

  return (
    <div className='relative'>
      <div
        className='flex items-center justify-center w-10 h-10 bg-green-800 text-white rounded-full cursor-pointer absolute -top-[0.6rem] right-[5rem]'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {avatarLetter}
      </div>
      <button
        className=' text-red-500 text-sm font-medium hover:underline'
        onClick={doSignOut}
      >
        Sign Out
      </button>

      {isHovered && (
        <div className='absolute bg-gray-800 top-[2rem] right-[1rem] py-2 pr-10 pl-2 text-start rounded-lg font-normal'>
          <span className='text-gray-200 text-sm'>Glassy UI Account</span>
          <br />
          <span className='text-gray-400 text-sm'>{email}</span>
          <br />
          {username && (
            <span className='text-gray-400 text-sm'>{username}</span>
          )}
          <br />
        </div>
      )}
    </div>
  );
};

export default UserAccount;
