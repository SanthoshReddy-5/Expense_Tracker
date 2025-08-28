import React from 'react';

const AuthLayout = ({children}) => {
  return (
    <div className='flex'>
        <div className="w-screen h-screen md:w-[50vw] flex items-center justify-center flex-col bg-black">
            <h2 className='text-3xl font-bold block md:hidden text-[rgb(255,82,0)] mb-3'>Track Pocket</h2>
            {children}
        </div>

        <div className='hidden md:block w-[50vw] h-screen bg-black py-15'>
            <div className='w-full h-full flex items-center justify-center flex-col border-l-2 border-white'>
                <h2 className='text-[rgb(255,82,0)] text-5xl font-bold mb-2'>Track Pocket</h2>
                <p className='text-white text-lg font-medium text-center'>Take control of your money with Track Pocket.</p>
                <p className='text-white text-lg font-medium text-center'>Spend with purpose, save with power and build a smarter financial future.</p>
            </div>
        </div>
    </div>
  )
}

export default AuthLayout;