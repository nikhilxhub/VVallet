import { DisplayWalletProps } from '@/types/wallet'
import React from 'react'
import { Button } from './ui/button'
import { Grid2X2, List } from 'lucide-react'
import { handleAddWallet } from '@/utils/wallet'

export const DisplayWallet = ({
    pathTypeName,
    wallets,
    gridView,
    setGridView
}:DisplayWalletProps) => {
    
  return (
    <div className='flex flex-col'>

        <div className='flex md:flex-row flex-col justify-between w-full gap-4 md:items-center'>

            <h2 className='tracking-tight text-3xl md:text-4xl font-extrabold'>
                {pathTypeName} Wallet
            </h2>

            <div className='flex gap-2'>
                {wallets.length > 1 && (
                    <Button
                        variant={"ghost"}
                        onClick={() => setGridView(!gridView)}
                        className='hidden md:block'
                    >
                        { gridView ? <Grid2X2 /> : <List /> }
                    </Button>
                )}

                <Button onClick = {() => handleAddWallet()}>
                    Add Wallet
                </Button>


            </div>
        </div>


    </div>
  )
}
