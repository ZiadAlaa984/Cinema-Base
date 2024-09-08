import React from 'react'

export default function Loading() {
  return (
      <div className='h-screen flex justify-center items-center z-[999999999999999999999999999999] overflow-hidden fixed inset-0 bg-black'>
          <div className="loader"></div>
    </div>
  )
}
