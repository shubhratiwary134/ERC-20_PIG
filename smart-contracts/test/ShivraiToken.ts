import { ethers } from "hardhat";
import { expect } from "chai";
import { ShivraiToken, ShivraiToken__factory } from "../typechain-types";

describe("Faucet Contract", () => {
  let faucet: ShivraiToken;
  let owner: any;
  let user: any;
  beforeEach(async function () {
    [owner, user] = await ethers.getSigners();
    const FaucetFactory = (await ethers.getContractFactory(
      "ShivraiToken"
    )) as ShivraiToken__factory;
    faucet = await FaucetFactory.deploy();
  });
  describe("faucetMint", () => {
    it("should mint tokens", async () => {
      const tx = await faucet.connect(user).faucetMint();
      const receipt = await tx.wait();
      if (!receipt) {
        throw new Error("Transaction receipt is null");
      }
      const block = await ethers.provider.getBlock(receipt.blockNumber);
      if (!block) {
        throw new Error("Block not found");
      }
      const expectedTimestamp = block.timestamp;

      const userStruct = await faucet.userMapping(user.address);

      expect(userStruct.amount).to.equal(10);
      expect(userStruct.lastMintTime).to.equal(expectedTimestamp);
    });

    it("should revert if the faucet is paused", () => {});
  });
});
