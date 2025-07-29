import NavBar from '@/components/NavBar'
import React from 'react'

const page = () => {
  return (
    <>
    <NavBar />

    <div className='flex flex-col justify-between  py-4 px-4 sm:px-10 md:px-20'>
            <h1 className='text-2xl md:text-4xl tracking-tight font-[900]'>Wallet Balance Checker</h1>

            <p className='px-1 text-primary/80 font-semibold text-lg md:text-xl'>Get the live balance for any address.</p>

    </div>
    </>
  )
}

export default page