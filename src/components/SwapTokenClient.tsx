import { Token } from '@/types/Token'
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Label } from '@radix-ui/react-dropdown-menu'
import { Input } from './ui/input'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Select, SelectContent, SelectTrigger, SelectValue } from '@radix-ui/react-select'
import { SelectItem } from './ui/select'

const SwapTokenClient = ({ serverTokens } : { 
    serverTokens?: Token[]
}) => {

  const { connection } = useConnection();
  const wallet = useWallet();

  const [ tokens, setTokens ] = useState<Token[]>(serverTokens ?? []);

  const [ inputAmount, setInputAmount ] = useState<string>("0");
  const [ inputToken, setInputToken ] = useState<string>('So11111111111111111111111111111111111111112');
  const [ outputToken, setOutputToken ] = useState<string>('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v');




  return (
    
    <Card>
        <CardHeader><CardTitle>Jupiter Swap</CardTitle></CardHeader>

        <CardContent>
          <div>
            <Label>You Pay</Label>
            <div>

          <Input 
            id =  "input-amount"
            type = "number"
            value = {inputAmount}
            onChange={(e) => setInputAmount(e.target.value)}
            placeholder='0.0'
            className='flex-grow'
            />
            <TokenSelector tokens = {tokens} selectedToken={inputToken} onSelectToken={setInputToken} />

            </div>
            </div>
            
        </CardContent>
    </Card>
  )
}

function TokenSelector({
  tokens,
  selectedToken,
  onSelectToken,
}:{
  tokens: Token[];
  selectedToken: string;
  onSelectToken : (addr: string) => void;

}){

  const selected = tokens.find((t) => t.address == selectedToken);

  return (

    <>
    <Select value={selectedToken} onValueChange={onSelectToken}>
      <SelectTrigger>
        <SelectValue placeholder= "Select Token">
          {selected ? (
            <div>
              <img src ={selected.logoURI} alt = {selected.name} className='w-6 h-6 rounder-full' loading='lazy' />
              <span>{selected.symbol}</span>
            </div>
          ): 'Select Token'}

        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {tokens.map((t) =>(

          <SelectItem key = {t.address} value= {t.address}>
            <div className='flex items-center space-x-2'>
              <img src ={t.logoURI} alt = {t.name} className='w-6 h-6 rounder-full' loading='lazy' />
              <span>{t.symbol}</span>

            </div>

          </SelectItem>
        ))}
      </SelectContent>




    </Select>
    
    </>
  )


}

export default SwapTokenClient