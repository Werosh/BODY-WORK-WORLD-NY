import { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Forms from "./components/Forms";
import Gallery from "./components/Gallery";
import Shop from "./components/Shop";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BookingModal from "./components/BookingModal";
import ScrollToTop from "./components/ScrollToTop";
import { navItems } from "./data/constants";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    // In production, this would download an actual PDF
    // For now, we'll show an alert
    alert(
      `Downloading ${formName}...\n\nIn production, this would download a PDF file.`
    );
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

  return (
    <div className="min-h-screen">
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
    </div>
  );
}

export default App;
