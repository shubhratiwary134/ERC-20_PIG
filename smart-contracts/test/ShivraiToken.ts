import { ethers, network } from "hardhat";
import { expect } from "chai";
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
      await network.provider.send("evm_increaseTime", [86400 + 1]);
      await network.provider.send("evm_mine");
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

      const decimals = await faucet.decimals();
      const expectedAmount = 10n * 10n ** BigInt(decimals);

      expect(userStruct.amount).to.equal(expectedAmount);
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

      await expect(faucet.connect(user).faucetMint()).to.be.revertedWith(
        "invalid condition can't mint 0 tokens, No tokens left"
      );
    });
    it("should revert if the amount exceeds TOTAL_SUPPLY_CAP", async () => {
      const totalSupplyCap = await faucet.TOTAL_SUPPLY_CAP();
      const decimals = await faucet.decimals();
      const mintAmount = 10n * 10n ** BigInt(decimals);

      await faucet.__test_mint(user.address, totalSupplyCap - mintAmount);

      await expect(faucet.connect(user).faucetMint()).to.be.revertedWith(
        "Over the Limit of total supply cap"
      );
    });
    it("should revert if the cooldown is not completed", async () => {
      await faucet.connect(user).faucetMint();

      await expect(faucet.connect(user).faucetMint()).to.be.revertedWith(
        "You can't mine any tokens for now"
      );
    });
  });
  describe("raceReward", () => {
    const RacePosition = { first: 0, second: 1, third: 2 };
    it("should reward the user accordingly", async () => {
      await network.provider.send("evm_increaseTime", [7200 + 1]);
      await network.provider.send("evm_mine");
      const tx = await faucet.connect(user).raceReward(RacePosition.third);
      const receipt = await tx.wait();
      if (!receipt) {
        throw new Error("Transaction receipt is null");
      }
      const block = await ethers.provider.getBlock(receipt.blockNumber);
      if (!block) {
        throw new Error("Block not found");
      }
      const timeStamp = block.timestamp;

      const userStruct = await faucet.userMapping(user.address);

      const decimals = await faucet.decimals();
      const expectedAmount = 5n * 10n ** BigInt(decimals);

      expect(userStruct.amount).to.equal(expectedAmount);
      expect(userStruct.lastRaceTime).to.equal(timeStamp);
      expect(userStruct.lastRoundPosition).to.equal(RacePosition.third);
    });
    it("should revert if the faucet is paused", async () => {
      await faucet.connect(owner).pauseFaucet();

      await expect(
        faucet.connect(user).raceReward(RacePosition.third)
      ).to.be.revertedWith("The faucet is currently paused.");
    });
    it("should revert if the amount exceeds TOTAL_SUPPLY_CAP", async () => {
      const totalSupplyCap = await faucet.TOTAL_SUPPLY_CAP();
      const decimals = await faucet.decimals();
      const mintAmount = 5n * 10n ** BigInt(decimals);

      await faucet.__test_mint(user.address, totalSupplyCap - mintAmount);

      await expect(
        faucet.connect(user).raceReward(RacePosition.third)
      ).to.be.revertedWith("Over the Limit of total supply cap");
    });
    it("should revert if the amount cap of user has exceeded", async () => {
      const maxAmountPerUser = await faucet.MAX_AMOUNT_PER_USER();
      await faucet
        .connect(owner)
        .__test_setUserAmount(user.address, maxAmountPerUser);

      await expect(
        faucet.connect(user).raceReward(RacePosition.third)
      ).to.be.revertedWith("Limit for the user max amount exceeded");
    });
    it("should revert if the cooldown is not completed", async () => {
      await faucet.connect(user).raceReward(2);

      await expect(
        faucet.connect(user).raceReward(RacePosition.third)
      ).to.be.revertedWith("You can't mine any tokens for now");
    });
  });
  describe("burnToken", () => {
    it("should burn token as much user wants", async () => {
      await faucet.connect(user).faucetMint();
      const decimals = await faucet.decimals();
      const amount = 5n * 10n ** BigInt(decimals);

      await faucet.connect(user).burnToken(amount);

      const userStruct = await faucet.userMapping(user.address);

      const expectedAmount = 10n * 10n ** BigInt(decimals) - amount;
      expect(userStruct.amount).to.equal(expectedAmount);
    });
    it("should revert if the amount of token sent to burn is more than the tokens user currently has", async () => {
      const decimals = await faucet.decimals();
      const amount = 10n * 10n ** BigInt(decimals);

      await expect(faucet.connect(user).burnToken(amount)).to.be.revertedWith(
        "Not enough tokens to burn"
      );
    });
  });
});
