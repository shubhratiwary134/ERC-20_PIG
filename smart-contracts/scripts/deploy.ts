import { ethers } from "hardhat";

async function main() {
  const token = await ethers.deployContract("Hons");
  await token.waitForDeployment();
  console.log("Contract deployed to:", token.target);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
