import Navbar from "./components/Navbar";
import SplineElement from "./components/SplineElement";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFaucetMintMutate } from "./customHooks/useFaucetMintMutate";
import { useAppSelector } from "./store/hook";
import { FaRocket, FaTicketAlt } from "react-icons/fa";
import { useEagerConnect } from "./customHooks/useEagerConnect";

function App() {
  const { connected } = useAppSelector((state) => state.wallet);
  const { mutateAsync } = useFaucetMintMutate();

  const handleMint = async () => {
    try {
      const receipt = await mutateAsync();
      toast.success(`Mint successful! Transaction Hash: ${receipt.hash}`);
    } catch (error: any) {
      if (error.code === 4001 || error.code === "ACTION_REJECTED") {
        toast.warning("Transaction cancelled by user.");
      } else {
        toast.error(`Mint failed: please try again later.`);
        console.error("Mint failed:", error);
      }
    }
  };

  useEagerConnect();

  return (
    <>
      <Navbar />
      <div className="relative flex w-full h-screen overflow-hidden ">
        <div className="relative z-20 flex text-wrap flex-col justify-center w-1/2 px-16 text-white">
          <h1 className="text-8xl font-bold font-oxanium">
            Mint Your <br />
            <span className="text-blue-300">Digital Assets</span>
          </h1>
          <p className="mt-6 text-lg font-inter">
            Mint tokens daily from our faucet or win them in the exciting races.
            Build your digital portfolio on our cutting edge and playful
            decentralized platform.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center  gap-10">
            <button
              className="flex flex-col items-center justify-center gap-4
      w-52 h-40
      bg-white/10
      backdrop-blur-lg
      border border-white/20
      rounded-2xl
      shadow-lg
      text-white font-semibold
      transition-all duration-300 hover:scale-110
      hover:bg-white/20 hover:border-white/40
      focus:outline-none focus:ring-2 focus:ring-white/50
      disabled:opacity-50 disabled:cursor-not-allowed
    "
              disabled={!connected}
              onClick={handleMint}
            >
              <FaTicketAlt size={40} />
              <span>Claim Token</span>
            </button>

            <button
              className="
      flex flex-col items-center justify-center gap-4
      w-52 h-40
      bg-white/10
      backdrop-blur-lg
      border border-white/20
      rounded-2xl
      shadow-lg
      text-white font-semibold
      transition-all duration-300  hover:scale-110
      hover:bg-white/20 hover:border-white/40
      focus:outline-none focus:ring-2 focus:ring-white/50
      disabled:opacity-50 disabled:cursor-not-allowed
    "
              disabled={!connected}
              onClick={() => (window.location.href = "/pigRace")}
            >
              <FaRocket size={40} />
              <span>Start Racing</span>
            </button>
          </div>
        </div>

        <div className="absolute inset-y-0 right-0 w-1/2 z-10">
          <SplineElement />
        </div>
      </div>
      <ToastContainer position="top-right" />
    </>
  );
}

export default App;
