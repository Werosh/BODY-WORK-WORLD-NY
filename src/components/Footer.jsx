function Footer({ scrollToSection }) {
  const quickLinks = [
    "Home",
    "Services",
    "Forms",
    "Gallery",
    "Shop",
    "Contact",
  ];

  const socialLinks = [
    {
      name: "facebook",
      url: "https://facebook.com/bodyworkworldny",
    },
    {
      name: "instagram",
      url: "https://instagram.com/bodyworkworldny",
    },
    {
      name: "twitter",
      url: "https://twitter.com/bodyworkworldny",
    },
  ];

  return (
    <footer className="bg-[#F2E8D5] py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-[#4B6043] mb-4">
              BODYWORKWORLDNY
            </h3>
            <p className="text-[#2E2E2E]">
              Professional bodywork and spa services for your wellness journey.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-[#4B6043] mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => scrollToSection(link.toLowerCase())}
                    className="text-[#2E2E2E] hover:text-[#A8C3A0] transition-colors"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold text-[#4B6043] mb-4">
              Follow Us
            </h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#A8C3A0] rounded-full flex items-center justify-center hover:bg-[#4B6043] transition-colors duration-300"
                  aria-label={`Follow us on ${social.name}`}
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[#A8C3A0] pt-8 text-center">
          <p className="text-[#2E2E2E]">
            &copy; {new Date().getFullYear()} BODYWORKWORLDNY. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
