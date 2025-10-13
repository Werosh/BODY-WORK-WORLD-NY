import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
      
      // Update active section based on scroll position
      const sections = ['home', 'services', 'forms', 'gallery', 'shop', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openBookingModal = (service = '') => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService('');
  };

  const services = [
    {
      title: 'Bodywork',
      description: 'Professional therapeutic massage and bodywork tailored to your needs.',
      image: '/images/bodywork.jpg'
    },
    {
      title: 'Waxing',
      description: 'Gentle and effective hair removal services for smooth, beautiful skin.',
      image: '/images/waxing.jpg'
    },
    {
      title: 'Back Facials',
      description: 'Deep cleansing treatment for your back to achieve clear, healthy skin.',
      image: '/images/back-facial.jpg'
    },
    {
      title: 'Facials',
      description: 'Rejuvenating facial treatments for a radiant, glowing complexion.',
      image: '/images/facial.jpg'
    },
    {
      title: 'Microdermabrasion',
      description: 'Advanced exfoliation technique for smoother, younger-looking skin.',
      image: '/images/microdermabrasion.jpg'
    },
    {
      title: 'HydraFacial',
      description: 'The ultimate hydrating facial for instant, noticeable results.',
      image: '/images/hydrafacial.jpg'
    }
  ];

  const galleryImages = [
    '/images/gallery1.jpg',
    '/images/gallery2.jpg',
    '/images/gallery3.jpg',
    '/images/gallery4.jpg',
    '/images/gallery5.jpg',
    '/images/gallery6.jpg',
    '/images/gallery7.jpg',
    '/images/gallery8.jpg'
  ];

  const shopItems = [
    { name: 'Relaxation Oil', price: '$35', image: '/images/product1.jpg' },
    { name: 'Spa Gift Set', price: '$65', image: '/images/product2.jpg' },
    { name: 'Luxury Candles', price: '$25', image: '/images/product3.jpg' },
    { name: 'Face Cream', price: '$45', image: '/images/product4.jpg' }
  ];

  return (
    <div className="min-h-screen">
      {/* Header & Navigation */}
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
                BODYWORKWORLDNY
              </h1>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex space-x-8">
              {['home', 'services', 'forms', 'gallery', 'shop', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`text-sm font-medium uppercase tracking-wide transition-colors ${
                    activeSection === item
                      ? 'text-[#4B6043] border-b-2 border-[#4B6043]'
                      : 'text-[#2E2E2E] hover:text-[#A8C3A0]'
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
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden overflow-hidden bg-white border-t border-[#F2E8D5]"
              >
                <div className="py-4 space-y-2">
                  {['home', 'services', 'forms', 'gallery', 'shop', 'contact'].map((item) => (
                    <button
                      key={item}
                      onClick={() => scrollToSection(item)}
                      className={`block w-full text-left px-4 py-3 text-sm font-medium uppercase tracking-wide transition-colors ${
                        activeSection === item
                          ? 'bg-[#A8C3A0] text-white'
                          : 'text-[#2E2E2E] hover:bg-[#F2E8D5]'
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

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url("/images/spa-background.jpg")',
              backgroundAttachment: 'fixed'
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(168, 195, 160, 0.85) 0%, rgba(242, 232, 213, 0.85) 100%)'
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Relax. Refresh. Rejuvenate.
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-white/95 mb-8 leading-relaxed"
          >
            Professional Bodywork, Facials, and Waxing Services in New York & Florida
          </motion.p>
          
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            onClick={() => scrollToSection('services')}
            className="bg-[#4B6043] text-white px-8 sm:px-12 py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-[#3a4a34] hover:scale-105 shadow-lg transition-all duration-300"
          >
            Book Appointment
          </motion.button>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
          >
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </motion.div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 sm:py-20 lg:py-24 bg-[#FAFAF8]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4B6043] mb-4">
              Our Services
            </h2>
            <p className="text-base sm:text-lg text-[#2E2E2E] max-w-2xl mx-auto">
              Experience our range of professional treatments designed to rejuvenate your body and mind
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{
                      backgroundImage: `url(${service.image})`,
                      backgroundColor: '#F2E8D5'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-[#2E2E2E] mb-6 line-clamp-3">{service.description}</p>
                  <button
                    onClick={() => openBookingModal(service.title)}
                    className="w-full bg-[#A8C3A0] text-white py-3 rounded-lg font-semibold hover:bg-[#4B6043] transition-colors duration-300"
                  >
                    Book Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Forms Section */}
      <section id="forms" className="py-16 sm:py-20 lg:py-24 bg-[#F2E8D5]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4B6043] mb-4">
              Client Forms
            </h2>
            <p className="text-base sm:text-lg text-[#2E2E2E] max-w-2xl mx-auto mb-8">
              Please fill out the required form(s) before your appointment.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {['New Client Intake Form', 'Health History Form', 'Consent Form'].map((form, index) => (
              <motion.div
                key={form}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-[#A8C3A0] rounded-full mb-4 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#4B6043] text-center mb-4">{form}</h3>
                <button className="w-full bg-[#4B6043] text-white py-2 rounded-lg hover:bg-[#3a4a34] transition-colors duration-300">
                  Download PDF
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section id="gallery" className="py-16 sm:py-20 lg:py-24 bg-[#FAFAF8]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4B6043] mb-4">
              Gallery
            </h2>
            <p className="text-base sm:text-lg text-[#2E2E2E]">
              Take a look at our serene spa environment
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="relative h-64 rounded-xl overflow-hidden group cursor-pointer"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${image})`,
                    backgroundColor: '#F2E8D5'
                  }}
                />
                <div className="absolute inset-0 bg-[#4B6043]/0 group-hover:bg-[#4B6043]/60 transition-colors duration-300 flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop Section */}
      <section id="shop" className="py-16 sm:py-20 lg:py-24 bg-[#F2E8D5]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4B6043] mb-4">
              Shop
            </h2>
            <p className="text-base sm:text-lg text-[#2E2E2E]">
              Premium spa products for your home care routine
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {shopItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{
                      backgroundImage: `url(${item.image})`,
                      backgroundColor: '#F2E8D5'
                    }}
                  />
                  <div className="absolute top-4 right-4 bg-[#A8C3A0] text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {item.price}
                  </div>
                </div>
                
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-[#4B6043] mb-3">{item.name}</h3>
                  <button className="w-full bg-[#4B6043] text-white py-2 rounded-lg hover:bg-[#3a4a34] transition-colors duration-300 font-medium">
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="inline-block bg-[#A8C3A0] text-white px-6 py-3 rounded-full text-lg font-semibold">
              More Products Coming Soon!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-[#FAFAF8]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4B6043] mb-4">
              Contact Us
            </h2>
            <p className="text-base sm:text-lg text-[#2E2E2E]">
              Get in touch to schedule your appointment
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#A8C3A0] rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#4B6043] mb-1">Phone</h3>
                    <p className="text-[#2E2E2E]">+1 (631) 381-8800</p>
                    <p className="text-sm text-gray-600">Text/Call available</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#A8C3A0] rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#4B6043] mb-1">Email</h3>
                    <p className="text-[#2E2E2E]">bodyworkworld@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#A8C3A0] rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#4B6043] mb-1">Service Areas</h3>
                    <p className="text-[#2E2E2E]">
                      Manhattan, Long Island, Queens, Tampa, Orlando, and Fort Lauderdale
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="mt-8 h-64 bg-[#F2E8D5] rounded-xl flex items-center justify-center">
                <p className="text-[#4B6043] font-semibold">Google Maps Embed Here</p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0] transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0] transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-2">
                    Message
                  </label>
                  <textarea
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0] transition-all resize-none"
                    placeholder="Your message..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#4B6043] text-white py-4 rounded-lg font-semibold hover:bg-[#3a4a34] transition-colors duration-300"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#F2E8D5] py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-bold text-[#4B6043] mb-4">BODYWORKWORLDNY</h3>
              <p className="text-[#2E2E2E]">
                Professional bodywork and spa services for your wellness journey.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-[#4B6043] mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {['Home', 'Services', 'Forms', 'Gallery', 'Shop', 'Contact'].map((link) => (
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
              <h4 className="text-lg font-semibold text-[#4B6043] mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {['facebook', 'instagram', 'twitter'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 bg-[#A8C3A0] rounded-full flex items-center justify-center hover:bg-[#4B6043] transition-colors duration-300"
                    aria-label={`Follow us on ${social}`}
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-[#A8C3A0] pt-8 text-center">
            <p className="text-[#2E2E2E]">
              &copy; {new Date().getFullYear()} BODYWORKWORLDNY. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-12 h-12 bg-[#4B6043] text-white rounded-full shadow-lg hover:bg-[#3a4a34] transition-colors duration-300 flex items-center justify-center z-40"
            aria-label="Scroll to top"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Booking Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#4B6043]">Book Appointment</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0]"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0]"
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0]"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-2">
                    Select Service(s) *
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0]"
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    required
                  >
                    <option value="">Choose a service...</option>
                    {services.map((service) => (
                      <option key={service.title} value={service.title}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#4B6043] mb-2">
                      Appointment Date *
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#4B6043] mb-2">
                      Preferred Time *
                    </label>
                    <input
                      type="time"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-2">
                    Upload Pre-Appointment Form (Optional)
                  </label>
                  <input
                    type="file"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0]"
                    accept=".pdf,.doc,.docx"
                  />
                </div>

                <div className="bg-[#F2E8D5] p-4 rounded-lg">
                  <p className="text-sm text-[#2E2E2E]">
                    <strong>Note:</strong> A $100 deposit is required to secure your appointment. 
                    Please leave your deposit via Venmo at <span className="text-[#4B6043] font-semibold">@bodyworkworldny</span>
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#4B6043] text-white py-4 rounded-lg font-semibold hover:bg-[#3a4a34] transition-colors duration-300"
                >
                  Submit & Leave Deposit
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;