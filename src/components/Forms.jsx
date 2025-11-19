// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { clientForms } from "../data/constants";

function Forms({ onDownloadForm }) {
  return (
    <section id="forms" className="py-16 sm:py-20 lg:py-24 bg-[#F2E8D5]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#00897B] mb-4 font-heading">
            Client Forms
          </h2>
          <p className="text-base sm:text-lg text-[#2E2E2E] max-w-2xl mx-auto mb-8">
            Please fill out the required form(s) before your appointment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {clientForms.map((form, index) => (
            <motion.div
              key={form}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-[#26A69A] rounded-full mb-4 mx-auto">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#00897B] text-center mb-4 font-heading">
                {form}
              </h3>
              <button
                onClick={() => onDownloadForm(form)}
                className="w-full bg-[#FF6B35] text-white py-2 rounded-lg hover:bg-[#FFA726] transition-colors duration-300"
              >
                {form === "New Client Intake Form" ||
                form === "Bodywork Form" ||
                form === "Microdermabrasion Client Consent Form" ||
                form === "Waxing Consent Form"
                  ? "Fill Out Online"
                  : "Download PDF"}
              </button>
              {(form === "New Client Intake Form" ||
                form === "Bodywork Form" ||
                form === "Microdermabrasion Client Consent Form" ||
                form === "Waxing Consent Form") && (
                <p className="text-xs text-gray-600 text-center mt-2">
                  Fill online or print to complete
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Forms;
