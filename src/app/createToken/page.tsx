"use client"
import React, { useState } from 'react';

// Your functional component imports
import CreateToken from '@/components/CreateToken';
import MintMore from '@/components/MintMore';
import SendToken from '@/components/SendToken';

// 1. Import Shadcn/ui components that we just added
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

// Solana Wallet Adapter imports
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';

// Define the type for our active component keys
type ActiveComponent = 'create' | 'mint' | 'send';

const SOLANA_RPC_ENDPOINT = process.env.NEXT_PUBLIC_ALCHEMY_SOLANA_DEVNET_RPC_URL || "https://api.devnet.solana.com";

// A map to hold titles for our cards, making the UI more dynamic
const componentInfo: Record<ActiveComponent, { title: string }> = {
  create: {
    title: "Create a New SPL Token"
  },
  mint: {
    title: "Mint Additional Tokens"
  },
  send: {
    title: "Send Your Tokens"
  }
};


const Page = () => {
  // 2. State management remains the same.
  const [activeComponent, setActiveComponent] = useState<ActiveComponent>('create');

  return (
    <div>
      <div className='flex flex-col'>
        <div className='flex flex-col gap-2 py-4 px-4 sm:px-10 md:px-20'>
          <h1 className='text-4xl tracking-tighter font-[900]'>Token Management</h1>
          <p className='text-primary/80 font-semibold'>Via Vaultory On Solana Blockchain</p>
        </div>

        <main className="flex flex-col items-center justify-center py-10 px-4 gap-8">
          
         
          <ToggleGroup
            type="single"
            value={activeComponent}
            onValueChange={(value: ActiveComponent) => {
              // allows de-selecting, so we check if a value exists before setting state.
              if (value) {
                setActiveComponent(value);
              }
            }}
            className="border rounded-lg"
          >
            <ToggleGroupItem value="create" aria-label="Toggle create">
              Create Token
            </ToggleGroupItem>
            <ToggleGroupItem value="mint" aria-label="Toggle mint">
              Mint More
            </ToggleGroupItem>
            <ToggleGroupItem value="send" aria-label="Toggle send">
              Send Token
            </ToggleGroupItem>
          </ToggleGroup>

          {/* Wallet and Connection Providers */}
          <ConnectionProvider endpoint={SOLANA_RPC_ENDPOINT}>
            <WalletProvider wallets={[]} autoConnect>
              <WalletModalProvider>
                <WalletMultiButton style={{ backgroundColor: '#9945FF', width: '100%', borderRadius: '0.5rem' }} />
                
                
                {/* 4. Wrapped the dynamic content in a Shadcn/ui Card */}
                {/* <Card className="w-full max-w-lg shadow-lg">
                  <CardHeader>
                   
                    <CardTitle>{componentInfo[activeComponent].title}</CardTitle>
                  </CardHeader>
                  <CardContent> */}
                    {/* 5. Conditional Rendering logic is now inside CardContent */}
                    {activeComponent === 'create' && <CreateToken />}
                    {activeComponent === 'mint' && <MintMore />}
                    {activeComponent === 'send' && <SendToken />}
                  {/* </CardContent>
                </Card> */}

              </WalletModalProvider>
            </WalletProvider>
          </ConnectionProvider>
        </main>
      </div>
    </div>
  );
}

export default Page;