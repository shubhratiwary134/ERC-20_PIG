import type { Pig, RacePosition } from "../types/types";

export type PigResult = {
  pig: Pig;
  position: number;
  racePosition: RacePosition;
};

const enumMap: Record<number, RacePosition> = {
  0: "first",
  1: "second",
  2: "third",
};

export const assignRacePositions = (pigs: Pig[]): PigResult[] => {
  const shuffled = [...pigs].sort(() => Math.random() - 0.5);

  return shuffled.map((pig, index) => {
    const numericPosition = index + 1;
    const racePosition = enumMap[index] ?? "none";

    return {
      pig,
      position: numericPosition,
      racePosition,
    };
  });
};
