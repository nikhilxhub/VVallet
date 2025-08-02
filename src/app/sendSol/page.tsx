"use client"
import SendSol from '@/components/SendSol'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import React from 'react'
import '@solana/wallet-adapter-react-ui/styles.css';



const SOLANA_RPC_ENDPOINT = process.env.ALCHEMY_SOLANA_DEVNET_RPC_URL || "https://api.devnet.solana.com";

const page = () => {

  return (
    <div>
        <main className="flex items-center justify-center py-15 px-4">
                        <ConnectionProvider endpoint={SOLANA_RPC_ENDPOINT}>
                            <WalletProvider wallets={[]} autoConnect>
                                <WalletModalProvider>
                                    <SendSol />
                                </WalletModalProvider>
                            </WalletProvider>
                        </ConnectionProvider>
        </main>


    </div>
  )
}

export default page