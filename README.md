ERC-20 PIG 🐷

An ERC-20 faucet with time-based and access-level controls, featuring a gamified pig racing system to earn rewards. Built with React, TypeScript, and Solidity.

GitHub Repository: ERC-20_PIG
Features

    ERC-20 Faucet: Claim tokens based on time-based eligibility.

    Access-Level Controls: Different user roles with custom permissions.

    Gamified Pig Racing: Users can participate in pig races to earn rewards in tokens.

    Frontend with React + TypeScript: Interactive and user-friendly experience.

    Smart Contracts in Solidity: Secure implementation of faucet and racing logic.

Tech Stack

    Frontend: React, TypeScript, CSS

    Blockchain: Solidity, Hardhat

    Other Tools: Ethers.js, Web3 integration

Installation & Setup
Prerequisites

    Node.js (v16 or above)

    npm or yarn

    MetaMask or another Web3 wallet

    Hardhat environment installed globally

Steps

    Clone the repository

bash
git clone https://github.com/shubhratiwary134/ERC-20_PIG.git
cd ERC-20_PIG

Install dependencies

bash
npm install

or

bash
yarn install

Compile the smart contracts

bash
npx hardhat compile

Run local blockchain (Hardhat)

bash
npx hardhat node

Deploy contracts

bash
npx hardhat run scripts/deploy.ts --network localhost

Start the frontend

    bash
    npm start

Usage

    Claim Faucet Tokens: Eligible users can claim ERC-20 tokens periodically.

    Pig Racing Game: Spend tokens to race pigs and win additional tokens.

    Different Access Levels: Admins, privileged users, and public participants.

Project Structure

text
ERC-20_PIG/
│── contracts/        # Solidity smart contracts
│── scripts/          # Deployment and utility scripts
│── src/              # React + TypeScript frontend
│── test/             # Smart contract tests
│── hardhat.config.ts # Hardhat configuration
│── package.json      # Project dependencies

