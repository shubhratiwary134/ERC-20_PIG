import type { Pig } from "../types/types";

const RaceStartButton = ({ selectedPig }: { selectedPig: Pig | null }) => {
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
    >
      {selectedPig && <img src={selectedPig?.imageUrl} className="h-1/2" />}
      <span>Start Racing</span>
    </button>
  );
};

export default RaceStartButton;
