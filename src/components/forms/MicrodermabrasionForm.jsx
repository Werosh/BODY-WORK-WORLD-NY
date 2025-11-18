import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function MicrodermabrasionForm({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    address: "",
    zip: "",
    email: "",
    phone: "",
    howDidYouHear: "",
    ageGroup: "",
    acknowledgments: {
      scratchyStinging: false,
      acneTemporaryWorse: false,
      sunscreenSusceptibility: false,
      accutaneRetinA: false,
      telangiectasias: false,
      removeContactLenses: false,
      coldSores: false,
      disinfectedTools: false,
      temporaryTightness: false,
      noAnesthesia: false,
      initialTreatmentImprovement: false,
    },
    signature: "",
    signatureDate: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [showPrintView, setShowPrintView] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === "checkbox" ? checked : value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      // Format form data for email
      const emailData = {
        to_name: "BODY WORK WORLD NY",
        from_name: formData.name,
        from_email: formData.email,
        message: formatFormDataForEmail(),
      };

      // Send email via EmailJS
      const serviceId =
        import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID";
      const templateId =
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID";
      const publicKey =
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY";

      await emailjs.send(serviceId, templateId, emailData, publicKey);

      setSubmitMessage(
        "Form submitted successfully! We will contact you soon."
      );
      setTimeout(() => {
        if (onClose) onClose();
      }, 2000);
    } catch (error) {
      console.error("EmailJS error:", error);
      setSubmitMessage(
        "Error submitting form. Please try again or contact us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatFormDataForEmail = () => {
    let emailContent = "MICRODERMABRASION CLIENT CONSENT FORM\n\n";
    emailContent += "=== PERSONAL INFORMATION ===\n";
    emailContent += `Name: ${formData.name}\n`;
    emailContent += `Date: ${formData.date}\n`;
    emailContent += `Address: ${formData.address}\n`;
    emailContent += `Zip: ${formData.zip}\n`;
    emailContent += `Email: ${formData.email}\n`;
    emailContent += `Phone: ${formData.phone}\n`;
    emailContent += `How did you hear about us: ${formData.howDidYouHear}\n`;
    emailContent += `Age Group: ${formData.ageGroup}\n\n`;

    emailContent += "=== ACKNOWLEDGMENTS ===\n";
    const acknowledgmentLabels = {
      scratchyStinging:
        "I acknowledge that I might experience a scratchy, stinging sensation during the treatment. This sensation will fade during the post-treatment protocols.",
      acneTemporaryWorse:
        "I acknowledge that if I suffer from acne, the condition may temporarily look worse after the treatment, but will improve after additional microdermabrasion treatments.",
      sunscreenSusceptibility:
        "I acknowledge that if I fail to use sunscreen, I am more susceptible to sunburn and hyperpigmentation. Exercise should be limited after the treatment for 24 hours.",
      accutaneRetinA:
        "I acknowledge that I have not been on Accutane for acne therapy during that past six months. I acknowledge that I have not been using Retin-A for the past two weeks. I will discontinue the use of Retin-A for 1-3 days after therapy.",
      telangiectasias:
        "I acknowledge that sometimes facial telangiectasias (small blood vessels) is more apparent immediately after the treatment when the skin is thin and will diminish after re-epithelialization (build up of dead cells).",
      removeContactLenses:
        "I acknowledge that I will remove my contact lenses prior to the procedure.",
      coldSores:
        "I acknowledge that if I am prone to cold sores (herpes) around the mouth or facial area, I may need a prescription for Zovirax from my medical doctor prior to having the treatment and avoid all treatments during breakouts.",
      disinfectedTools:
        "I acknowledge that my esthetician uses tools that are disinfected or disposable.",
      temporaryTightness:
        "I acknowledge that my skin may experience temporary tightness, redness, or slight swelling which disappears in a few hours depending on my skins' sensitivity.",
      noAnesthesia:
        "I acknowledge that the treatment does not require topical anesthesia.",
      initialTreatmentImprovement:
        "I acknowledge that the initial treatment will show improvement, which will increase after successive treatments.",
    };

    Object.entries(formData.acknowledgments).forEach(([key, value]) => {
      emailContent += `${value ? "✓" : "✗"} ${acknowledgmentLabels[key]}\n`;
    });

    emailContent += "\n=== AGREEMENT ===\n";
    emailContent += `${formData.name}, hereby agree to have the Microdermabrasion treatment performed on my skin and to follow all post-treatment protocols provided by my esthetician.\n\n`;
    emailContent += `Signature: ${formData.signature}\n`;
    emailContent += `Date: ${formData.signatureDate}\n`;

    return emailContent;
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text("MICRODERMABRASION CLIENT CONSENT FORM", 105, 20, {
      align: "center",
    });

    let yPos = 30;

    // Personal Information Section
    doc.setFontSize(14);
    doc.text("Personal Information", 14, yPos);
    yPos += 10;

    const personalInfo = [
      ["Name:", formData.name || ""],
      ["Date:", formData.date || ""],
      ["Address:", formData.address || ""],
      ["Zip:", formData.zip || ""],
      ["Email:", formData.email || ""],
      ["Phone:", formData.phone || ""],
      ["How did you hear about us:", formData.howDidYouHear || ""],
      ["Age Group:", formData.ageGroup || ""],
    ];

    autoTable(doc, {
      startY: yPos,
      head: [["Field", "Value"]],
      body: personalInfo,
      theme: "grid",
      headStyles: { fillColor: [75, 96, 67] },
      styles: { fontSize: 10 },
      columnStyles: { 0: { cellWidth: 60 }, 1: { cellWidth: 120 } },
    });

    yPos = doc.lastAutoTable.finalY + 15;
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }

    // Introductory Text
    doc.setFontSize(12);
    doc.text("About Microdermabrasion:", 14, yPos);
    yPos += 8;

    const introText =
      "Microdermabrasion is a safe and highly effective, clinically proven technique for precise exfoliation of the skin while simultaneously delivering a topical formula to target a specific dermatological condition. Exfoliation promotes the reduction of fine lines, wrinkles, minimizes scars, acne, stretch marks and sun damage. It also regenerates the epidermal cell structure resulting in skin elasticity and a more youthful, pliable, smooth skin. Topical formulas penetrate the skin to treat specific conditions such as acne, hyperpigmentation, photo damage, dehydration and fine line wrinkles. The microdermabrasion treatment performed with your estheticians recommended pre and post treatment skin care regimen promotes optimal outcomes.";

    const splitText = doc.splitTextToSize(introText, 180);
    doc.setFontSize(10);
    doc.text(splitText, 14, yPos);
    yPos += splitText.length * 5 + 10;

    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }

    // Acknowledgments Section
    doc.setFontSize(14);
    doc.text("Acknowledgments", 14, yPos);
    yPos += 10;

    const acknowledgmentLabels = {
      scratchyStinging:
        "I acknowledge that I might experience a scratchy, stinging sensation during the treatment. This sensation will fade during the post-treatment protocols.",
      acneTemporaryWorse:
        "I acknowledge that if I suffer from acne, the condition may temporarily look worse after the treatment, but will improve after additional microdermabrasion treatments.",
      sunscreenSusceptibility:
        "I acknowledge that if I fail to use sunscreen, I am more susceptible to sunburn and hyperpigmentation. Exercise should be limited after the treatment for 24 hours.",
      accutaneRetinA:
        "I acknowledge that I have not been on Accutane for acne therapy during that past six months. I acknowledge that I have not been using Retin-A for the past two weeks. I will discontinue the use of Retin-A for 1-3 days after therapy.",
      telangiectasias:
        "I acknowledge that sometimes facial telangiectasias (small blood vessels) is more apparent immediately after the treatment when the skin is thin and will diminish after re-epithelialization (build up of dead cells).",
      removeContactLenses:
        "I acknowledge that I will remove my contact lenses prior to the procedure.",
      coldSores:
        "I acknowledge that if I am prone to cold sores (herpes) around the mouth or facial area, I may need a prescription for Zovirax from my medical doctor prior to having the treatment and avoid all treatments during breakouts.",
      disinfectedTools:
        "I acknowledge that my esthetician uses tools that are disinfected or disposable.",
      temporaryTightness:
        "I acknowledge that my skin may experience temporary tightness, redness, or slight swelling which disappears in a few hours depending on my skins' sensitivity.",
      noAnesthesia:
        "I acknowledge that the treatment does not require topical anesthesia.",
      initialTreatmentImprovement:
        "I acknowledge that the initial treatment will show improvement, which will increase after successive treatments.",
    };

    const acknowledgmentData = Object.entries(formData.acknowledgments).map(
      ([key, value]) => [value ? "✓" : "✗", acknowledgmentLabels[key]]
    );

    autoTable(doc, {
      startY: yPos,
      head: [["", "Acknowledgment"]],
      body: acknowledgmentData,
      theme: "grid",
      headStyles: { fillColor: [75, 96, 67] },
      styles: { fontSize: 9 },
      columnStyles: { 0: { cellWidth: 15 }, 1: { cellWidth: 165 } },
    });

    yPos = doc.lastAutoTable.finalY + 15;
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }

    // Agreement Section
    doc.setFontSize(14);
    doc.text("Agreement", 14, yPos);
    yPos += 10;

    const agreementText = `${
      formData.name || "[Name]"
    }, hereby agree to have the Microdermabrasion treatment performed on my skin and to follow all post-treatment protocols provided by my esthetician.`;

    const splitAgreement = doc.splitTextToSize(agreementText, 180);
    doc.setFontSize(10);
    doc.text(splitAgreement, 14, yPos);
    yPos += splitAgreement.length * 5 + 10;

    const signatureInfo = [
      ["Signature:", formData.signature || ""],
      ["Date:", formData.signatureDate || ""],
    ];

    autoTable(doc, {
      startY: yPos,
      head: [["Field", "Value"]],
      body: signatureInfo,
      theme: "grid",
      headStyles: { fillColor: [75, 96, 67] },
      styles: { fontSize: 10 },
      columnStyles: { 0: { cellWidth: 60 }, 1: { cellWidth: 120 } },
    });

    return doc;
  };

  const handleDownloadPDF = () => {
    const doc = generatePDF();
    const fileName = `MicrodermabrasionForm_${formData.name}_${
      new Date().toISOString().split("T")[0]
    }.pdf`;
    doc.save(fileName);
  };

  const handleViewPDF = () => {
    const doc = generatePDF();
    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, "_blank");
  };

  const handlePrint = () => {
    setShowPrintView(true);
    setTimeout(() => {
      window.print();
      setShowPrintView(false);
    }, 100);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-xl shadow-2xl max-w-4xl w-full my-8 relative"
      >
        <div className="sticky top-0 bg-[#4B6043] text-white p-4 rounded-t-xl flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold font-heading">
            MICRODERMABRASION CLIENT CONSENT FORM
          </h2>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={handleDownloadPDF}
              className="px-4 py-2 bg-[#A8C3A0] hover:bg-[#8fb085] rounded-lg transition-colors text-sm font-semibold"
            >
              Download PDF
            </button>
            <button
              onClick={handleViewPDF}
              className="px-4 py-2 bg-[#A8C3A0] hover:bg-[#8fb085] rounded-lg transition-colors text-sm font-semibold"
            >
              View PDF
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-[#A8C3A0] hover:bg-[#8fb085] rounded-lg transition-colors text-sm font-semibold"
            >
              Print
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors text-sm font-semibold"
              >
                Close
              </button>
            )}
          </div>
        </div>

        <div className={`p-6 ${showPrintView ? "print-view" : ""}`}>
          <form
            onSubmit={handleSubmit}
            className="space-y-8 md:mt-[900px] mt-[2100px]"
          >
            {/* Personal Information Section */}
            <section className="border-b-2 border-[#A8C3A0] pb-6">
              <h3 className="text-xl font-bold text-[#4B6043] mb-4 font-heading">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-1">
                    Zip
                  </label>
                  <input
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0]"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-[#4B6043] mb-1">
                    How did you hear about us?
                  </label>
                  <input
                    type="text"
                    name="howDidYouHear"
                    value={formData.howDidYouHear}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-1">
                    Age Group
                  </label>
                  <select
                    name="ageGroup"
                    value={formData.ageGroup}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0]"
                  >
                    <option value="">Select...</option>
                    <option value="20-30">20-30</option>
                    <option value="30-40">30-40</option>
                    <option value="40-50">40-50</option>
                    <option value="50-60">50-60</option>
                    <option value="60+">60+</option>
                  </select>
                </div>
              </div>
            </section>

            {/* About Microdermabrasion Section */}
            <section className="border-b-2 border-[#A8C3A0] pb-6">
              <h3 className="text-xl font-bold text-[#4B6043] mb-4 font-heading">
                About Microdermabrasion
              </h3>
              <p className="text-sm text-[#2E2E2E] leading-relaxed">
                Microdermabrasion is a safe and highly effective, clinically
                proven technique for precise exfoliation of the skin while
                simultaneously delivering a topical formula to target a specific
                dermatological condition. Exfoliation promotes the reduction of
                fine lines, wrinkles, minimizes scars, acne, stretch marks and
                sun damage. It also regenerates the epidermal cell structure
                resulting in skin elasticity and a more youthful, pliable,
                smooth skin. Topical formulas penetrate the skin to treat
                specific conditions such as acne, hyperpigmentation, photo
                damage, dehydration and fine line wrinkles. The
                microdermabrasion treatment performed with your estheticians
                recommended pre and post treatment skin care regimen promotes
                optimal outcomes.
              </p>
            </section>

            {/* Acknowledgments Section */}
            <section className="border-b-2 border-[#A8C3A0] pb-6">
              <h3 className="text-xl font-bold text-[#4B6043] mb-4 font-heading">
                Please check off the following:
              </h3>
              <div className="space-y-4">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    name="acknowledgments.scratchyStinging"
                    checked={formData.acknowledgments.scratchyStinging}
                    onChange={handleInputChange}
                    className="mt-1 mr-3"
                  />
                  <span className="text-sm text-[#2E2E2E]">
                    I acknowledge that I might experience a scratchy, stinging
                    sensation during the treatment. This sensation will fade
                    during the post-treatment protocols.
                  </span>
                </label>

                <label className="flex items-start">
                  <input
                    type="checkbox"
                    name="acknowledgments.acneTemporaryWorse"
                    checked={formData.acknowledgments.acneTemporaryWorse}
                    onChange={handleInputChange}
                    className="mt-1 mr-3"
                  />
                  <span className="text-sm text-[#2E2E2E]">
                    I acknowledge that if I suffer from acne, the condition may
                    temporarily look worse after the treatment, but will improve
                    after additional microdermabrasion treatments.
                  </span>
                </label>

                <label className="flex items-start">
                  <input
                    type="checkbox"
                    name="acknowledgments.sunscreenSusceptibility"
                    checked={formData.acknowledgments.sunscreenSusceptibility}
                    onChange={handleInputChange}
                    className="mt-1 mr-3"
                  />
                  <span className="text-sm text-[#2E2E2E]">
                    I acknowledge that if I fail to use sunscreen, I am more
                    susceptible to sunburn and hyperpigmentation. Exercise
                    should be limited after the treatment for 24 hours.
                  </span>
                </label>

                <label className="flex items-start">
                  <input
                    type="checkbox"
                    name="acknowledgments.accutaneRetinA"
                    checked={formData.acknowledgments.accutaneRetinA}
                    onChange={handleInputChange}
                    className="mt-1 mr-3"
                  />
                  <span className="text-sm text-[#2E2E2E]">
                    I acknowledge that I have not been on Accutane for acne
                    therapy during that past six months. I acknowledge that I
                    have not been using Retin-A for the past two weeks. I will
                    discontinue the use of Retin-A for 1-3 days after therapy.
                  </span>
                </label>

                <label className="flex items-start">
                  <input
                    type="checkbox"
                    name="acknowledgments.telangiectasias"
                    checked={formData.acknowledgments.telangiectasias}
                    onChange={handleInputChange}
                    className="mt-1 mr-3"
                  />
                  <span className="text-sm text-[#2E2E2E]">
                    I acknowledge that sometimes facial telangiectasias (small
                    blood vessels) is more apparent immediately after the
                    treatment when the skin is thin and will diminish after
                    re-epithelialization (build up of dead cells).
                  </span>
                </label>

                <label className="flex items-start">
                  <input
                    type="checkbox"
                    name="acknowledgments.removeContactLenses"
                    checked={formData.acknowledgments.removeContactLenses}
                    onChange={handleInputChange}
                    className="mt-1 mr-3"
                  />
                  <span className="text-sm text-[#2E2E2E]">
                    I acknowledge that I will remove my contact lenses prior to
                    the procedure.
                  </span>
                </label>

                <label className="flex items-start">
                  <input
                    type="checkbox"
                    name="acknowledgments.coldSores"
                    checked={formData.acknowledgments.coldSores}
                    onChange={handleInputChange}
                    className="mt-1 mr-3"
                  />
                  <span className="text-sm text-[#2E2E2E]">
                    I acknowledge that if I am prone to cold sores (herpes)
                    around the mouth or facial area, I may need a prescription
                    for Zovirax from my medical doctor prior to having the
                    treatment and avoid all treatments during breakouts.
                  </span>
                </label>

                <label className="flex items-start">
                  <input
                    type="checkbox"
                    name="acknowledgments.disinfecteTools"
                    checked={formData.acknowledgments.disinfecteTools}
                    onChange={handleInputChange}
                    className="mt-1 mr-3"
                  />
                  <span className="text-sm text-[#2E2E2E]">
                    I acknowledge that my esthetician uses tools that are
                    disinfected or disposable.
                  </span>
                </label>

                <label className="flex items-start">
                  <input
                    type="checkbox"
                    name="acknowledgments.temporaryTightness"
                    checked={formData.acknowledgments.temporaryTightness}
                    onChange={handleInputChange}
                    className="mt-1 mr-3"
                  />
                  <span className="text-sm text-[#2E2E2E]">
                    I acknowledge that my skin may experience temporary
                    tightness, redness, or slight swelling which disappears in a
                    few hours depending on my skins' sensitivity.
                  </span>
                </label>

                <label className="flex items-start">
                  <input
                    type="checkbox"
                    name="acknowledgments.noAnesthesia"
                    checked={formData.acknowledgments.noAnesthesia}
                    onChange={handleInputChange}
                    className="mt-1 mr-3"
                  />
                  <span className="text-sm text-[#2E2E2E]">
                    I acknowledge that the treatment does not require topical
                    anesthesia.
                  </span>
                </label>

                <label className="flex items-start">
                  <input
                    type="checkbox"
                    name="acknowledgments.initialTreatmentImprovement"
                    checked={
                      formData.acknowledgments.initialTreatmentImprovement
                    }
                    onChange={handleInputChange}
                    className="mt-1 mr-3"
                  />
                  <span className="text-sm text-[#2E2E2E]">
                    I acknowledge that the initial treatment will show
                    improvement, which will increase after successive
                    treatments.
                  </span>
                </label>
              </div>
            </section>

            {/* Agreement and Signature Section */}
            <section className="border-b-2 border-[#A8C3A0] pb-6">
              <h3 className="text-xl font-bold text-[#4B6043] mb-4 font-heading">
                Agreement
              </h3>
              <p className="text-sm text-[#2E2E2E] mb-4">
                <span className="font-semibold">
                  {formData.name || "[Name]"}
                </span>
                , hereby agree to have the Microdermabrasion treatment performed
                on my skin and to follow all post-treatment protocols provided
                by my esthetician.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-1">
                    SIGNATURE *
                  </label>
                  <input
                    type="text"
                    name="signature"
                    value={formData.signature}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-1">
                    DATE *
                  </label>
                  <input
                    type="date"
                    name="signatureDate"
                    value={formData.signatureDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0]"
                    required
                  />
                </div>
              </div>
            </section>

            {/* Submit Button */}
            <div className="flex flex-col items-center gap-4 pt-4">
              {submitMessage && (
                <div
                  className={`w-full p-4 rounded-lg ${
                    submitMessage.includes("Error")
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {submitMessage}
                </div>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto px-8 py-3 bg-[#4B6043] text-white rounded-lg font-semibold hover:bg-[#3a4a34] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit Form"}
              </button>
            </div>
          </form>
        </div>
      </motion.div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-view,
          .print-view * {
            visibility: visible;
          }
          .print-view {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          button {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default MicrodermabrasionForm;
