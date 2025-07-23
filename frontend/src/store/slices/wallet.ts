import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ethers } from "ethers";

interface WalletState {
  account: string | null;
  provider: ethers.BrowserProvider | null;
  signer: ethers.Signer | null;
  chainId: number | null;
  connected: boolean;
}

const initialState: WalletState = {
  account: null,
  provider: null,
  signer: null,
  chainId: null,
  connected: false,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setWallet(state, action: PayloadAction<WalletState>) {
      const { account, provider, signer, chainId } = action.payload;
      state.account = account;
      state.provider = provider;
      state.signer = signer;
      state.chainId = chainId;
      state.connected = true;
    },
    disconnectWallet(state) {
      state.account = null;
      state.provider = null;
      state.signer = null;
      state.chainId = null;
      state.connected = false;
    },
  },
});

export const { setWallet, disconnectWallet } = walletSlice.actions;
export default walletSlice.reducer;
