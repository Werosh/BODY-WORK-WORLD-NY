// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

function ScrollToTop({ show, onClick }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={onClick}
          className="fixed bottom-8 right-8 w-12 h-12 bg-[#FF6B35] text-white rounded-full shadow-lg hover:bg-[#FFA726] transition-colors duration-300 flex items-center justify-center z-40"
          aria-label="Scroll to top"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default ScrollToTop;
