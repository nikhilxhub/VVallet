// File: src/app/api/getBalance/route.ts

import { NextResponse } from 'next/server';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

// Define the structure of the incoming request body
interface BalanceRequest {
  address: string;
  chain: 'eth' | 'sol';
}

export async function POST(request: Request) {
  try {

    const { address, chain }: BalanceRequest = await request.json();
    
    if (!address || !chain) {
      return NextResponse.json({ error: 'Address and chain are required' }, { status: 400 });
    }
    
    let rpcUrl: string | undefined;
    let payload;
    
    // Configure the request based on the selected chain
    if (chain === 'eth') {
      rpcUrl = process.env.ALCHEMY_ETHEREUM_RPC_URL;
      payload = {
        id: 1,
        jsonrpc: '2.0',
        method: 'eth_getBalance',
        params: [address, 'latest'], 
      };
    } else if (chain === 'sol') {
      rpcUrl = process.env.ALCHEMY_SOLANA_RPC_URL;
      payload = {
        id: 1,
        jsonrpc: '2.0',
        method: 'getBalance',
        params: [address],
      };
    } else {
      return NextResponse.json({ error: 'Unsupported chain' }, { status: 400 });
    }
    
    if (!rpcUrl) {
      console.error('RPC URL is not configured for the selected chain:', chain);
      return NextResponse.json({ error: 'Server configuration error: RPC URL is missing.' }, { status: 500 });
    }

    // Make the secure, server-to-server request to Alchemy
    const alchemyResponse = await fetch(rpcUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!alchemyResponse.ok) {
      const errorBody = await alchemyResponse.text();
      console.error("Alchemy request failed:", errorBody);
      return NextResponse.json({ error: 'Failed to fetch balance from the node. The address may be invalid.' }, { status: 500 });
    }

    const data = await alchemyResponse.json();

    if (data.error) {
        return NextResponse.json({ error: `Node error: ${data.error.message}` }, { status: 400 });
    }

    // --- ROBUST ERROR CHECKING ADDED HERE ---
    if (data.result == null) {
        return NextResponse.json({ error: 'Invalid address or no balance found.' }, { status: 404 });
    }

    // Process the raw balance into a human-readable format
    let balance: number;
    if (chain === 'eth') {
      const balanceInWei = parseInt(data.result, 16);
      if (isNaN(balanceInWei)) {
          return NextResponse.json({ error: 'Received an invalid balance format from Ethereum node.' }, { status: 500 });
      }
      balance = balanceInWei / 1e18;
    } else { // Solana
      // Check if the 'value' property exists and is a number
      if (typeof data.result.value !== 'number') {
        return NextResponse.json({ error: 'Invalid address or no balance found for this Solana account.' }, { status: 404 });
      }
      const balanceInLamports = data.result.value;
      balance = balanceInLamports / LAMPORTS_PER_SOL;
    }

    // Send the final, processed balance back to the client
    return NextResponse.json({ balance });

  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}
