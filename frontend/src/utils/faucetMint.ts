import type { ethers } from "ethers";
import { getContract } from "./getContract";

export async function faucetMint(signer: ethers.Signer) {
  const contract = getContract(signer);
  const tx = await contract.faucetMint();
  const receipt = await tx.wait();
  return receipt;
}
