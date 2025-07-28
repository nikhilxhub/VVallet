"use client"
import { Wallet } from '@/types/wallet'
import React, { useState } from 'react'
import { Button } from './ui/button';

const WalletGenerator = () => {

    const [wallets, setWallets ]= useState<Wallet[]>([]);
    const [pathTypes, setPathTypes] = useState<string[]>([]);

  return (
    <div className='flex flex-col py-15 px-20'>
        {wallets.length == 0 && (
            <div>

                <div>

                    {pathTypes.length == 0 && (
                        <div className='flex flex-col'> 
                            <div className='flex flex-col gap-2'>
                                <h1 className='text-4xl tracking-tighter font-[900]'>VVALLET Supports multiple blockChains</h1>
                                <p className='text-primary/80 font-semibold'>Choose a BlockChain to get Started </p>
                            </div>

                            <div className='flex gap-2 py-4'>
                                <Button size={"lg"}>Solana</Button>
                                <Button size = {"lg"}>Ethereum</Button>
                            </div>
                        </div>
                    )}

                    {pathTypes.length !== 0 && (
                        <div>


                        </div>

                    )}
                </div>
                
            </div>
        )}

    </div>


  )
}

export default WalletGenerator