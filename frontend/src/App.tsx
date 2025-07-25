import { toast, ToastContainer } from "react-toastify";
import "./App.css";
import Navbar from "./components/Navbar";
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
      <div className="banner flex justify-between items-center ">
        <div className="content flex flex-col gap-20">
          <h1 className="text-6xl font-bold">
            Mint Your <br />
            <span className="text-amber-300">Digital Assets</span>
          </h1>
          <p className="text-lg">
            Create, deploy, and manage your own cryptocurrency tokens on the
            blockchain. Join the future of decentralized finance with our
            cutting-edge minting platform.
          </p>
          <div className="buttons flex justify-around">
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
        <div className="w-1/2">{/* Container for the 3d blob with coin */}</div>
      </div>
      <ToastContainer position="top-right" />
    </>
  );
}

export default App;
