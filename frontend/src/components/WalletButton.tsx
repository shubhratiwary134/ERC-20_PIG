import { useWallet } from "../customHooks/useWallet";

const WalletButton = () => {
  const { connectWallet } = useWallet();
  return (
    <div>
      <button onClick={connectWallet}>Connect Wallet</button>
    </div>
  );
};

export default WalletButton;
