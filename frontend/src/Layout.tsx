import { Outlet, useLocation } from "react-router";
import { useEagerConnect } from "./customHooks/useEagerConnect";
import Navbar from "./components/Navbar";
import { AnimatePresence, motion } from "framer-motion";

export const Layout = () => {
  useEagerConnect();
  const location = useLocation();

  // The specific cubic-bezier for that "snappy" feel
  const transitionCurve: [number, number, number, number] = [0.76, 0, 0.24, 1];

  return (
    <div className="app-container relative h-screen w-screen overflow-hidden bg-black text-white">
      {/* Navbar: Fixed at top, z-50. Outside animation loop. */}
      <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <div className="pointer-events-auto">
          <Navbar />
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          className="h-full w-full absolute top-0 left-0 z-40 pointer-events-none"
        >
          {/* TOP CURTAIN - STEEL EFFECT */}
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 bg-[#050505]"
            style={{
              background: "linear-gradient(to bottom, #202428, #434b55)",
              boxShadow: "0 10px 40px rgba(0,0,0,0.8)",
              borderBottom: "2px solid #5c6670",
            }}
            initial={{ y: "0%" }}
            animate={{
              y: "-100%",
              transition: { duration: 0.8, ease: transitionCurve, delay: 0.4 },
            }}
            exit={{
              y: ["-100%", "0%"],
              transition: { duration: 0.8, ease: transitionCurve },
            }}
          />

          {/* BOTTOM CURTAIN - STEEL EFFECT */}
          <motion.div
            className="absolute bottom-0 left-0 w-full h-1/2 bg-[#050505]"
            style={{
              background: "linear-gradient(to top, #202428, #434b55)",
              boxShadow: "0 -10px 40px rgba(0,0,0,0.8)",
              borderTop: "2px solid #5c6670",
            }}
            initial={{ y: "0%" }}
            animate={{
              y: "100%",
              transition: { duration: 0.8, ease: transitionCurve, delay: 0.4 },
            }}
            exit={{
              y: ["100%", "0%"],
              transition: { duration: 0.8, ease: transitionCurve },
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* THE CONTENT LAYER - SEPARATE FROM TRANSITION ELEMENTS */}
      <motion.div
        key={location.pathname}
        className="h-full w-full overflow-y-auto pt-24 pb-10 absolute top-0 left-0"
        style={{
          background:
            "radial-gradient(circle at top left, #10151f, #0a0c12 60%, #050509)",
        }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 0.6, duration: 0.4 }, // Fade in after curtains open
        }}
      >
        <Outlet />
      </motion.div>
    </div>
  );
};
