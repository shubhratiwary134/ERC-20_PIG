import { useWallet } from "../customHooks/useWallet";
import { useAppSelector } from "../store/hook";

const WalletButton = () => {
  const { connectWallet, removeWallet } = useWallet();
  const { connected } = useAppSelector((state) => state.wallet);
  return (
    <div className="text-white">
      {connected ? (
        <button onClick={removeWallet}>Disconnect Wallet</button>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};

export default WalletButton;
