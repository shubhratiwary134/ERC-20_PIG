import React from "react";
import { motion } from "framer-motion";

const pigs = ["🐖", "🐷", "🐽"];

const LoaderAnimation: React.FC = () => (
  <div className="flex justify-center items-center bg-opacity-80 p-4 rounded-lg">
    <div className="flex gap-3">
      {pigs.map((pig, i) => (
        <motion.span
          key={i}
          initial={{ scale: 0.7, opacity: 0.6 }}
          animate={{ scale: [0.7, 1.3, 0.7], opacity: [0.6, 1, 0.6] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatDelay: 0.3,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
          className="text-3xl text-gray-200"
        >
          {pig}
        </motion.span>
      ))}
    </div>
  </div>
);

export default LoaderAnimation;
