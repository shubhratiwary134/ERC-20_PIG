import { toast } from "react-toastify";

import type { Pig, RacePosition } from "../types/types";
import {
  assignRacePositions,
  type PigResult,
} from "../utils/assignRacePositions";
import { Pigs } from "../data/pigData";

interface RaceStartButtonProps {
  selectedPig: Pig | null;
  setResults: (pigs: PigResult[]) => void;
  mutateAsync: (position: RacePosition) => Promise<any>;
}

const RaceStartButton = ({
  selectedPig,
  setResults,
  mutateAsync,
}: RaceStartButtonProps) => {
  const handleRaceReward = async (position: RacePosition) => {
    if (!selectedPig) return;
    try {
      const receipt = await mutateAsync(position);
      toast.success(
        `Mint successful! Transaction Hash: ${receipt.transactionHash}`
      );
    } catch (error: any) {
      if (error.code === 4001 || error.code === "ACTION_REJECTED") {
        toast.warning("Transaction cancelled by user.");
      } else {
        toast.error(`Race start failed: ${error.message}`);
      }
    }
  };

  const startRace = () => {
    const results = assignRacePositions(Pigs);
    setResults(results);

    const userPigResult = results.find((r) => r.pig.name === selectedPig?.name);
    if (!userPigResult) return;

    if (userPigResult.racePosition !== "none") {
      toast.success("🎉 You won! Processing your reward...");
      setTimeout(() => {
        handleRaceReward(userPigResult.racePosition);
      }, 2000);
    } else {
      toast.info("You couldn't win try again next time");
    }
  };

  return (
    <button
      className="
         mt-10  flex flex-col items-center justify-center gap-4
         w-52 h-40
         bg-white/10
         backdrop-blur-lg
         border border-white/20
         rounded-2xl
         shadow-lg
         text-white font-semibold
         transition-all duration-300  
         focus:outline-none focus:ring-2 focus:ring-white/50
         disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
       "
      disabled={!selectedPig}
      onClick={startRace}
    >
      {selectedPig && (
        <img src={selectedPig?.imageUrl} className="h-1/2 rounded-3xl" />
      )}
      <span>Start Racing</span>
    </button>
  );
};

export default RaceStartButton;
