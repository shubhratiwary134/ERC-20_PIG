import { toast } from "react-toastify";
import { useRaceRewardMintMutate } from "../customHooks/useRaceRewardMintMutate";
import type { Pig, RacePosition } from "../types/types";
import {
  assignRacePositions,
  type PigResult,
} from "../utils/assignRacePositions";
import { Pigs } from "../data/pigData";

interface RaceStartButtonProps {
  selectedPig: Pig | null;
  setResults: (pigs: PigResult[]) => void;
}

const RaceStartButton = ({ selectedPig, setResults }: RaceStartButtonProps) => {
  const { mutateAsync } = useRaceRewardMintMutate();
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
      handleRaceReward(userPigResult.racePosition);
    }
  };

  return (
    <button
      className="
         mt-5 mx-10 flex flex-col items-center justify-center gap-4
         w-52 h-40
         bg-white/10
         backdrop-blur-lg
         border border-white/20
         rounded-2xl
         shadow-lg
         text-white font-semibold
         transition-all duration-300  hover:scale-110
         hover:bg-white/20 hover:border-white/40
         focus:outline-none focus:ring-2 focus:ring-white/50
         disabled:opacity-50 disabled:cursor-not-allowed
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
