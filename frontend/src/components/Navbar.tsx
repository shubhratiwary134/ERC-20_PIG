import { useQuery } from "@tanstack/react-query";
import WalletButton from "./WalletButton";
import { getContract } from "../utils/getContract";
import { useAppSelector } from "../store/hook";
import { IoTimeOutline } from "react-icons/io5";
import { FaDollarSign } from "react-icons/fa";

const Navbar: React.FC = () => {
  const { account, provider } = useAppSelector((state) => state.wallet);
  const { data } = useQuery({
    queryKey: ["userInfo", account],
    queryFn: async () => {
      if (!provider) throw new Error("provide not available");
      const contract = getContract(provider);
      const raw = await contract.getUserInfo(account);
      return {
        amount: raw.amount.toString(),
        lastMintTime: raw.lastMintTime.toNumber(),
      };
    },
    enabled: Boolean(account && provider),
  });
  return (
    <div className="flex border-blue-300 text-white border-b-2 justify-between p-5 mx-10">
      <div className="flex items-center gap-5 lg:gap-20">
        <p className="flex items-center gap-2 ">
          <FaDollarSign className="text-base lg:text-2xl" />:{" "}
          {data?.amount ?? "---"}
        </p>

        <p className="flex items-center gap-2">
          <IoTimeOutline className="text-base lg:text-2xl" />:{" "}
          {data?.lastMintTime ?? "---"}
        </p>
      </div>
      <WalletButton />
    </div>
  );
};

export default Navbar;
