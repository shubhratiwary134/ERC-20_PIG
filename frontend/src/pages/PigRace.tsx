import { useState } from "react";
import Navbar from "../components/Navbar";
import RaceCard from "../components/RaceCard";
import type { Pig } from "../types/types";
import RaceStartButton from "../components/RaceStartButton";

const PigRace = () => {
  const [selectedPig, setSelectedPig] = useState<Pig | null>(null);
  const [results, setResults] = useState<Pig[] | null>(null);
  return (
    <div>
      <Navbar />
      <RaceCard setSelectedPig={setSelectedPig} />
      <RaceStartButton selectedPig={selectedPig} setResults={setResults} />
    </div>
  );
};

export default PigRace;
