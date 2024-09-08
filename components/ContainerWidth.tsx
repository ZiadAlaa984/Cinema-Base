import React from 'react'

export default function ContainerWidth({children}:any) {
  return (
      <div className='mx-auto px-4 md:px-8 max-w-screen-2xl '>
                    {children}
    </div>
  )
}
