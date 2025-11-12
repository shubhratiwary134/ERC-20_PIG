import { ethers } from 'ethers';
import { FAUCET_CONTRACT_ADDRESS } from '../config/configContract';
import abi from '../abi/Faucet.json';

export function getContract(signerOrProvider: ethers.Signer | ethers.Provider) {
  // function to return the instance of the contract with signer or provider passed .
  const contract = new ethers.Contract(
    FAUCET_CONTRACT_ADDRESS,
    abi,
    signerOrProvider
  );
  return contract;
}
