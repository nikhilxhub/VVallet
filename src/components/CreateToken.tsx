import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { PublicKey } from '@solana/web3.js'
import { useWallet } from '@solana/wallet-adapter-react'
import { Input } from './ui/input'
import { Button } from './ui/button'

const CreateToken = () => {

    const [ feedback, setFeedback ] = useState("");
    const { publicKey } = useWallet();

    const [ tokenName, setTokenName ] = useState("");
    const [ isLoading, sestIsLoading ] = useState(false);
    const [ tokenSymbol, setTokenSymbol ] = useState("");
    const [ tokenImage, setTokenImage ] = useState("");
    const [ tokenSupply, setTokenSupply ] = useState("");




    const createToken = ()=>{


    }





  return (
            <>
        
        <Card className="w-full max-w-md bg-zinc-900 border-zinc-700 text-white">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Create Token</CardTitle>
                <CardDescription className="text-zinc-400">
                    Connect your wallet.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center space-y-6 p-6">
                <div className="center">
                    <WalletMultiButton style={{ backgroundColor: '#9945FF', width: '100%', borderRadius: '0.5rem' }} />
                </div>
                
                {PublicKey && (
                    <div className="w-full space-y-4 pt-4 text-center">
                         <p className="text-xs text-zinc-300 break-all bg-zinc-800 p-2 rounded-md">
                            Your Address: {publicKey?.toBase58()}
                        </p>

                        <Input type='text'
                                value = {tokenName}
                                onChange={(e) => setTokenName(e.target.value)}
                                placeholder='Enter Token Name'
                                disabled={isLoading}
                                
                            />
                        <Input type='text'
                                value = {tokenSymbol}
                                onChange={(e) => setTokenSymbol(e.target.value)}
                                placeholder='Enter Token Symbol'
                                disabled={isLoading}
                                
                            />
                        <Input type='text'
                                value = {tokenImage}
                                onChange={(e) => setTokenImage(e.target.value)}
                                placeholder='https://catWithHat.png'
                                disabled={isLoading}
                                
                            />
                        <Input type='number'
                                value = {tokenSupply}
                                onChange={(e) => setTokenSupply(e.target.value)}
                                placeholder='100'
                                disabled={isLoading}
                                
                            />

                        <Button
                            onClick={(createToken)}
                            disabled={ isLoading || !tokenName|| !tokenSymbol || !tokenSupply }
                            className="w-full"
                        >
                            {isLoading ? "creating..." : "Create Token"}
                        </Button>
                        
                    </div>
                )}

                {feedback && <p className="text-sm text-zinc-400 pt-4 text-center break-all">{feedback}</p>}
                
            </CardContent>
        </Card>

        </>
  )
}

export default CreateToken