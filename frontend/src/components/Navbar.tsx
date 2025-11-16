import { useQuery } from "@tanstack/react-query";
import WalletButton from "./WalletButton";
import { getContract } from "../utils/getContract";
import { useAppSelector } from "../store/hook";
import { IoTimeOutline } from "react-icons/io5";
import { FaDollarSign } from "react-icons/fa";
import { ethers } from "ethers";
import CooldownTimer from "./CooldownTimer";

const Navbar: React.FC = () => {
  const { account } = useAppSelector((state) => state.wallet);
  const { data } = useQuery({
    queryKey: ["userInfo", account],
    queryFn: async () => {
      const provider = new ethers.BrowserProvider(window.ethereum);
      if (!provider) throw new Error("provider not available");
      const contract = getContract(provider);
      const raw = await contract.userMapping(account);
      const formattedAmount = ethers.formatUnits(raw[0], 18);

      return {
        amount: formattedAmount.toString(),
        lastMintTime: Number(raw[1]),
        lastRoundPosition: Number(raw[2]),
      };
    },
    enabled: Boolean(account),
  });
  return (
    <div className="flex border-blue-300 text-white border-b-2 justify-between p-5 mx-10">
      <div className="flex items-center gap-5 lg:gap-20">
        <p className="flex items-center gap-2 ">
          <FaDollarSign className="text-base lg:text-2xl" />:{" "}
          {data?.amount ?? "---"} <span className="font-bold">MRAJ</span>
        </p>

        <p className="flex items-center gap-2">
          <IoTimeOutline className="text-base lg:text-2xl" /> Cooldown:{" "}
          {data?.lastMintTime ? (
            <CooldownTimer lastMintTime={data.lastMintTime} />
          ) : (
            "---"
          )}
        </p>
        <p className="flex items-center gap-2">
          Last Race Position: {data?.lastRoundPosition ?? "---"}
        </p>
      </div>
      <WalletButton />
    </div>
  );
};

export default Navbar;
