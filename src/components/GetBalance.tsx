"use client"
import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

const GetBalance = () => {

  const router = useRouter();


  return (
    // <div className='flex flex-row  gap-2 py-4 px-4 sm:px-10 md:px-20 self-end'>
    <div className='flex flex-row gap-2 py-4 px-2 sm:px-10 md:px-20 self-end'>
      <Button onClick={() => router.push("/getBalance")}>get balance</Button>
      <Button onClick={() => router.push("/getairDrop")}>get AirDrop</Button>
      {/* <Button onClick={() => router.push("/createToken")}>Token</Button> */}
      <Button onClick={() => router.push("/sendSol")}>send solana</Button>
       {/* <Button
        onClick={() => router.push("/createToken")}
        variant="outline"
        className="text-white border-amber-500 hover:bg-amber-500 hover:text-amber-500 transition-all duration-300 shadow-amber-500/30 hover:shadow-md"
      >
        Token
      </Button> */}
      {/* <Button
        onClick={() => router.push("/createToken")}
        className="bg-gray-200 text-gray-800 shadow-md hover:shadow-lg active:shadow-inner transition-all duration-300"
      >
        Token
      </Button> */}
      <Button
        onClick={() => router.push("/createToken")}
        className="bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300"
      >
        Token
      </Button>
      {/* <Button></Button> */}



    </div>
  )
}

export default GetBalance