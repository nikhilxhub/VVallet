"use client"
import { Wallet } from '@/types/wallet'
import React, { useState } from 'react'
import { Button } from './ui/button';
import { Input } from './ui/input';
import { handleGenerateWallet } from '@/utils/wallet';

const WalletGenerator = () => {

    const [wallets, setWallets ]= useState<Wallet[]>([]);
    const [pathTypes, setPathTypes] = useState<string[]>([]);
    const [mnemonicInput, setMnemonicInput] = useState<string>("");

  return (
    <div className='flex flex-col py-4 px-4 sm:px-10 md:px-20'>
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
                                <Button size={"lg"}
                                        onClick={() =>{
                                            setPathTypes(["501"])
                                        }}
                                    >Solana</Button>
                                <Button size = {"lg"}
                                        onClick={() =>{
                                            setPathTypes(["60"])
                                        }}
                                    >Ethereum</Button>
                            </div>
                        </div>
                    )}

                    {pathTypes.length !== 0 && (
                        <div className='flex flex-col gap-4'>

                            <div className='flex flex-col gap-2'>


                                <h1 className='text-4xl font-[1000] tracking-tighter'>Secret Recovery Phrase</h1>
                                <p className='text-primary/80 font-semibold text-lg'>Save these words in a safe place.</p>
                            </div>
                            
                            <div className='flex flex-col md:flex-row gap-4'>
                                <Input type='password'
                                        placeholder='Enter your secretPhrase (or to leave blank to Generate)'
                                        value={mnemonicInput}
                                        onChange={(e) =>  setMnemonicInput(e.target.value)}
                                />
                                <Button size={"lg"}
                                        onClick={() => handleGenerateWallet()}

                                >

                                    {mnemonicInput ? "Add Wallet" : "Generate Wallet"}
                                </Button>


                            </div>


                        </div>

                    )}
                </div>
                
            </div>
        )}

        {/* need to display secret Phrase */}

    </div>


  )
}

export default WalletGenerator