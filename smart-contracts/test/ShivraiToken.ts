import { ethers, network } from "hardhat";
import { expect, use } from "chai";
import { ShivraiToken, ShivraiToken__factory } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("Faucet Contract", () => {
  let faucet: ShivraiToken;
  let owner: SignerWithAddress;
  let user: SignerWithAddress;
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

    it("should revert if the faucet is paused", async () => {
      await faucet.connect(owner).pauseFaucet();

      await expect(faucet.connect(user).faucetMint()).to.be.revertedWith(
        "The faucet is currently paused."
      );
    });
    it("should revert if the amount is less than or equal to zero", async () => {
      const maxAmountPerUser = await faucet.MAX_AMOUNT_PER_USER();
      await faucet
        .connect(owner)
        .__test_setUserAmount(user.address, maxAmountPerUser);

      const cooldown = await faucet.COOLDOWN();
      await network.provider.send("evm_increaseTime", [Number(cooldown) + 1]);
      await network.provider.send("evm_mine");

      await expect(faucet.connect(user).faucetMint()).to.be.revertedWith(
        "invalid condition can't mint 0 tokens, No tokens left"
      );
    });
  });
});
