import { useState, useEffect } from "react";

const COOLDOWN_PERIOD_MS = 24 * 60 * 60 * 1000;

function getRemainingTime(remainingMs: number) {
  if (remainingMs <= 0) {
    return "Mint available";
  }

  const hours = Math.floor(remainingMs / (1000 * 60 * 60));

  if (hours > 1) {
    return `${hours} hours left`;
  }

  if (hours === 1) {
    return "1 hour left";
  }

  return "Less than an hour left";
}

interface CooldownTimerProps {
  lastMintTime: number;
}

const CooldownTimer: React.FC<CooldownTimerProps> = ({ lastMintTime }) => {
  const lastMintTimeMs = lastMintTime * 1000;
  const cooldownEndTime = lastMintTimeMs + COOLDOWN_PERIOD_MS;

  const [displayTime, setDisplayTime] = useState(
    lastMintTime === 0
      ? "Mint available"
      : getRemainingTime(cooldownEndTime - Date.now())
  );

  useEffect(() => {
    if (lastMintTime === 0) {
      setDisplayTime("Mint available");
      return;
    }

    const updateTimer = () => {
      const remainingMs = cooldownEndTime - Date.now();

      if (remainingMs <= 0) {
        setDisplayTime("Mint available");
        clearInterval(intervalId);
      } else {
        setDisplayTime(getRemainingTime(remainingMs));
      }
    };

    const intervalId = setInterval(updateTimer, 1000);

    return () => clearInterval(intervalId);
  }, [cooldownEndTime, lastMintTime]);

  return <div className="text-blue-300">{displayTime}</div>;
};

export default CooldownTimer;
