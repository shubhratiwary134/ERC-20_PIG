import { useWallet } from "../customHooks/useWallet";
import { useAppSelector } from "../store/hook";

const WalletButton = () => {
  const { connectWallet, removeWallet } = useWallet();
  const { connected, account } = useAppSelector((state) => state.wallet);
  return (
    <div>
      {connected ? (
        <button onClick={removeWallet}>
          Disconnect ({account?.slice(0, 6)}...{account?.slice(-4)})
        </button>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};

export default WalletButton;
