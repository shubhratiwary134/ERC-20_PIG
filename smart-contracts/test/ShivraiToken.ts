import { ethers } from "hardhat";
import { expect } from "chai";
describe("ShivraiToken", () => {
  let faucet, owner, user;
  beforeEach(async function () {
    [owner, user] = await ethers.getSigners();
    const Faucet = await ethers.getContractFactory("ShivraiToken");
    faucet = await Faucet.deploy();
    await faucet.deployed();
  });
});
