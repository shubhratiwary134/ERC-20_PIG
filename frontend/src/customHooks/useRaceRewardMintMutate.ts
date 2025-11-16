import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "../store/hook";
import { getContract } from "../utils/getContract";
import { ethers } from "ethers";

export const useRaceRewardMintMutate = () => {
  const { account } = useAppSelector((state) => state.wallet);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (position: number) => {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      if (!signer) throw new Error("Signer not available");
      const contract = getContract(signer);
      const tx = await contract.raceReward(position);
      const receipt = await tx.wait();
      return receipt;
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
