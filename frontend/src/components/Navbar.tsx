import { useQuery } from "@tanstack/react-query";
import WalletButton from "./WalletButton";
import { getContract } from "../utils/getContract";
import { useAppSelector } from "../store/hook";

const Navbar = () => {
  const { account, provider } = useAppSelector((state) => state.wallet);
  const { data, isLoading, isError } = useQuery({
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
      <div className="flex gap-20">
        {isLoading ? (
          <p>Fetching for you</p>
        ) : (
          <p>Amount :{isError ? " Error Fetching Info" : data?.amount}</p>
        )}
        {isLoading ? (
          <p>Fetching for you</p>
        ) : (
          <p>
            LastMintTime:{" "}
            {isError ? " Error Fetching Info" : data?.lastMintTime}
          </p>
        )}
      </div>
      <WalletButton />
    </div>
  );
};

export default Navbar;
