import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface WalletState {
  account: string | null;
  chainId: number | null;
  connected: boolean;
}

const initialState: WalletState = {
  account: null,
  chainId: null,
  connected: false,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setWallet(state, action: PayloadAction<WalletState>) {
      const { account, chainId } = action.payload;
      state.account = account;
      state.chainId = chainId;
      state.connected = true;
    },
    disconnectWallet(state) {
      state.account = null;
      state.chainId = null;
      state.connected = false;
    },
  },
});

export const { setWallet, disconnectWallet } = walletSlice.actions;
export default walletSlice.reducer;
