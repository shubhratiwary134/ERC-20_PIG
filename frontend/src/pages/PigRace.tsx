import { useState } from "react";
import RaceCard from "../components/RaceCard";
import type { Pig } from "../types/types";
import RaceStartButton from "../components/RaceStartButton";
import type { PigResult } from "../utils/assignRacePositions";
import ResultDisplay from "../components/ResultDisplay";
import { ToastContainer } from "react-toastify";
import { useRaceRewardMintMutate } from "../customHooks/useRaceRewardMintMutate";
import LoaderAnimation from "../components/LoaderAnimation";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";

const PigRace = () => {
  const [selectedPig, setSelectedPig] = useState<Pig | null>(null);
  const [results, setResults] = useState<PigResult[] | null>(null);
  const [animationFlag, setAnimationFlag] = useState<boolean>(false);
  const { isError, mutateAsync } = useRaceRewardMintMutate();

  const navigate = useNavigate();

  return (
    <div>
      <div className="pt-5 px-10 text-white flex flex-col">
        {!results && !animationFlag && (
          <RaceCard setSelectedPig={setSelectedPig} />
        )}

        {animationFlag && <LoaderAnimation />}

        {results && (
          <ResultDisplay
            results={results}
            selectedPig={selectedPig}
            onBack={() => {
              setResults(null); //  clears results → goes back to race screen
              setAnimationFlag(false); // optional safety reset
              // you can also reset selectedPig here if you want:
              // setSelectedPig(null);
            }}
          />
        )}

        {!results && !animationFlag && (
          <div className="w-full flex justify-center lg:justify-between">
            <RaceStartButton
              selectedPig={selectedPig}
              setResults={setResults}
              mutateAsync={mutateAsync}
              setAnimationFlag={setAnimationFlag}
            />
          </div>
        )}

        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 ml-4 mt-10 mb-5 text-white hover:text-cyan-300 transition"
        >
          <ArrowLeft size={20} />
          <span className="text-md lg:text-lg font-semibold">Back</span>
        </button>

        {isError && (
          <div className="mx-auto my-10 max-w-md rounded-lg  bg-red-100/20 px-6 py-4 text-red-300 shadow-md backdrop-blur-sm">
            <h2 className="text-lg font-semibold">⚠️ Reward Minting Failed</h2>
          </div>
        )}

        <ToastContainer theme="dark" position="bottom-left" />
      </div>
    </div>
  );
};

export default PigRace;
