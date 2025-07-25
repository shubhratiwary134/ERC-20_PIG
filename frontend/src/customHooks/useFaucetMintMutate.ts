import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "../store/hook";
import { faucetMint } from "../utils/faucetMint";

export const useFaucetMintMutate = () => {
  const { signer, account } = useAppSelector((state) => state.wallet);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!signer) throw new Error("Signer not available");
      return await faucetMint(signer);
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ["faucetUser", account],
      });
    },
    onError: (error) => {
      console.error("Faucet mint failed:", error);
    },
  });
};
