import SplineElement from "./components/SplineElement";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFaucetMintMutate } from "./customHooks/useFaucetMintMutate";
import { useAppSelector } from "./store/hook";
import { FaRocket, FaTicketAlt } from "react-icons/fa";
import { useNavigate } from "react-router";

function App() {
  const { connected } = useAppSelector((state) => state.wallet);
  const { mutateAsync } = useFaucetMintMutate();

  const navigate = useNavigate();

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

  return (
    <>
      <div className="relative flex flex-col lg:flex-row w-full h-screen overflow-hidden">
        {/* Background Spline for Mobile, Right-Aligned for Desktop */}
        <div className="absolute inset-0 lg:inset-y-0 lg:left-1/2 lg:w-1/2 z-0 lg:z-10 opacity-30 lg:opacity-100 pointer-events-none lg:pointer-events-auto">
          <SplineElement />
        </div>

        {/* Text Content */}
        <div className="relative z-20 flex flex-col justify-center w-full lg:w-1/2 px-6 sm:px-12 lg:px-16 text-white h-full pb-20 lg:pb-0">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-oxanium leading-tight">
            Mint Your <br />
            <span className="text-blue-300">Digital Assets</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg font-inter max-w-xl">
            Mint tokens daily from our faucet or win them in the exciting races.
            Build your digital portfolio on our cutting edge and playful
            decentralized platform.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-10">
            <button
              className="flex flex-col items-center justify-center gap-4
      w-full sm:w-48 lg:w-52 h-40
      bg-white/10
      backdrop-blur-lg
      border border-white/20
      rounded-2xl
      shadow-lg
      text-white font-semibold
      transition-all duration-300 hover:scale-[1.05] lg:hover:scale-110
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
      w-full sm:w-48 lg:w-52 h-40
      bg-white/10
      backdrop-blur-lg
      border border-white/20
      rounded-2xl
      shadow-lg
      text-white font-semibold
      transition-all duration-300 hover:scale-[1.05] lg:hover:scale-110
      hover:bg-white/20 hover:border-white/40
      focus:outline-none focus:ring-2 focus:ring-white/50
      disabled:opacity-50 disabled:cursor-not-allowed
    "
              disabled={!connected}
              onClick={() => navigate("/app/pigRace")}
            >
              <FaRocket size={40} />
              <span>Start Racing</span>
            </button>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" />
    </>
  );
}

export default App;
