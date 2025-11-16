import { useState } from "react";
import Navbar from "../components/Navbar";
import RaceCard from "../components/RaceCard";
import type { Pig } from "../types/types";
import RaceStartButton from "../components/RaceStartButton";
import type { PigResult } from "../utils/assignRacePositions";
import ResultDisplay from "../components/ResultDisplay";
import { ToastContainer } from "react-toastify";
import { useRaceRewardMintMutate } from "../customHooks/useRaceRewardMintMutate";
import LoaderAnimation from "../components/LoaderAnimation";

const PigRace = () => {
  const [selectedPig, setSelectedPig] = useState<Pig | null>(null);
  const [results, setResults] = useState<PigResult[] | null>(null);
  const [animationFlag, setAnimationFlag] = useState<boolean>(false);
  const { error, isError, mutateAsync } = useRaceRewardMintMutate();
  return (
    <div>
      <Navbar />
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

        {isError && (
          <div className="mx-auto my-10 max-w-md rounded-lg  bg-red-100/20 px-6 py-4 text-red-300 shadow-md backdrop-blur-sm">
            <h2 className="text-lg font-semibold">⚠️ Reward Minting Failed</h2>
            <p className="mt-2 text-sm text-red-400">
              {error instanceof Error
                ? error.message
                : "An unexpected error occurred while processing your reward."}
            </p>
          </div>
        )}

        <ToastContainer theme="dark" position="bottom-left" />
      </div>
    </div>
  );
};

export default PigRace;
