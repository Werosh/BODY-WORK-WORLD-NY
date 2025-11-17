import { useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { navItems } from "../data/constants";

function Header({ activeSection, isMenuOpen, setIsMenuOpen, scrollToSection }) {
  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen, setIsMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (item) => {
    scrollToSection(item);
    // Menu will be closed by scrollToSection in App.jsx
  };

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
            <button
              onClick={() => scrollToSection("home")}
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <img 
                src="/Logo.png" 
                alt="BODY WORK WORLD NY" 
                className="h-12 sm:h-16 w-auto"
              />
            </button>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className={`text-sm font-medium uppercase tracking-wide transition-colors pb-1 ${
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
            onClick={handleMenuToggle}
            className="lg:hidden p-2 rounded-md hover:bg-[#F2E8D5] transition-colors focus:outline-none focus:ring-2 focus:ring-[#A8C3A0]"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
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
            <>
              {/* Backdrop - covers entire screen below header */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
                className="lg:hidden fixed left-0 right-0 bottom-0 bg-black/30 backdrop-blur-sm z-40"
                style={{ top: "80px" }}
              />

              {/* Menu Content */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="lg:hidden relative z-50 bg-white border-t border-[#F2E8D5] shadow-lg"
              >
                <div className="py-2 space-y-1">
                  {navItems.map((item) => (
                    <button
                      key={item}
                      onClick={() => handleNavClick(item)}
                      className={`block w-full text-left px-4 py-3 text-sm font-medium uppercase tracking-wide transition-colors ${
                        activeSection === item
                          ? "bg-[#A8C3A0] text-white"
                          : "text-[#2E2E2E] hover:bg-[#F2E8D5] active:bg-[#F2E8D5]"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

export default Header;
