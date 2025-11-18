import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function WaxingForm({ onClose }) {
  const [formData, setFormData] = useState({
    // Questionnaire
    accutanePast12Months: "",
    accutaneLastDose: "",
    pregnantDiabeticCancer: "",
    exfoliatingTreatments: "",
    acneMedications: "",
    acneMedicationsDetails: "",
    antibioticsBirthControl: "",
    antibioticsDetails: "",
    chronicConditions: "",
    chronicConditionsDetails: "",
    allergies: "",
    allergiesDetails: "",
    tanningBedSunExposure: "",
    skinConditions: "",
    skinConditionsDetails: "",
    menstruating: "",

    // Signature
    signature: "",
    printedName: "",
    date: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [showPrintView, setShowPrintView] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const emailData = {
        to_name: "BODY WORK WORLD NY",
        from_name: formData.printedName || "Client",
        from_email: "form@bodyworkworld.com",
        message: formatFormDataForEmail(),
      };

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
    let emailContent = "AUTHORIZATION AND CONSENT FOR WAXING\n\n";
    emailContent += "=== QUESTIONNAIRE ===\n";
    emailContent += `1. Accutane (past 12 months): ${formData.accutanePast12Months}`;
    if (formData.accutanePast12Months === "yes" && formData.accutaneLastDose) {
      emailContent += ` - Last dose: ${formData.accutaneLastDose}`;
    }
    emailContent += `\n`;
    emailContent += `2. Pregnant, diabetic, or cancer treatment: ${formData.pregnantDiabeticCancer}\n`;
    emailContent += `3. Exfoliating treatments or chemical peels: ${formData.exfoliatingTreatments}\n`;
    emailContent += `4. Acne medications (Retin-A, etc.): ${formData.acneMedications}`;
    if (formData.acneMedications === "yes" && formData.acneMedicationsDetails) {
      emailContent += ` - ${formData.acneMedicationsDetails}`;
    }
    emailContent += `\n`;
    emailContent += `5. Antibiotics, birth control, or hormone replacements: ${formData.antibioticsBirthControl}`;
    if (
      formData.antibioticsBirthControl === "yes" &&
      formData.antibioticsDetails
    ) {
      emailContent += ` - ${formData.antibioticsDetails}`;
    }
    emailContent += `\n`;
    emailContent += `6. AIDS, Lupus, or chronic conditions: ${formData.chronicConditions}`;
    if (
      formData.chronicConditions === "yes" &&
      formData.chronicConditionsDetails
    ) {
      emailContent += ` - ${formData.chronicConditionsDetails}`;
    }
    emailContent += `\n`;
    emailContent += `7. Allergies (wax, latex, etc.): ${formData.allergies}`;
    if (formData.allergies === "yes" && formData.allergiesDetails) {
      emailContent += ` - ${formData.allergiesDetails}`;
    }
    emailContent += `\n`;
    emailContent += `8. Tanning bed or sun exposure (past 24 hours): ${formData.tanningBedSunExposure}\n`;
    emailContent += `9. Rosacea, eczema, psoriasis, skin sensitivities: ${formData.skinConditions}`;
    if (formData.skinConditions === "yes" && formData.skinConditionsDetails) {
      emailContent += ` - ${formData.skinConditionsDetails}`;
    }
    emailContent += `\n`;
    emailContent += `10. Menstruating or about to begin: ${formData.menstruating}\n\n`;

    emailContent += "=== SIGNATURE ===\n";
    emailContent += `Signature: ${formData.signature}\n`;
    emailContent += `Printed Name: ${formData.printedName}\n`;
    emailContent += `Date: ${formData.date}\n`;

    return emailContent;
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("AUTHORIZATION AND CONSENT FOR WAXING", 105, 20, {
      align: "center",
    });

    doc.setFontSize(12);
    doc.text("Please read and complete this form carefully.", 105, 30, {
      align: "center",
    });

    let yPos = 40;

    // To the client section
    doc.setFontSize(11);
    const clientText =
      "To the client: You have the right to be informed about the procedure(s) to be administered, including benefits, risks, and potential side-effects, so that you can decide whether to proceed. You are encouraged to ask any questions you may have and to consult with a healthcare provider if you have additional questions.";
    const splitClientText = doc.splitTextToSize(clientText, 180);
    doc.text(splitClientText, 14, yPos);
    yPos += splitClientText.length * 5 + 10;

    // Questionnaire section
    doc.setFontSize(14);
    doc.text("Questionnaire:", 14, yPos);
    yPos += 8;

    doc.setFontSize(10);
    const questionnaireIntro =
      "By signing this authorization form, you declare that the answers given herein are true and complete to the best of your knowledge. False or misleading answers can lead to complications and/or undesirable results. Please indicate your answer by checking one box per question and provide detail where appropriate.";
    const splitIntro = doc.splitTextToSize(questionnaireIntro, 180);
    doc.text(splitIntro, 14, yPos);
    yPos += splitIntro.length * 5 + 10;

    // Questions
    const questions = [
      {
        num: 1,
        text: "Have you taken Accutane within the past 12 months?",
        answer: formData.accutanePast12Months,
        details: formData.accutaneLastDose
          ? `Last dose: ${formData.accutaneLastDose}`
          : "",
      },
      {
        num: 2,
        text: "Are you pregnant, diabetic, or receiving cancer treatment?",
        answer: formData.pregnantDiabeticCancer,
        details: "",
      },
      {
        num: 3,
        text: "Have you recently received any exfoliating treatments or chemical peels?",
        answer: formData.exfoliatingTreatments,
        details: "",
      },
      {
        num: 4,
        text: "Are you using acne medications (Retin-A, Differin, Tazorac, Atralin, or other retinoids)?",
        answer: formData.acneMedications,
        details: formData.acneMedicationsDetails || "",
      },
      {
        num: 5,
        text: "Are you taking antibiotics, birth control, or hormone replacements?",
        answer: formData.antibioticsBirthControl,
        details: formData.antibioticsDetails || "",
      },
      {
        num: 6,
        text: "Do you have AIDS, Lupus, or other chronic condition(s) that may compromise the skin barrier?",
        answer: formData.chronicConditions,
        details: formData.chronicConditionsDetails || "",
      },
      {
        num: 7,
        text: "Do you have any allergies including allergies to wax or latex?",
        answer: formData.allergies,
        details: formData.allergiesDetails || "",
      },
      {
        num: 8,
        text: "Have you used a tanning bed or experienced prolonged sun exposure within the past 24 hours?",
        answer: formData.tanningBedSunExposure,
        details: "",
      },
      {
        num: 9,
        text: "Do you have rosacea, eczema, psoriasis, cracked or open skin, severe varicose veins, or any skin sensitivities?",
        answer: formData.skinConditions,
        details: formData.skinConditionsDetails || "",
      },
      {
        num: 10,
        text: "Are you menstruating or about to begin menstruating?",
        answer: formData.menstruating,
        details: "",
      },
    ];

    questions.forEach((q) => {
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }
      doc.setFontSize(10);
      doc.text(`${q.num}. ${q.text}`, 14, yPos);
      yPos += 6;
      doc.text(`Answer: ${q.answer || "Not answered"}`, 20, yPos);
      yPos += 6;
      if (q.details) {
        doc.text(`Details: ${q.details}`, 20, yPos);
        yPos += 6;
      }
      yPos += 4;
    });

    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }

    // Procedure section
    doc.setFontSize(14);
    doc.text("Procedure", 14, yPos);
    yPos += 8;

    doc.setFontSize(10);
    const procedureText =
      "Waxing is a procedure to remove unwanted hair from its roots. Hot wax is applied to the skin and then quickly pulled away, taking hairs with it.";
    const splitProcedure = doc.splitTextToSize(procedureText, 180);
    doc.text(splitProcedure, 14, yPos);
    yPos += splitProcedure.length * 5 + 10;

    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }

    // Side Effects section
    doc.setFontSize(14);
    doc.text("Side Effects", 14, yPos);
    yPos += 8;

    doc.setFontSize(10);
    const sideEffectsText =
      "Waxing may cause side effects. The side effects listed below are not exhaustive. Every person is different, and there is no guarantee against severe side effects. Common side effects include mild discomfort, inflammation, welts, hives, skin lifting, reddening, or small breakouts, which are usually not severe and subside within a few days. Contact us immediately for severe or long-lasting side effects.";
    const splitSideEffects = doc.splitTextToSize(sideEffectsText, 180);
    doc.text(splitSideEffects, 14, yPos);
    yPos += splitSideEffects.length * 5 + 10;

    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }

    // Waiver section
    doc.setFontSize(14);
    doc.text("Waiver", 14, yPos);
    yPos += 8;

    doc.setFontSize(10);
    const waiverText =
      "I understand and acknowledge the risks, including the side effects listed above. Any false or misleading information given may lead to undesired results and complications. I hereby waive and release any and all claims, suits, or causes of action against the service provider, its employees, agents, and representatives, arising from or related to the waxing procedure, including but not limited to any injuries, losses, or damages that may occur during the procedure or from side effects. I agree to assume all risk and full responsibility for any injuries, losses, or damages.";
    const splitWaiver = doc.splitTextToSize(waiverText, 180);
    doc.text(splitWaiver, 14, yPos);
    yPos += splitWaiver.length * 5 + 15;

    // Signature section
    const signatureInfo = [
      ["Signature:", formData.signature || ""],
      ["Printed Name:", formData.printedName || ""],
      ["Date:", formData.date || ""],
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
    const fileName = `WaxingForm_${formData.printedName || "Client"}_${
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
            AUTHORIZATION AND CONSENT FOR WAXING
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
          <p className="text-center text-sm font-semibold text-[#4B6043] mb-6">
            Please read and complete this form carefully.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-8 md:mt-[1200px] mt-[2000px]"
          >
            {/* To the client section */}
            <section className="border-b-2 border-[#A8C3A0] pb-6">
              <h3 className="text-lg font-bold text-[#4B6043] mb-3 font-heading">
                To the client:
              </h3>
              <p className="text-sm text-[#2E2E2E] leading-relaxed">
                You have the right to be informed about the procedure(s) to be
                administered, including benefits, risks, and potential
                side-effects, so that you can decide whether to proceed. You are
                encouraged to ask any questions you may have and to consult with
                a healthcare provider if you have additional questions.
              </p>
            </section>

            {/* Questionnaire section */}
            <section className="border-b-2 border-[#A8C3A0] pb-6">
              <h3 className="text-lg font-bold text-[#4B6043] mb-3 font-heading">
                Questionnaire:
              </h3>
              <p className="text-sm text-[#2E2E2E] mb-4 leading-relaxed">
                By signing this authorization form, you declare that the answers
                given herein are true and complete to the best of your
                knowledge. False or misleading answers can lead to complications
                and/or undesirable results. Please indicate your answer by
                checking one box per question and provide detail where
                appropriate.
              </p>

              <div className="space-y-6">
                {/* Question 1 */}
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-2">
                    1. Have you taken Accutane within the past 12 months?
                  </label>
                  <div className="flex gap-4 mb-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="accutanePast12Months"
                        value="yes"
                        checked={formData.accutanePast12Months === "yes"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="accutanePast12Months"
                        value="no"
                        checked={formData.accutanePast12Months === "no"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>No</span>
                    </label>
                  </div>
                  {formData.accutanePast12Months === "yes" && (
                    <input
                      type="text"
                      name="accutaneLastDose"
                      value={formData.accutaneLastDose}
                      onChange={handleInputChange}
                      placeholder="If so, provide date of last dose:"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0]"
                    />
                  )}
                </div>

                {/* Question 2 */}
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-2">
                    2. Are you pregnant, diabetic, or receiving cancer
                    treatment?
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="pregnantDiabeticCancer"
                        value="yes"
                        checked={formData.pregnantDiabeticCancer === "yes"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="pregnantDiabeticCancer"
                        value="no"
                        checked={formData.pregnantDiabeticCancer === "no"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>

                {/* Question 3 */}
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-2">
                    3. Have you recently received any exfoliating treatments or
                    chemical peels?
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="exfoliatingTreatments"
                        value="yes"
                        checked={formData.exfoliatingTreatments === "yes"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="exfoliatingTreatments"
                        value="no"
                        checked={formData.exfoliatingTreatments === "no"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>

                {/* Question 4 */}
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-2">
                    4. Are you using acne medications (prescribed or over the
                    counter) including: Retin-A, Differin, Tazorac, Atralin, or
                    other retinoids?
                  </label>
                  <div className="flex gap-4 mb-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="acneMedications"
                        value="yes"
                        checked={formData.acneMedications === "yes"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="acneMedications"
                        value="no"
                        checked={formData.acneMedications === "no"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>No</span>
                    </label>
                  </div>
                  {formData.acneMedications === "yes" && (
                    <input
                      type="text"
                      name="acneMedicationsDetails"
                      value={formData.acneMedicationsDetails}
                      onChange={handleInputChange}
                      placeholder="If so, please specify and provide date of last dose:"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0]"
                    />
                  )}
                </div>

                {/* Question 5 */}
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-2">
                    5. Are you taking antibiotics, birth control, or hormone
                    replacements?
                  </label>
                  <div className="flex gap-4 mb-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="antibioticsBirthControl"
                        value="yes"
                        checked={formData.antibioticsBirthControl === "yes"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="antibioticsBirthControl"
                        value="no"
                        checked={formData.antibioticsBirthControl === "no"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>No</span>
                    </label>
                  </div>
                  {formData.antibioticsBirthControl === "yes" && (
                    <input
                      type="text"
                      name="antibioticsDetails"
                      value={formData.antibioticsDetails}
                      onChange={handleInputChange}
                      placeholder="If so, please specify and provide date of last dose:"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0]"
                    />
                  )}
                </div>

                {/* Question 6 */}
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-2">
                    6. Do you have AIDS, Lupus, or other chronic condition(s)
                    that may compromise the skin barrier?
                  </label>
                  <div className="flex gap-4 mb-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="chronicConditions"
                        value="yes"
                        checked={formData.chronicConditions === "yes"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="chronicConditions"
                        value="no"
                        checked={formData.chronicConditions === "no"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>No</span>
                    </label>
                  </div>
                  {formData.chronicConditions === "yes" && (
                    <input
                      type="text"
                      name="chronicConditionsDetails"
                      value={formData.chronicConditionsDetails}
                      onChange={handleInputChange}
                      placeholder="If so, please specify:"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0]"
                    />
                  )}
                </div>

                {/* Question 7 */}
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-2">
                    7. Do you have any allergies including allergies to wax or
                    latex?
                  </label>
                  <div className="flex gap-4 mb-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="allergies"
                        value="yes"
                        checked={formData.allergies === "yes"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="allergies"
                        value="no"
                        checked={formData.allergies === "no"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>No</span>
                    </label>
                  </div>
                  {formData.allergies === "yes" && (
                    <input
                      type="text"
                      name="allergiesDetails"
                      value={formData.allergiesDetails}
                      onChange={handleInputChange}
                      placeholder="If so, please specify:"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0]"
                    />
                  )}
                </div>

                {/* Question 8 */}
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-2">
                    8. Have you used a tanning bed or experienced prolonged sun
                    exposure within the past 24 hours?
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="tanningBedSunExposure"
                        value="yes"
                        checked={formData.tanningBedSunExposure === "yes"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="tanningBedSunExposure"
                        value="no"
                        checked={formData.tanningBedSunExposure === "no"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>

                {/* Question 9 */}
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-2">
                    9. Do you have rosacea, eczema, psoriasis, cracked or open
                    skin, severe varicose veins, or any skin sensitivities?
                  </label>
                  <div className="flex gap-4 mb-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="skinConditions"
                        value="yes"
                        checked={formData.skinConditions === "yes"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="skinConditions"
                        value="no"
                        checked={formData.skinConditions === "no"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>No</span>
                    </label>
                  </div>
                  {formData.skinConditions === "yes" && (
                    <input
                      type="text"
                      name="skinConditionsDetails"
                      value={formData.skinConditionsDetails}
                      onChange={handleInputChange}
                      placeholder="If so, please specify:"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0]"
                    />
                  )}
                </div>

                {/* Question 10 */}
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-2">
                    10. Are you menstruating or about to begin menstruating?
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="menstruating"
                        value="yes"
                        checked={formData.menstruating === "yes"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="menstruating"
                        value="no"
                        checked={formData.menstruating === "no"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>
              </div>
            </section>

            {/* Procedure Section */}
            <section className="border-b-2 border-[#A8C3A0] pb-6">
              <h3 className="text-lg font-bold text-[#4B6043] mb-3 font-heading">
                Procedure
              </h3>
              <p className="text-sm text-[#2E2E2E] leading-relaxed">
                Waxing is a procedure to remove unwanted hair from its roots.
                Hot wax is applied to the skin and then quickly pulled away,
                taking hairs with it.
              </p>
            </section>

            {/* Side Effects Section */}
            <section className="border-b-2 border-[#A8C3A0] pb-6">
              <h3 className="text-lg font-bold text-[#4B6043] mb-3 font-heading">
                Side Effects
              </h3>
              <p className="text-sm text-[#2E2E2E] leading-relaxed">
                Waxing may cause side effects. The side effects listed below are
                not exhaustive. Every person is different, and there is no
                guarantee against severe side effects. Common side effects
                include mild discomfort, inflammation, welts, hives, skin
                lifting, reddening, or small breakouts, which are usually not
                severe and subside within a few days. Contact us immediately for
                severe or long-lasting side effects.
              </p>
            </section>

            {/* Waiver Section */}
            <section className="border-b-2 border-[#A8C3A0] pb-6">
              <h3 className="text-lg font-bold text-[#4B6043] mb-3 font-heading">
                Waiver
              </h3>
              <p className="text-sm text-[#2E2E2E] leading-relaxed">
                I understand and acknowledge the risks, including the side
                effects listed above. Any false or misleading information given
                may lead to undesired results and complications. I hereby waive
                and release any and all claims, suits, or causes of action
                against the service provider, its employees, agents, and
                representatives, arising from or related to the waxing
                procedure, including but not limited to any injuries, losses, or
                damages that may occur during the procedure or from side
                effects. I agree to assume all risk and full responsibility for
                any injuries, losses, or damages.
              </p>
            </section>

            {/* Signature Section */}
            <section className="border-b-2 border-[#A8C3A0] pb-6">
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
                    PRINTED NAME *
                  </label>
                  <input
                    type="text"
                    name="printedName"
                    value={formData.printedName}
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
                    name="date"
                    value={formData.date}
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

export default WaxingForm;
