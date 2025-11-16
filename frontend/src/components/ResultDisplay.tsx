import { ArrowLeft } from "lucide-react";
import type { Pig } from "../types/types";
import type { PigResult } from "../utils/assignRacePositions";

const ResultDisplay = ({
  results,
  selectedPig,
  onBack,
}: {
  results: PigResult[] | null;
  selectedPig: Pig | null;
  onBack: () => void;
}) => {
  return (
    <div className="lg:mt-10 px-10 font-oxanium py-5">
      {/* BACK BUTTON */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 mb-4 text-white hover:text-cyan-300 transition"
      >
        <ArrowLeft size={20} />
        <span className="text-md lg:text-lg font-semibold">Back</span>
      </button>

      <p className="text-xl lg:text-3xl font-bold text-purple-400 mb-6 text-center drop-shadow">
        🏁 Race Results
      </p>

      <div className="flex flex-wrap justify-center gap-10">
        {results?.map((result, index) => {
          const isUserPig = selectedPig?.name === result.pig.name;

          return (
            <div
              key={index}
              className={`relative w-52 h-52 lg:h-60 p-4 rounded-2xl shadow-md backdrop-blur-lg flex flex-col items-center justify-between transition-transform
                ${
                  isUserPig
                    ? "border-2 border-cyan-400 bg-cyan-300/10 scale-105"
                    : "border border-white/20 bg-white/10"
                }
              `}
            >
              {isUserPig && (
                <div className="absolute top-2 right-2 bg-cyan-500 text-white text-xs px-2 py-1 rounded-full shadow-sm">
                  🏆 You
                </div>
              )}

              <img
                src={result.pig.imageUrl}
                className="h-24 w-auto rounded-lg object-contain"
                alt={result.pig.name}
              />
              <p className="text-sm font-semibold mt-2 lg:text-md">
                {result.pig.name}
              </p>
              <div className="h-1 w-full bg-white/20 my-2 rounded"></div>
              <p className="text-sm text-gray-300">
                Position:{" "}
                <span className="font-bold text-white">{result.position}</span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResultDisplay;
