// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { services } from "../data/constants";

function Services({ onBookService }) {
  return (
    <section id="services" className="py-16 sm:py-20 lg:py-24 bg-[#FAFAF8]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4B6043] mb-4 font-heading">
            Our Services
          </h2>
          <p className="text-base sm:text-lg text-[#2E2E2E] max-w-2xl mx-auto">
            Experience our range of professional treatments designed to
            rejuvenate your body and mind
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
                    backgroundColor: "#F2E8D5",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white font-heading">
                    {service.title}
                  </h3>
                </div>
              </div>

              <div className="p-6">
                <p className="text-[#2E2E2E] mb-6 line-clamp-3">
                  {service.description}
                </p>
                <button
                  onClick={() => onBookService(service.title)}
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
  );
}

export default Services;
