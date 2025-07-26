import Navbar from "./components/Navbar";
import SplineElement from "./components/SplineElement";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFaucetMintMutate } from "./customHooks/useFaucetMintMutate";
import { useAppSelector } from "./store/hook";

function App() {
  const { connected } = useAppSelector((state) => state.wallet);
  const { mutateAsync } = useFaucetMintMutate();

  const handleMint = async () => {
    try {
      const receipt = await mutateAsync();
      toast.success(
        `Mint successful! Transaction Hash: ${receipt.transactionHash}`
      );
    } catch (error: any) {
      if (error.code === 4001 || error.code === "ACTION_REJECTED") {
        toast.warning("Transaction cancelled by user.");
      } else {
        toast.error(`Mint failed: ${error.message}`);
      }
    }
  };
  return (
    <>
      <Navbar />
      <div className="relative flex w-full h-screen overflow-hidden ">
        <div className="relative z-20 flex text-wrap flex-col justify-center mb-10 w-1/2 px-16 text-white">
          <h1 className="text-8xl font-bold">
            Mint Your <br />
            <span className="text-blue-300">Digital Assets</span>
          </h1>
          <p className="mt-6 text-lg">
            Create, deploy, and manage your own cryptocurrency tokens on the
            blockchain. Join the future of decentralized finance with our
            cutting-edge minting platform.
          </p>
          <div className="mt-10 flex space-x-6">
            <button
              className="btn primary border-2 p-2"
              disabled={!connected}
              onClick={handleMint}
            >
              Claim Token
            </button>
            <button
              className="btn secondary border-2 p-2"
              disabled={!connected}
              onClick={() => (window.location.href = "/pigRace")}
            >
              Start Racing
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
