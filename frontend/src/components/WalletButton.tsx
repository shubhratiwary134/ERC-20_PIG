import { IoPersonSharp } from "react-icons/io5";
import { useWallet } from "../customHooks/useWallet";
import { useAppSelector } from "../store/hook";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";

const WalletButton = () => {
  const { connectWallet, removeWallet } = useWallet();
  const { connected } = useAppSelector((state) => state.wallet);
  return (
    <div className="text-white cursor-pointer">
      {connected ? (
        <button onClick={removeWallet}>
          <IoPersonSharp size={32} />
        </button>
      ) : (
        <button onClick={connectWallet}>
          <MdOutlineAccountBalanceWallet size={32} />
        </button>
      )}
    </div>
  );
};

export default WalletButton;
