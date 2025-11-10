# ERC-20 PIG 🐷: A Gamified Decentralized Faucet

An innovative ERC-20 token project combining a time-based token faucet with a gamified pig racing system. This platform, built with modern Web3 and frontend technologies, allows users to claim tokens and compete for extra rewards in a fun, decentralized environment.

## ✨ Features

- **ERC-20 Faucet:** Claim `Hons` tokens based on a cooldown timer. The faucet enforces a **24-hour cooldown** between claims and a maximum token cap per user.
- **Gamified Pig Racing:** Participate in virtual pig races to earn additional token rewards.
- **Time-Based Rewards:** The pig racing feature enforces a **2-hour cooldown** between races to prevent abuse.
- **Access-Level Controls:** The underlying smart contract, `Hons`, includes `Ownable` access controls for administrative functions like pausing the faucet and setting cooldowns.
- **Frontend Interface:** An interactive and user-friendly experience built with **React** and **TypeScript**.
- **Smart Contracts:** Secure and tested logic implemented in **Solidity**.

## 💰 Tokenomics

The native token for the platform is **Hons (MRAJ)**.

| Parameter               | Value          | Details                                                                                    |
| :---------------------- | :------------- | :----------------------------------------------------------------------------------------- |
| **Token Name**          | `Hons`         | The name of the ERC-20 token.                                                              |
| **Token Symbol**        | `MRAJ`         | The symbol of the ERC-20 token.                                                            |
| **Total Supply Cap**    | 2,000,000 MRAJ | The maximum number of tokens that can ever be minted.                                      |
| **Max Tokens per User** | 20,000 MRAJ    | A hard cap on the total tokens a single user can acquire from the faucet and race rewards. |
| **Faucet Claim Amount** | 10 MRAJ        | The base amount of tokens a user can claim per faucet cooldown period.                     |
| **Race Rewards (1st)**  | 20 MRAJ        | Reward for the pig selected by the user winning first place.                               |
| **Race Rewards (2nd)**  | 10 MRAJ        | Reward for the pig selected by the user winning second place.                              |
| **Race Rewards (3rd)**  | 5 MRAJ         | Reward for the pig selected by the user winning third place.                               |

## 🛠️ Tech Stack

### Frontend

- **Framework:** React
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Redux Toolkit
- **Data Fetching:** TanStack Query
- **UI/UX:** Framer Motion for animations, [@splinetool/react-spline](https://www.google.com/search?q=https://www.npmjs.com/package/%40splinetool/react-spline) for the 3D scene.

### Smart Contracts (Solidity)

- **Blockchain:** Solidity `^0.8.28`
- **Development Environment:** Hardhat
- **Libraries:** OpenZeppelin Contracts (ERC20, Ownable, ERC20Permit)
- **Web3 Integration:** Ethers.js (v6)

## 🚀 Installation & Setup

### Prerequisites

You will need the following installed:

- [Node.js](https://nodejs.org/) (v16 or above)
- npm or yarn
- A Web3 wallet extension like [MetaMask](https://metamask.io/) for interacting with the dApp.

### 1\. Smart Contracts Setup

1.  **Navigate to the contracts directory:**

    ```bash
    cd smart-contracts
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Compile the contract:**
    The Solidity contract `HonsToken.sol` is written in version `0.8.28`.

    ```bash
    npx hardhat compile
    ```

4.  **Start a local Hardhat network:**
    This simulates a blockchain environment for development. The frontend is configured to interact with the default Hardhat network **Chain ID 31337** and a default deployed address: **`0x5FbDB2315678afecb367f032d93F642f64180aa3`**.

    ```bash
    npx hardhat node
    ```

5.  **Deploy the contract (Optional: deployment script is available for reference):**
    The provided script `deploy.ts` deploys the `Hons` token.

    ```bash
    npx hardhat run scripts/deploy.ts --network localhost
    ```

### 2\. Frontend Setup

1.  **Navigate to the frontend directory:**

    ```bash
    cd frontend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the development server:**
    The frontend will start a live-reloading server, configured using **Vite**.

    ```bash
    npm run dev
    # or
    yarn dev
    ```

The application should now be running on `http://localhost:5173` (or similar, depending on your Vite setup).

### 3\. Using the DApp

1.  **Connect Wallet:** Connect your MetaMask wallet to the local Hardhat network (Chain ID: 31337).
2.  **Claim Tokens:** Use the "Claim Token" button on the main page (`/`) to mint 10 MRAJ tokens, subject to the 24-hour cooldown.
3.  **Race Pigs:** Navigate to the Pig Race page (`/pigRace`), select a champion (e.g., King Oinksalot, Baconator, Logan Pork, Pepper lee, or Marco Porkio), and click "Start Racing" to win additional rewards, subject to the 2-hour race cooldown.

---
