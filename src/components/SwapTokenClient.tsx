"use client"
import { Token } from '@/types/Token'
import React, { useEffect, useMemo, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Label } from '@radix-ui/react-dropdown-menu'
import { Input } from './ui/input'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowDownUp } from 'lucide-react'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { toast } from 'sonner'
import { createJupiterApiClient, QuoteGetRequest } from '@jup-ag/api'


const jupiterApi = createJupiterApiClient();

const SwapTokenClient = ({ serverTokens }: {
  serverTokens?: Token[]
}) => {

  const { connection } = useConnection();
  const wallet = useWallet();
  const { publicKey } = wallet;

  const [tokens, setTokens] = useState<Token[]>(serverTokens ?? []);
  console.log("im here")
  console.log("fetched tokens count ", tokens?.length);

  const [ inputAmount, setInputAmount ] = useState<string>("0");
  const [ inputToken, setInputToken ] = useState<string>('So11111111111111111111111111111111111111112');
  const [ outputToken, setOutputToken ] = useState<string>('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v');
  const [ loading, setLoading ] = useState(false);

  const [ outputAmount, setOutputAmount ] = useState<string>("");
  const [ swapping, setSwapping ] = useState(false);

  const [ quote, setQuote ] = useState<any>(null);

  const [ slippageBps, setSlippageBps ]= useState<number>(50);


  useEffect(() => {
    if (tokens.length === 0) {
      (async () => {
        try {
          const res = await fetch('https://token.jup.ag/strict');
          const tokenList = await res.json();
          setTokens(tokenList);
        } catch (err) {
          console.error('Failed to fetch token list (client fallback):', err);
        }
      })();
    }
  }, [tokens.length]);


  const rpcEndpoint = (connection as any)?.rpcEndpoint ?? (connection as any)?._rpcEndpoint ?? '';
  const isDevOrTest = typeof rpcEndpoint === 'string' && (rpcEndpoint.includes('devnet') || rpcEndpoint.includes('testnet'));

  const inputTokenInfo = useMemo(() => tokens.find((t) => t.address === inputToken), [tokens, inputToken]);
  const outputTokenInfo = useMemo(() => tokens.find((t) => t.address === outputToken), [tokens, outputToken]);

  //add debounce fetch quote when input amount changing
  useEffect(() =>{

    const h = setTimeout(() =>{

      if(parseFloat(inputAmount) > 0 && inputToken && outputToken){
        getQuote();
      }else{
        setOutputAmount('');
        setQuote(null);

      }
    }, 500);

    return () => clearTimeout(h);

  },[inputAmount, inputToken, outputToken,slippageBps])


  async function getQuote() {

    if(isDevOrTest){
      setQuote(null);
      setOutputAmount('');
      console.warn("detected devnet");
      toast.error("Dev-net detected.");
      return;
    }

    if(!inputTokenInfo || !outputTokenInfo || !parseFloat(inputAmount)) return;

    setLoading(true);
    setOutputAmount('');

    try{
      const amountInSmallestUnit = new BigNumber(inputAmount).shiftedBy(inputTokenInfo.decimals).integerValue().toString();
      const quoteParams: QuoteGetRequest = {
        inputMint: inputToken,
        outputMint: outputToken,
        amount: parseInt(amountInSmallestUnit),
        slippageBps,
      };

      const newQuote = await jupiterApi.quoteGet(quoteParams);

      if(newQuote){
        const outputAmount = new BigNumber(newQuote.outAmount).shiftedBy(-outputTokenInfo.decimals).toString();
        setOutputAmount(outputAmount);
        setQuote(newQuote);
      }else{
        toast.error("No quote found for this pair.");
      }


    }catch(e){
      console.error("getQuote error:", e);
      toast.error("Error getting quote.");
    }finally{
      setLoading(false);
    }
    
  }


  const handleFlip = () =>{

    const tmpToken = inputToken;
    const tmpAmount = inputAmount;
    setInputToken(outputToken);
    setOutputToken(tmpToken);
    setInputAmount(outputAmount || '0');
    setOutputAmount(tmpAmount);
    
  };

  async function tryVersionedSwap(): Promise<boolean>{

    try{


      return true;
    }catch(e){

      console.warn("Version swap attempt failed..Your wallet doesn't support")

      return false;
    }
  }

  const handleSwap = async () =>{
    if(!publicKey){
      toast.error("Please connect your wallet.");
      return;

    }
    if(!quote){
      toast.error("No quote available.");
      return;
    }

    if(isDevOrTest){
      toast.error("Jupiter swap is not available for dev-net");
      return;
    }

    setSwapping(true);

    try{

      const succeded = await tryVersionedSwap();
      if(!succeded){
        throw new Error("Swap failed due to wallet adapter(VersionedTx)");
      }


    }catch(e){
      console.error("Swap error: ",e);
      toast.error("Swap failed.See console for details.");

    }finally{

      setSwapping(false);
      getQuote();
    }




  }


  return (

    <Card className="w-full max-w-md mx-auto">
      <CardHeader><CardTitle>Jupiter Swap</CardTitle></CardHeader>

      <CardContent className="space-y-4">
        <div>
          <Label>You Pay</Label>
          <div className='flex space-x-2'>

            <Input
              id="input-amount"
              type="number"
              value={inputAmount}
              onChange={(e) => setInputAmount(e.target.value)}
              placeholder='0.0'
              className='flex-grow'
            />
            <TokenSelector tokens={tokens} selectedToken={inputToken} onSelectToken={setInputToken} />

          </div>
        </div>

        <div>
          <Button variant='ghost' size="icon" onClick={handleFlip}><ArrowDownUp  className='h-4 w-4' /></Button>
        </div>

        <div>
          <Label>You Receive</Label>
          <div className='flex space-x-2'>
            <Input id = "output-amount" type= "text" value={loading ? 'Loading...' : outputAmount} readOnly placeholder='0.0' 
              className='flex-grow'
            />
            <TokenSelector tokens={tokens} selectedToken={outputToken} onSelectToken={setOutputToken} />
          </div>
        </div>

        <Button 
        
          onClick={handleSwap}
          disabled={!publicKey || swapping|| loading|| !quote || parseFloat(outputAmount || '0' ) <= 0}

        >

          { publicKey ? (swapping ? "Swapping..." : "Swap"): "Connect Wallet"}
        </Button>

      </CardContent>
    </Card>
  )
}

