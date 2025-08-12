import { Token } from '@/types/Token';
import React from 'react'
import SwapTokenClient from './SwapTokenClient';

const SwapTokenServer = async() => {

  let tokens: Token[] = [];

  try{
    const res = await fetch("https://token.jup.ag/strict",{
        next:{
            revalidate: 60
        }
    });

    tokens = await res.json();

  }catch(e){
    console.error("failed to fetch token list on server:", e);

  }

  return (
    <SwapTokenClient serverTokens={tokens} />
    
  )
}

export default SwapTokenServer