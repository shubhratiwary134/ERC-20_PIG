import { toast } from "react-toastify";

import type { Pig } from "../types/types";
import {
  assignRacePositions,
  type PigResult,
} from "../utils/assignRacePositions";
import { Pigs } from "../data/pigData";

interface RaceStartButtonProps {
  selectedPig: Pig | null;
  setResults: (pigs: PigResult[]) => void;
  mutateAsync: (position: number) => Promise<any>;
  setAnimationFlag: (animationFlag: boolean) => void;
}

const RaceStartButton = ({
  selectedPig,
  setResults,
  mutateAsync,
  setAnimationFlag,
}: RaceStartButtonProps) => {
  const handleRaceReward = async (position: number) => {
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
    setAnimationFlag(true);

    setTimeout(() => {
      const results = assignRacePositions(Pigs);
      setResults(results);
      setAnimationFlag(false);

      const userPigResult = results.find(
        (r) => r.pig.name === selectedPig?.name
      );
      if (!userPigResult) return;

      if (userPigResult.racePosition !== "none") {
        toast.success("🎉 You won! Processing your reward...");
        setTimeout(() => {
          handleRaceReward(userPigResult.position);
        }, 2000);
      } else {
        toast.info("You couldn't win try again next time");
      }
    }, 4000);
  };

  return (
    <button
      className="
         mt-10 sm:max-w-2/3  flex  lg:flex-col  items-center justify-around lg:justify-center gap-4 w-full lg:w-52 lg:h-40 mb-2 h-32
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
        <img
          src={selectedPig?.imageUrl}
          className="h-2/3  lg:h-1/2 rounded-3xl"
        />
      )}
      <span className="font-oxanium text-md  sm:text-xl lg:text-sm px-3">
        Start Racing 🚀
      </span>
    </button>
  );
};

export default RaceStartButton;
