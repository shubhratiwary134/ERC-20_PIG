/// <reference types="vite/client" />

import { EthereumProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}
