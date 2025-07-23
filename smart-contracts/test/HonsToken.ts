import { ethers, network } from "hardhat";
import { expect } from "chai";
import { Hons, Hons__factory } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("Faucet Contract", () => {
  let faucet: Hons;
  let owner: SignerWithAddress;
  let user: SignerWithAddress;
  beforeEach(async function () {
    [owner, user] = await ethers.getSigners();
    const FaucetFactory = (await ethers.getContractFactory(
      "HonsToken"
    )) as Hons__factory;
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

  // owner only functions
  describe("setMaxAmountPerUser", () => {
    it("owner could set the amount of UserMax", async () => {
      const decimals = await faucet.decimals();
      const amount = 5000n * 10n ** BigInt(decimals);
      await faucet.connect(owner).setMaxAmountPerUser(amount);

      await expect(faucet.MAX_AMOUNT_PER_USER()).to.equal(amount);
    });
    it("should revert if amount is greater than or equal to TOTAL_SUPPLY_CAP", async () => {
      const totalSupplyCap = await faucet.TOTAL_SUPPLY_CAP();
      const amount = totalSupplyCap + 1n;

      await expect(
        faucet.connect(owner).setMaxAmountPerUser(amount)
      ).to.be.revertedWith(
        "one person MAX can't be more than the total supply capital"
      );
    });
    it("should revert if non-owner tries to set the MAX amount", async () => {
      await expect(
        faucet.connect(user).setMaxAmountPerUser(9000)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });
  describe("setCooldown", () => {
    it("should set the cooldown for faucet minting", async () => {
      const cooldown = 8400;
      await faucet.connect(owner).setCooldown(cooldown);
      await expect(faucet.COOLDOWN()).to.equal(cooldown);
    });
    it("should revert if non-owner tries to set the cooldown", async () => {
      await expect(faucet.connect(user).setCooldown(9000)).to.be.revertedWith(
        "Ownable: caller is not the owner"
      );
    });
  });
  describe("setRaceCooldown", () => {
    it("should set the race cooldown", async () => {
      const cooldown = 6500;
      await faucet.connect(owner).setRaceCooldown(cooldown);

      await expect(faucet.RACE_COOLDOWN()).to.be.equal(cooldown);
    });
    it("should revert if non-owner tries to set the cooldown", async () => {
      await expect(
        faucet.connect(user).setRaceCooldown(9000)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });
  describe("pause/unpause faucet", () => {
    it("should allow the owner to pause the faucet", async () => {
      const tx = await faucet.connect(owner).pauseFaucet();
      await expect(tx).to.emit(faucet, "FaucetStatusChange").withArgs(true);

      const paused = await faucet.faucetPaused();
      expect(paused).to.be.true;
    });

    it("should allow the owner to unpause the faucet", async () => {
      await faucet.connect(owner).pauseFaucet();

      const tx = await faucet.connect(owner).unPauseFaucet();
      await expect(tx).to.emit(faucet, "FaucetStatusChange").withArgs(false);

      const paused = await faucet.faucetPaused();
      expect(paused).to.be.false;
    });

    it("should revert if non-owner tries to pause the faucet", async () => {
      await expect(faucet.connect(user).pauseFaucet()).to.be.revertedWith(
        "Ownable: caller is not the owner"
      );
    });

    it("should revert if non-owner tries to unpause the faucet", async () => {
      await expect(faucet.connect(user).unPauseFaucet()).to.be.revertedWith(
        "Ownable: caller is not the owner"
      );
    });
  });

  //read only function
  describe("getUserInfo", () => {
    it("should get the user Info", async () => {
      await faucet.connect(user).faucetMint();
      const decimals = await faucet.decimals();
      const expectedAmount = 10n * 10n ** BigInt(decimals);

      const userStruct = await faucet.connect(user).getUserInfo();

      expect(userStruct.amount).to.equal(expectedAmount);
      expect(userStruct.lastMintTime).to.gt(0);
    });
  });
});
