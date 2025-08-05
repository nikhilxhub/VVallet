import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Keypair, PublicKey } from '@solana/web3.js'
import { useWallet } from '@solana/wallet-adapter-react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { toast } from 'sonner'

import { createAssociatedTokenAccountInstruction, createInitializeMetadataPointerInstruction, createInitializeMintInstruction, createMintToInstruction, ExtensionType, getAssociatedTokenAddressSync, getMintLen, LENGTH_SIZE, TOKEN_2022_PROGRAM_ID, TYPE_SIZE } from "@solana/spl-token"
import { createInitializeInstruction, pack } from "@solana/spl-token-metadata"



const CreateToken = () => {

    const [ feedback, setFeedback ] = useState("");
    const { publicKey,wallet } = useWallet();

    const [ tokenName, setTokenName ] = useState("");
    const [ isLoading, sestIsLoading ] = useState(false);
    const [ tokenSymbol, setTokenSymbol ] = useState("");
    const [ tokenImage, setTokenImage ] = useState("");
    const [ tokenSupply, setTokenSupply ] = useState("");


    //need to upload metadata to pinata..
    const uploadMetaData = async () =>{



        // should upload via pinata
    }

    const createToken = ()=>{
        if(!publicKey){
            return toast.warning("Wallet not connected");
        }

        sestIsLoading(true);
        try{
            const mintKeyPair = Keypair.generate();

            let metadataUri = await uploadMetaData();

            if(!metadataUri){
                return toast.warning("Failed to upload metadata.");
            }

            const metadata = {
                mint: mintKeyPair.publicKey,
                name: tokenName,
                symbol: tokenSymbol,
                uri: metadataUri,
                additionalMetadata: [],
            };

            const mintLen = getMintLen([ExtensionType.MetadataPointer]);
            const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;


        }


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