"use client"
import React, { useState, useMemo, FC } from 'react';
import axios from 'axios'; 

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';


import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import NavBar from '@/components/NavBar';
import SolanaAirdropController from '@/components/AirDrop';

import '@solana/wallet-adapter-react-ui/styles.css';


const SOLANA_RPC_ENDPOINT = process.env.ALCHEMY_SOLANA_DEVNET_RPC_URL || "https://api.devnet.solana.com";


// --- UNIFIED SOLANA AIRDROP COMPONENT ---
// This component contains all the business logic for the Solana airdrop.



const page = () => {

    // const wallets = useMemo(() => [], []);
  return (

    <>
        <NavBar />
        
        <div>

           <main className="flex items-center justify-center py-20 px-4">
                <ConnectionProvider endpoint={SOLANA_RPC_ENDPOINT}>
                    <WalletProvider wallets={[]} autoConnect>
                        <WalletModalProvider>
                            <SolanaAirdropController />
                        </WalletModalProvider>
                    </WalletProvider>
                </ConnectionProvider>
            </main>
        </div>
    
    </>
  )
}

export default page