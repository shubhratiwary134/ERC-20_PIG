import { motion } from "framer-motion";

const pigs = ["🐖", "🐷", "🐽"];

const LoaderAnimation = () => (
  <div className="absolute inset-0 flex flex-col justify-center items-center overflow-hidden ">
    <motion.p
      initial={{ opacity: 0.6 }}
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="text-gray-300 text-lg mb-4 font-medium text-center px-4"
    >
      🐽 Sprinting for snacks, glory, and maybe a truffle or two.
    </motion.p>

    <div className="flex gap-3 p-4 rounded-lg">
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
