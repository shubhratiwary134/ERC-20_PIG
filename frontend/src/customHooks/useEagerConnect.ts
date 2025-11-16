import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { ethers } from "ethers";
import { setWallet } from "../store/slices/wallet";

export const useEagerConnect = () => {
  const dispatch = useAppDispatch();
  const { connected } = useAppSelector((state) => state.wallet);

  const [tried, setTried] = useState(false);

  useEffect(() => {
    if (tried || connected) {
      return;
    }

    const connectEager = async () => {
      if (!window.ethereum) {
        setTried(true);
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
        console.error("Error during eager connect:", error);
      } finally {
        setTried(true);
      }
    };

    connectEager();
  }, [tried, connected, dispatch]);
};
