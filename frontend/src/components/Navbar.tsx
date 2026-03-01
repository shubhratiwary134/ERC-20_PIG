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
    <div className="flex flex-col md:flex-row border-blue-300 text-white border-b-2 justify-between items-center p-3 md:p-5 mx-4 md:mx-10 gap-4 md:gap-0">
      <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 lg:gap-20 text-sm lg:text-base">
        <p className="flex items-center gap-1.5 whitespace-nowrap">
          <FaDollarSign className="text-base lg:text-xl" />:{" "}
          {data?.amount ?? "---"} <span className="font-bold">MRAJ</span>
        </p>

        <p className="flex items-center gap-1.5 whitespace-nowrap">
          <IoTimeOutline className="text-base lg:text-xl" /> Cooldown:{" "}
          {data?.lastMintTime ? (
            <CooldownTimer lastMintTime={data.lastMintTime} />
          ) : (
            "---"
          )}
        </p>
        <p className="flex items-center gap-1.5 whitespace-nowrap hidden sm:flex">
          Last Race: {data?.lastRoundPosition ?? "---"}
        </p>
      </div>
      <WalletButton />
    </div>
  );
};

export default Navbar;
