export interface Wallet {
    publicKey: string,
    privateKey : string,
    mnemonic: string,
    path: string,
}

export interface GenerateWalletArgs {
  mnemonicInput: string;
  pathTypes: string[];
  wallets: Wallet[];
  visiblePrivateKeys: boolean[];
  visiblePhrases: boolean[];
  setMnemonicWords: (words: string[]) => void;
  setWallets: (wallets: Wallet[]) => void;
  setVisiblePrivateKeys: (keys: boolean[]) => void;
  setVisiblePhrases: (phrases: boolean[]) => void;
}

export interface MnemonicDisplayProps {
  mnemonicWords: string[];
  copyToClipboard: (text: string) => void;
  showMnemonic: boolean;
  setShowMnemonic: (show: boolean) => void;
}

export interface DisplayWalletProps {
    pathTypeName : string,
    wallets :Wallet[],
    gridView:boolean,
    setGridView:(show: boolean) => void,
    visiblePrivateKeys: boolean[],
    setVisiblePrivateKeys: (show:boolean[]) => void,

    onAddWallet: () => void;
    onClearWallets: () => void;
    onDeleteWallet: (index: number) => void;
}

export interface handleAddWalletProps {
  mnemonicWords:string[],
    pathTypes:string[],
  wallets:Wallet[],
  setWallets:(wallets: Wallet[]) => void,
  visiblePrivateKeys: boolean[],
  visiblePhrases:boolean[],

  setVisiblePrivateKeys: (show: boolean[]) => void,
  setVisiblePhrases: (show: boolean[]) => void,

}
// export const Wallet;