import { ethers } from "ethers";
import { useAppDispatch } from "../store/hook";
import { disconnectWallet, setWallet } from "../store/slices/wallet";

export function useWallet() {
  const dispatch = useAppDispatch();
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask not found. Please install it!");
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const account = await signer.getAddress();
      const network = await provider.getNetwork();
      const chainId = Number(network.chainId);
      dispatch(setWallet({ account, chainId, connected: true }));
    } catch (error) {
      console.error("Error connecting to wallet:", error);
      alert("Failed to connect wallet. Please try again.");
    }
  };
  const removeWallet = () => {
    dispatch(disconnectWallet());
    alert("Wallet disconnected successfully.");
  };
  return { connectWallet, removeWallet };
}
