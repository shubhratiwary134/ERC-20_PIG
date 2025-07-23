import "./App.css";
import WalletButton from "./components/WalletButton";

function App() {
  return (
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
          <button className="btn primary">Start Minting</button>
          <button className="btn secondary">Learn More</button>
          <WalletButton />
        </div>
      </div>
    </div>
  );
}

export default App;
