# 🪙 Vaultory — Multi-Chain Crypto Wallet Generator  

Vaultory is a sleek, responsive crypto wallet generator built with **Next.js 15**, **TypeScript**, and **ShadCN UI**. It supports **Solana** and **Ethereum** blockchains, allowing users to generate, manage, and interact with wallets using mnemonic phrases. Designed for a decentralized future, Vaultory makes onboarding into Web3 intuitive and secure.  

---

## 🚀 Features  

- 🔐 **Mnemonic-Based Wallet Generation**  
  Generate or import a 12-word recovery phrase to create wallets for Solana or Ethereum.  

- 🧠 **Multi-Chain Support**  
  Choose between Solana (`501`) or Ethereum (`60`) derivation paths.  

- 📦 **Wallet Management**  
  Add, delete, and clear wallets with full control over the visibility of private keys and phrases.  

- 📋 **Clipboard Integration**  
  Copy public/private keys and mnemonic phrases with a single click.  

- 🌐 **Token Interactions**  
  Easily access the following routes:  
  - `/getBalance` — Fetch wallet balances  
  - `/getAirDrop` — Request devnet airdrops  
  - `/sendSol` — Send SOL tokens  
  - `/createToken` — Create custom tokens (via Pinata + Alchemy)  

- 💾 **Local Persistence**  
  Wallets and mnemonic data are stored in `localStorage` for session continuity.  

- 🎨 **Responsive UI**  
  Built with **ShadCN** and **TailwindCSS** for an elegant, cross-device experience.  

---

## 🧱 Tech Stack  

- **Framework**: Next.js 15 (App Router)  
- **Language**: TypeScript  
- **UI**: ShadCN + TailwindCSS  
- **Blockchain APIs**: Alchemy (Ethereum & Solana)  
- **Storage & Metadata**: Pinata (IPFS)  
- **Routing**: `next/navigation`  

---

## 📦 Installation  

```bash
git clone https://github.com/nikhilxhub/Vaultory.git
cd vaultory
npm install
npm run dev

---

🔧 Environment Variables

Create a .env.local file in the project root and add:

# Ethereum RPC
ALCHEMY_ETHEREUM_RPC_URL=
ALCHEMY_ETHEREUM_DEVNET_RPC_URL=

# Solana RPC
ALCHEMY_SOLANA_RPC_URL=
ALCHEMY_SOLANA_DEVNET_RPC_URL=

# Pinata API
PINATA_API_KEY=
PINATA_SECRET_KEY=
PINATA_JWT=

# Gateway
NEXT_PUBLIC_GATEWAY_URL=

---


🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.