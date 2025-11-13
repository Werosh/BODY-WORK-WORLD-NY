// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { navItems } from "../data/constants";

function Header({ activeSection, isMenuOpen, setIsMenuOpen, scrollToSection }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-md">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <h1 className="text-xl sm:text-2xl font-bold text-[#4B6043] tracking-wide">
              BODY WORK WORLD NY
            </h1>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`text-sm font-medium uppercase tracking-wide transition-colors ${
                  activeSection === item
                    ? "text-[#4B6043] border-b-2 border-[#4B6043]"
                    : "text-[#2E2E2E] hover:text-[#A8C3A0]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-[#F2E8D5] transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-[#4B6043]"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden bg-white border-t border-[#F2E8D5]"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`block w-full text-left px-4 py-3 text-sm font-medium uppercase tracking-wide transition-colors ${
                      activeSection === item
                        ? "bg-[#A8C3A0] text-white"
                        : "text-[#2E2E2E] hover:bg-[#F2E8D5]"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

export default Header;
