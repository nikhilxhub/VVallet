"use client"
import CreateToken from '@/components/CreateToken'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import React from 'react'
import '@solana/wallet-adapter-react-ui/styles.css';
import MintMore from '@/components/MintMore'



const SOLANA_RPC_ENDPOINT = process.env.ALCHEMY_SOLANA_DEVNET_RPC_URL || "https://api.devnet.solana.com";

console.log(SOLANA_RPC_ENDPOINT);

const page = () => {

  return (
    <div>

      <div className='flex flex-col'>

        <div className='flex flex-col gap-2 py-4 px-4 sm:px-10 md:px-20'>
          <h1 className='text-4xl tracking-tighter font-[900]'>Create Your First Token with a click</h1>
          <p className='text-primary/80 font-semibold'>Via Vaultory On Solana BlockCHain</p>
        </div>
        <main className="flex items-center justify-center py-15 px-4">
          <ConnectionProvider endpoint={SOLANA_RPC_ENDPOINT}>
            <WalletProvider wallets={[]} autoConnect>
              <WalletModalProvider>
                <CreateToken />
                {/* <MintMore /> */}
              </WalletModalProvider>
            </WalletProvider>
          </ConnectionProvider>
        </main>
      </div>

    </div>
  )
}

export default page