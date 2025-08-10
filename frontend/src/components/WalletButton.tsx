import { IoPersonSharp } from "react-icons/io5";
import { useWallet } from "../customHooks/useWallet";
import { useAppSelector } from "../store/hook";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";

const WalletButton = () => {
  const { connectWallet, removeWallet } = useWallet();
  const { connected } = useAppSelector((state) => state.wallet);
  return (
    <div className="text-white cursor-pointer flex items-center">
      {connected ? (
        <button onClick={removeWallet}>
          <IoPersonSharp className="text-base " />
        </button>
      ) : (
        <button onClick={connectWallet}>
          <MdOutlineAccountBalanceWallet className="text-lg lg:text-2xl" />
        </button>
      )}
    </div>
  );
};

export default WalletButton;
