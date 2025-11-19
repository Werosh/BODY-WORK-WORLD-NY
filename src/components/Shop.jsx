// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { shopItems } from "../data/constants";

function Shop({ onAddToCart }) {
  return (
    <section id="shop" className="py-16 sm:py-20 lg:py-24 bg-[#F2E8D5]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#00897B] mb-4 font-heading">
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
                    backgroundColor: "#F2E8D5",
                  }}
                />
                <div className="absolute top-4 right-4 bg-[#26A69A] text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {item.price}
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-xl font-semibold text-[#00897B] mb-3 font-heading">
                  {item.name}
                </h3>
                <button
                  onClick={() => onAddToCart(item)}
                  className="w-full bg-[#FF6B35] text-white py-2 rounded-lg hover:bg-[#FFA726] transition-colors duration-300 font-medium"
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="inline-block bg-[#26A69A] text-white px-6 py-3 rounded-full text-lg font-semibold">
            More Products Coming Soon!
          </p>
        </div>
      </div>
    </section>
  );
}

export default Shop;
