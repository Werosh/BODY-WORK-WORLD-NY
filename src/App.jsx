import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import emailjs from "@emailjs/browser";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Forms from "./components/Forms";
import Gallery from "./components/Gallery";
import Shop from "./components/Shop";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BookingModal from "./components/BookingModal";
import IntakeForm from "./components/IntakeForm";
import ScrollToTop from "./components/ScrollToTop";
import { navItems } from "./data/constants";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isIntakeFormOpen, setIsIntakeFormOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [bookingData, setBookingData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    time: "",
    file: null,
  });

  // Initialize EmailJS
  useEffect(() => {
    // Initialize EmailJS with public key
    // Replace with your actual EmailJS public key from dashboard
    const emailjsPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY";
    if (emailjsPublicKey !== "YOUR_PUBLIC_KEY") {
      emailjs.init(emailjsPublicKey);
    }
  }, []);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      // Update active section based on scroll position
      for (const section of navItems) {
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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openBookingModal = (service = "") => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService("");
    setBookingData({
      name: "",
      phone: "",
      email: "",
      service: "",
      date: "",
      time: "",
      file: null,
    });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // In production, you would send this to a backend service
    // For now, we'll show an alert and log the data
    console.log("Contact form submitted:", formData);
    alert("Thank you for your message! We will get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // In production, you would send this to a backend service
    // For now, we'll show an alert and log the data
    console.log("Booking form submitted:", bookingData);
    alert(
      "Thank you for your booking request! Please leave your $100 deposit via Venmo at @bodyworkworldny. We will confirm your appointment shortly."
    );
    closeModal();
  };

  const handleDownloadForm = (formName) => {
    // If it's the intake form, open the interactive form
    if (formName === "New Client Intake Form") {
      setIsIntakeFormOpen(true);
    } else {
      // For other forms, download PDF (placeholder)
      alert(
        `Downloading ${formName}...\n\nIn production, this would download a PDF file.`
      );
    }
  };

  const closeIntakeForm = () => {
    setIsIntakeFormOpen(false);
  };

  const handleAddToCart = (item) => {
    setCart([...cart, item]);
    alert(`${item.name} added to cart!`);
  };

  const handleContactInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBookingInputChange = (e) => {
    const { name, value, files } = e.target;
    setBookingData({
      ...bookingData,
      [name]: files ? files[0] : value,
    });
  };

  // Dynamic meta tags based on active section
  const getMetaTags = () => {
    const baseUrl = "https://bodyworkworld.com";
    const baseTitle = "BODY WORK WORLD NY - Professional Spa & Bodywork Services";
    
    const metaConfig = {
      home: {
        title: `${baseTitle} | NY & FL | Top Rated Spa`,
        description: "Professional bodywork, massage therapy, facials, waxing, microdermabrasion, and HydraFacial treatments in Manhattan, Long Island, Queens, Tampa, Orlando, and Fort Lauderdale. Book your appointment today!",
        keywords: "spa, bodywork, massage, massage therapy, spa treatment, Manhattan NY, Long Island NY, Queens NY, Tampa FL, Orlando FL, Fort Lauderdale FL, best spa near me",
        url: baseUrl,
      },
      services: {
        title: `Spa Services - Bodywork, Facials, Waxing | ${baseTitle}`,
        description: "Professional spa services including bodywork, massage therapy, facials, waxing, microdermabrasion, and HydraFacial treatments. Licensed therapists in NY & FL.",
        keywords: "spa services, bodywork, massage therapy, facials, waxing, microdermabrasion, hydrafacial, back facials, therapeutic massage, spa treatments, NY spa services, FL spa services",
        url: `${baseUrl}/#services`,
      },
      forms: {
        title: `Client Forms - Intake & Health History | ${baseTitle}`,
        description: "Download client intake forms, health history forms, and consent forms for your spa appointment at BODY WORK WORLD NY.",
        keywords: "spa forms, client intake form, health history form, consent form, spa appointment forms",
        url: `${baseUrl}/#forms`,
      },
      gallery: {
        title: `Spa Gallery - Treatment Photos | ${baseTitle}`,
        description: "View our spa gallery showcasing professional bodywork, facial treatments, and relaxing spa environment at BODY WORK WORLD NY.",
        keywords: "spa gallery, spa photos, treatment photos, bodywork photos, facial treatment photos, spa environment",
        url: `${baseUrl}/#gallery`,
      },
      shop: {
        title: `Spa Products & Gift Sets | ${baseTitle}`,
        description: "Shop luxury spa products, relaxation oils, gift sets, candles, and face creams from BODY WORK WORLD NY. Perfect for self-care and gifts.",
        keywords: "spa products, relaxation oil, spa gift sets, luxury candles, face cream, spa gifts, wellness products",
        url: `${baseUrl}/#shop`,
      },
      contact: {
        title: `Contact Us - Book Appointment | ${baseTitle}`,
        description: "Contact BODY WORK WORLD NY to book your spa appointment. Serving Manhattan, Long Island, Queens, Tampa, Orlando, and Fort Lauderdale. Call (631) 352-8453.",
        keywords: "contact spa, book spa appointment, spa booking, spa phone number, spa email, spa location, Manhattan spa, Long Island spa, Queens spa, Tampa spa, Orlando spa, Fort Lauderdale spa",
        url: `${baseUrl}/#contact`,
      },
    };

    return metaConfig[activeSection] || metaConfig.home;
  };

  const currentMeta = getMetaTags();

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{currentMeta.title}</title>
        <meta name="description" content={currentMeta.description} />
        <meta name="keywords" content={currentMeta.keywords} />
        <link rel="canonical" href={currentMeta.url} />
        
        {/* Open Graph */}
        <meta property="og:title" content={currentMeta.title} />
        <meta property="og:description" content={currentMeta.description} />
        <meta property="og:url" content={currentMeta.url} />
        
        {/* Twitter */}
        <meta property="twitter:title" content={currentMeta.title} />
        <meta property="twitter:description" content={currentMeta.description} />
      </Helmet>

      <Header
        activeSection={activeSection}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        scrollToSection={scrollToSection}
      />

      <Hero scrollToSection={scrollToSection} />

      <Services onBookService={openBookingModal} />

      <Forms onDownloadForm={handleDownloadForm} />

      <Gallery />

      <Shop onAddToCart={handleAddToCart} />

      <Contact
        formData={formData}
        onInputChange={handleContactInputChange}
        onSubmit={handleContactSubmit}
      />

      <Footer scrollToSection={scrollToSection} />

      <ScrollToTop show={showScrollTop} onClick={scrollToTop} />

      <BookingModal
        isOpen={isModalOpen}
        onClose={closeModal}
        bookingData={bookingData}
        selectedService={selectedService}
        onInputChange={handleBookingInputChange}
        onSubmit={handleBookingSubmit}
        onServiceChange={setSelectedService}
      />

      {isIntakeFormOpen && <IntakeForm onClose={closeIntakeForm} />}
    </div>
  );
}

export default App;
