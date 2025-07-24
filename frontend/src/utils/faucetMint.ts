import { getContract } from "./getContract";

export async function faucetMint(signer) {
  const contract = getContract(signer);
  const tx = await contract.faucetMint();
  const receipt = await tx.wait();
  return receipt;
}