function TokenSelector({
  tokens,
  selectedToken,
  onSelectToken,
}: {
  tokens: Token[];
  selectedToken: string;
  onSelectToken: (addr: string) => void;

}) {

  const selected = tokens.find((t) => t.address == selectedToken);

  const TokenChip = (t: Token | undefined) => (
    <div className="flex items-center space-x-2">
      <Avatar className="h-6 w-6">
        {/* Guard logoURI to avoid empty src warnings */}
        <AvatarImage src={t?.logoURI || undefined} alt={t?.name || 'token'} />
        <AvatarFallback>{(t?.symbol || '?').slice(0,3).toUpperCase()}</AvatarFallback>
      </Avatar>
      <span>{t?.symbol || 'Token'}</span>
    </div>
  );
  return (

    <>
      <Select value={selectedToken} onValueChange={onSelectToken}>
        <SelectTrigger className='w-[150px]'>
          <SelectValue placeholder="Select Token">
            {selected ? (
              TokenChip(selected)
            ) : 'Select Token'}

          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {tokens.map((t) => (

            <SelectItem key={t.address} value={t.address}>
              <div className='flex items-center space-x-2'>
              <Avatar className="h-6 w-6">
                <AvatarImage src={t.logoURI || undefined} alt={t.name} />
                <AvatarFallback>{t.symbol.slice(0,3).toUpperCase()}</AvatarFallback>
              </Avatar>

              </div>

            </SelectItem>
          ))}
        </SelectContent>




      </Select>

    </>
  )


}

export default SwapTokenClient