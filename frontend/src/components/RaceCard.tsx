import { useState } from "react";
import { Pigs } from "../data/pigData";
import type { Pig } from "../types/types";

const RaceCard = ({
  setSelectedPig,
}: {
  setSelectedPig: (pig: Pig) => void;
}) => {
  const handleClick = (pig: Pig) => {
    setSelectedPig(pig);
    setSelectedIndex(Pigs.indexOf(pig));
  };
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  return (
    <div className="mt-10 flex flex-col shrink">
      <div className="font-oxanium">
        <h1 className="text-2xl sm:text-3xl lg:mt-5 lg:text-4xl lg:text-start text-center font-extrabold text-purple-400">
          SELECT YOUR CHAMPION
        </h1>
        <p className="text-sm lg:text-lg text-slate-400 mt-1 text-center lg:text-start">
          A legend will be crowned in the grand arena.
        </p>
      </div>
      <div
        className="mt-10 grid grid-cols-[auto_auto] justify-between gap-y-5 
             sm:grid-cols-[auto_auto_auto]
             lg:flex md:grid-cols-[auto_auto_auto_auto]  lg:gap-10 2xl:gap-20"
      >
        {Pigs.map((pig, index) => (
          <div
            key={index}
            onClick={() => handleClick(pig)}
            className={`flex ${
              selectedIndex == index ? "bg-white/20 scale-110" : "bg-white/10"
            }  flex-col gap-3 lg:gap-5 items-center max-w-36 max-h-48 pb-5 lg:max-w-64 lg:max-h-80
            backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg text-white transition-all
            duration-300 hover:cursor-pointer hover:scale-110 hover:bg-white/20 hover:border-white/40`}
          >
            <img
              src={pig.imageUrl}
              className="rounded-t-2xl lg:rounded-none lg:h-1/2"
            />

            <p className="text-gray-200 text-sm lg:text-lg ">{pig.name}</p>
            <div className="hidden lg:block h-1 bg-gray-400/50 w-full"></div>
            <div className="hidden  lg:flex lg:flex-col lg:gap-2 xl:flex-row justify-between w-full px-5 text-gray-400 ">
              <div className="flex flex-col gap-2 ">
                <p className="text-sm ">Height: {pig.height}</p>
                <p className="text-sm">Weight: {pig.weight}</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm">Jump: {pig.longestJump}</p>
                <p className="text-sm">Agility: {pig.Agility}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RaceCard;
