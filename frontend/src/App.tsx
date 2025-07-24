import "./App.css";
import Navbar from "./components/Navbar";
import { useAppSelector } from "./store/hook";

function App() {
  const { connected } = useAppSelector((state) => state.wallet);
  return (
    <>
      <Navbar />
      <div className="banner">
        <div className="content">
          <h1>
            Mint Your <span className="highlight">Digital Assets</span>
          </h1>
          <p>
            Create, deploy, and manage your own cryptocurrency tokens on the
            blockchain. Join the future of decentralized finance with our
            cutting-edge minting platform.
          </p>
          <div className="buttons">
            <button className="btn primary" disabled={!connected}>
              Claim Token
            </button>
            <button
              className="btn secondary"
              disabled={!connected}
              onClick={() => (window.location.href = "/pigRace")}
            >
              Start Racing
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
