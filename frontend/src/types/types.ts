export type RacePosition = "first" | "second" | "third" | "none";

export const enumMap: Record<number, RacePosition> = {
  0: "first",
  1: "second",
  2: "third",
};

export interface Pig {
  name: string;
  imageUrl: string;
  description: string;
  height: string;
  weight: string;
  Agility: number;
  longestJump: string;
}
