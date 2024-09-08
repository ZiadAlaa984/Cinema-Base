import React from 'react';

export default function Loading() {
  return (
    <div 
      role="alert" 
      className='h-screen flex justify-center items-center fixed inset-0 bg-black z-50 overflow-hidden'
    >
      <div className="loader"></div>
    </div>
  );
}
