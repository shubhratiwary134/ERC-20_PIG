import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "../store/hook";
import { faucetMint } from "../utils/faucetMint";
import { ethers } from "ethers";

export const useFaucetMintMutate = () => {
  const { account } = useAppSelector((state) => state.wallet);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      if (!signer) throw new Error("Signer not available");
      return await faucetMint(signer);
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ["userInfo", account],
      });
    },
    onError: (error) => {
      console.error("Faucet mint failed:", error);
    },
  });
};
