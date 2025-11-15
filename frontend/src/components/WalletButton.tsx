import { IoPersonSharp } from "react-icons/io5";
import { useWallet } from "../customHooks/useWallet";
import { useAppSelector } from "../store/hook";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";

const WalletButton = () => {
  const { connectWallet, removeWallet } = useWallet();
  const { connected, account } = useAppSelector((state) => state.wallet);
  return (
    <div className="text-white cursor-pointer flex items-center">
      {connected ? (
        <button onClick={removeWallet} className="flex items-center gap-4">
          {account?.split("").slice(0, 6).join("") +
            "..." +
            account?.split("").slice(-4).join("")}
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
