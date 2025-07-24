import "./App.css";
import Navbar from "./components/Navbar";
import { useAppSelector } from "./store/hook";

function App() {
  const { connected } = useAppSelector((state) => state.wallet);
  return (
    <>
      <Navbar />
      <div className="banner flex justify-between items-center ">
        <div className="content flex flex-col gap-20">
          <h1 className="text-6xl font-bold">
            Mint Your <br />
            <span className="text-blue-300">Digital Assets</span>
          </h1>
          <p className="text-lg">
            Create, deploy, and manage your own cryptocurrency tokens on the
            blockchain. Join the future of decentralized finance with our
            cutting-edge minting platform.
          </p>
          <div className="buttons flex justify-around">
            <button className="btn primary border-2 p-2" disabled={!connected}>
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
    </>
  );
}

export default App;
