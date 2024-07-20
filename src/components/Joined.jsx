import React from 'react';
import { ImageIcon } from '../icons';

export default function Joined() {
  return (
    <div className='flex flex-col gap-5'>
      <div className='bg-gray-700 flex gap-5 h-40 p-3 rounded-lg'>
        <div className='bg-green-300 w-60'>
          <ImageIcon />
        </div>
        <div className=' w-full flex flex-col justify-between'>
          <div className='text-white flex flex-col gap-2'>
            <p>Location</p>
            <p>Username</p>
            <p>Date</p>
          </div>
          <button className='bg-[#1CD760] rounded-full w-full p-1'>
            REMOVE
          </button>
        </div>
      </div>
    </div>
  );
}
