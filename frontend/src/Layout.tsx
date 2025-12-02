import { Outlet, useLocation } from "react-router";
import { useEagerConnect } from "./customHooks/useEagerConnect";
import Navbar from "./components/Navbar";
import { AnimatePresence, motion, type Variants } from "framer-motion";

export const Layout = () => {
  useEagerConnect();
  const location = useLocation();

  // 1. Define the animation variants
  // This tells Framer Motion exactly what "hidden", "visible", and "exit" mean.
  const pageVariants: Variants = {
    // Initial state of the NEW page before it enters
    initial: {
      y: "-100vh", // Starts completely off-screen above the top
      opacity: 1, // It should be fully opaque so we see it slide down
    },
    // The state the page should end up in (center screen)
    animate: {
      y: "0vh",
      opacity: 1,
      transition: {
        duration: 1, // How long the slide down takes
        ease: [0.22, 1, 0.36, 1], // A nice custom easing curve (cubic-bezier)
      },
    },
    // The state the OLD page goes to when leaving
    exit: {
      y: "-100vh", // Slides completely off-screen to the top
      opacity: 1,
      transition: {
        duration: 1, // How long the slide up takes
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    // 2. Set the background to black so it looks like a curtain behind the moving pages
    <div className="app-container relative overflow-hidden bg-black h-screen w-screen">
      {/* Navbar needs a high z-index so it stays on top during transition */}
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* mode="wait" is crucial. It ensures the old page finishes exiting UP 
          before the new page starts entering DOWN. */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          variants={pageVariants} // Apply the variants defined above
          initial="initial"
          animate="animate"
          exit="exit"
          // Important: ensure the page takes full height/width during animation
          className="absolute top-0 left-0 w-full h-full overflow-auto bg-[#0f0f15]" // Assuming your app base color is dark
        >
          {/* Add padding-top to account for the fixed Navbar if necessary */}
          <div className="pt-20 h-full">
            <Outlet />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
