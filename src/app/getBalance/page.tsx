"use client"
import NavBar from '@/components/NavBar'
import React, { useState } from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'


const page = () => {

    const [ chain, setChain ] = useState<'sol' | 'eth'>('sol');
    const [ address, setAddress ]= useState("");
    const [isLoading, setIsLoading] = useState<boolean>(false);



    const handleFetchBalance = ()=>{


    }


  return (
    <>
    <NavBar />

    <div className='flex flex-col justify-between  py-4 px-4 sm:px-10 md:px-20'>
            <h1 className='text-2xl md:text-4xl tracking-tight font-[900]'>Wallet Balance Checker</h1>

            <p className='px-1 text-primary/80 font-semibold text-lg md:text-xl'>Get the live balance for any address.</p>

    </div>
        <div className='flex items-center justify-center py-2 md:py-6'>

            <Card className='w-full max-w-2xl mx-auto rounded-lg'>
            <CardHeader>
                <CardTitle className='text-2xl flex items-center font-bold'>Check your Balance</CardTitle>
                <CardDescription>Via VVallet</CardDescription>
                {/* <CardAction>Card Action</CardAction> */}
            </CardHeader>
            <CardContent>
              

                {/* chain selection */}

                <div className="flex justify-center gap-2 p-1 ">
                    <Button
                        size={"lg"}
                        onClick={() => setChain('sol')}
                        variant={chain === 'sol' ? 'default' : 'outline'}
                    >Solana</Button>
                    <Button

                        size={"lg"}
                        onClick={() => setChain('eth')}
                        variant={chain === 'eth' ? 'default' : 'outline'}
                    >Ethereum</Button>
                </div>

                <div className="space-y-2 flex flex-col items-center-safe py-2">
                    <Input
                        type="text"
                        placeholder={chain === 'eth' ? 'Enter Ethereum Address (0x...)' : 'Enter Solana Address'}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="text-center w-3/4"
                    />
                    <Button onClick={handleFetchBalance} disabled={isLoading} className="w-1/2">
                        {isLoading ? 'Checking...' : 'Check Balance'}
                    </Button>
                </div>
            </CardContent>
            <CardFooter>
                <p>Card Footer</p>
            </CardFooter>
            </Card>
        </div>
   
    </>
  )
}

export default page