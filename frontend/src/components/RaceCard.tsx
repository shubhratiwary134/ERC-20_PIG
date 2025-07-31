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
    <div className="mt-10 text-white flex flex-col p-10">
      <h1 className="text-2xl">
        Pick your pig - Choose wisely this might be the toughest decision you
        make
      </h1>
      <div className="mt-10 flex gap-20">
        {Pigs.map((pig, index) => (
          <div
            key={index}
            onClick={() => handleClick(pig)}
            className={`flex ${
              selectedIndex == index ? "bg-white/20 scale-110" : "bg-white/10"
            }  flex-col gap-5 items-center w-64 h-80 
            backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg text-white transition-all
            duration-300  hover:scale-110 hover:bg-white/20 hover:border-white/40`}
          >
            <img src={pig.imageUrl} className="h-1/2" />

            <p className="text-gray-200">{pig.name}</p>
            <div className="h-1 bg-gray-400/50 w-full"></div>
            <div className="flex justify-between w-full px-5 text-gray-400 ">
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
