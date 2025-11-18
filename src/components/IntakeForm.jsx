import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function IntakeForm({ onClose }) {
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    dob: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    homePhone: "",
    cellPhone: "",
    workPhone: "",
    email: "",
    emergencyContact: "",
    emergencyPhone: "",
    referral: "",
    physician: "",

    // Skin and Sun Exposure
    sunExposure: "",
    sunscreenRegimen: "",
    skinColorPreference: {
      sunbathe: false,
      selfTanning: false,
      tanningBed: false,
      nothing: false,
    },
    skinType: "",
    skinIssues: {
      flakiness: false,
      tightness: false,
      redness: false,
      excessiveOily: false,
    },
    foundationType: "",
    skinHealing: "",
    bruiseEasily: "",
    cancerHistory: "",
    homeCare: "",
    homeCareDescription: "",
    firstTreatment: "",
    previousTreatments: "",

    // Medical History
    smokes: "",
    smokingAmount: "",
    medicalConditions: {
      epilepsy: false,
      heartCondition: false,
      pacemaker: false,
      skinCancer: false,
      diabetes: false,
      metalPinsPlates: false,
      skinDiseases: false,
      recentOperations: false,
      allergyToAspirin: false,
    },
    accutanePast12Months: "",
    retinAPastMonth: "",
    otherMedicationsPast6Months: "",
    otherMedicationsDescription: "",
    latexAllergy: "",
    skincareProductAllergy: "",
    allergiesList: "",
    currentMedications: "",
    medicationsList: "",

    // Gender-specific
    claustrophobia: "",
    // Women only
    pregnant: false,
    tryingToBecomePregnant: false,
    notPregnant: false,
    takingOralContraceptives: false,
    takingHormoneReplacements: false,
    // Men only
    ingrownFacialHairs: "",
    razorBurn: "",
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
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        message: formatFormDataForEmail(),
      };

      // Send email via EmailJS
      // Note: These IDs need to be configured in EmailJS dashboard
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
    let emailContent = "NEW INTAKE FORM SUBMISSION\n\n";
    emailContent += "=== PERSONAL INFORMATION ===\n";
    emailContent += `Name: ${formData.firstName} ${formData.lastName}\n`;
    emailContent += `DOB: ${formData.dob}\n`;
    emailContent += `Address: ${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}\n`;
    emailContent += `Home Phone: ${formData.homePhone}\n`;
    emailContent += `Cell Phone: ${formData.cellPhone}\n`;
    emailContent += `Work Phone: ${formData.workPhone}\n`;
    emailContent += `Email: ${formData.email}\n`;
    emailContent += `Emergency Contact: ${formData.emergencyContact} - ${formData.emergencyPhone}\n`;
    emailContent += `Referred by: ${formData.referral}\n`;
    emailContent += `Physician: ${formData.physician}\n\n`;

    emailContent += "=== SKIN AND SUN EXPOSURE ===\n";
    emailContent += `Sun Exposure: ${formData.sunExposure}\n`;
    emailContent += `Sunscreen Regimen: ${formData.sunscreenRegimen}\n`;
    emailContent += `Skin Color Preference: ${
      Object.entries(formData.skinColorPreference)
        .filter(([_, val]) => val)
        .map(([key]) => key.replace(/([A-Z])/g, " $1").trim())
        .join(", ") || "None"
    }\n`;
    emailContent += `Skin Type: ${formData.skinType}\n`;
    emailContent += `Skin Issues: ${
      Object.entries(formData.skinIssues)
        .filter(([_, val]) => val)
        .map(([key]) => key.replace(/([A-Z])/g, " $1").trim())
        .join(", ") || "None"
    }\n`;
    emailContent += `Foundation Type: ${formData.foundationType}\n`;
    emailContent += `Skin Healing: ${formData.skinHealing}\n`;
    emailContent += `Bruise Easily: ${formData.bruiseEasily}\n`;
    emailContent += `Cancer History: ${formData.cancerHistory}\n`;
    emailContent += `Home Care: ${formData.homeCare}\n`;
    if (formData.homeCare === "yes" && formData.homeCareDescription) {
      emailContent += `Home Care Description: ${formData.homeCareDescription}\n`;
    }
    emailContent += `First Treatment: ${formData.firstTreatment}\n`;
    if (formData.firstTreatment === "no" && formData.previousTreatments) {
      emailContent += `Previous Treatments: ${formData.previousTreatments}\n`;
    }
    emailContent += "\n";

    emailContent += "=== MEDICAL HISTORY ===\n";
    emailContent += `Smokes: ${formData.smokes}${
      formData.smokes === "yes" && formData.smokingAmount
        ? ` (${formData.smokingAmount})`
        : ""
    }\n`;
    emailContent += `Medical Conditions: ${
      Object.entries(formData.medicalConditions)
        .filter(([_, val]) => val)
        .map(([key]) => key.replace(/([A-Z])/g, " $1").trim())
        .join(", ") || "None"
    }\n`;
    emailContent += `Accutane (past 12 months): ${formData.accutanePast12Months}\n`;
    emailContent += `Retin-A (past month): ${formData.retinAPastMonth}\n`;
    emailContent += `Other Medications (past 6 months): ${formData.otherMedicationsPast6Months}\n`;
    if (
      formData.otherMedicationsPast6Months === "yes" &&
      formData.otherMedicationsDescription
    ) {
      emailContent += `Other Medications Description: ${formData.otherMedicationsDescription}\n`;
    }
    emailContent += `Latex Allergy: ${formData.latexAllergy}\n`;
    emailContent += `Skincare Product Allergy: ${formData.skincareProductAllergy}\n`;
    if (formData.skincareProductAllergy === "yes" && formData.allergiesList) {
      emailContent += `Allergies List: ${formData.allergiesList}\n`;
    }
    emailContent += `Current Medications: ${formData.currentMedications}\n`;
    if (formData.currentMedications === "yes" && formData.medicationsList) {
      emailContent += `Medications List: ${formData.medicationsList}\n`;
    }
    emailContent += "\n";

    emailContent += "=== ADDITIONAL INFORMATION ===\n";
    emailContent += `Claustrophobia: ${formData.claustrophobia}\n`;
    emailContent += `Pregnant: ${formData.pregnant ? "Yes" : "No"}\n`;
    emailContent += `Trying to Become Pregnant: ${
      formData.tryingToBecomePregnant ? "Yes" : "No"
    }\n`;
    emailContent += `Not Pregnant: ${formData.notPregnant ? "Yes" : "No"}\n`;
    emailContent += `Taking Oral Contraceptives: ${
      formData.takingOralContraceptives ? "Yes" : "No"
    }\n`;
    emailContent += `Taking Hormone Replacements: ${
      formData.takingHormoneReplacements ? "Yes" : "No"
    }\n`;
    emailContent += `Ingrown Facial Hairs: ${formData.ingrownFacialHairs}\n`;
    emailContent += `Razor Burn: ${formData.razorBurn}\n`;

    return emailContent;
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text("INTAKE FORM", 105, 20, { align: "center" });

    let yPos = 30;

    // Personal Information Section
    doc.setFontSize(14);
    doc.text("Personal Information", 14, yPos);
    yPos += 10;

    const personalInfo = [
      ["First Name:", formData.firstName || ""],
      ["Last Name:", formData.lastName || ""],
      ["DOB:", formData.dob || ""],
      ["Address:", formData.address || ""],
      ["City:", formData.city || ""],
      ["State:", formData.state || ""],
      ["Zip:", formData.zip || ""],
      ["Home #:", formData.homePhone || ""],
      ["Cell #:", formData.cellPhone || ""],
      ["Work #:", formData.workPhone || ""],
      ["Email:", formData.email || ""],
      ["Emergency Contact:", formData.emergencyContact || ""],
      ["Emergency Phone #:", formData.emergencyPhone || ""],
      ["Referred by:", formData.referral || ""],
      ["Physician:", formData.physician || ""],
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

    // Skin and Sun Exposure Section
    doc.setFontSize(14);
    doc.text("Skin and Sun Exposure", 14, yPos);
    yPos += 10;

    const skinInfo = [
      ["Sun Exposure:", formData.sunExposure || ""],
      ["Sunscreen Regimen:", formData.sunscreenRegimen || ""],
      [
        "Skin Color Preference:",
        Object.entries(formData.skinColorPreference)
          .filter(([_, val]) => val)
          .map(([key]) => key.replace(/([A-Z])/g, " $1").trim())
          .join(", ") || "None",
      ],
      ["Skin Type:", formData.skinType || ""],
      [
        "Skin Issues:",
        Object.entries(formData.skinIssues)
          .filter(([_, val]) => val)
          .map(([key]) => key.replace(/([A-Z])/g, " $1").trim())
          .join(", ") || "None",
      ],
      ["Foundation Type:", formData.foundationType || ""],
      ["Skin Healing:", formData.skinHealing || ""],
      ["Bruise Easily:", formData.bruiseEasily || ""],
      ["Cancer History:", formData.cancerHistory || ""],
      ["Home Care:", formData.homeCare || ""],
      ["Home Care Description:", formData.homeCareDescription || ""],
      ["First Treatment:", formData.firstTreatment || ""],
      ["Previous Treatments:", formData.previousTreatments || ""],
    ];

    autoTable(doc, {
      startY: yPos,
      head: [["Field", "Value"]],
      body: skinInfo,
      theme: "grid",
      headStyles: { fillColor: [75, 96, 67] },
      styles: { fontSize: 10 },
      columnStyles: { 0: { cellWidth: 70 }, 1: { cellWidth: 110 } },
    });

    yPos = doc.lastAutoTable.finalY + 15;
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }

    // Medical History Section
    doc.setFontSize(14);
    doc.text("Medical History", 14, yPos);
    yPos += 10;

    const medicalInfo = [
      [
        "Smokes:",
        `${formData.smokes}${
          formData.smokes === "yes" && formData.smokingAmount
            ? ` (${formData.smokingAmount})`
            : ""
        }`,
      ],
      [
        "Medical Conditions:",
        Object.entries(formData.medicalConditions)
          .filter(([_, val]) => val)
          .map(([key]) => key.replace(/([A-Z])/g, " $1").trim())
          .join(", ") || "None",
      ],
      ["Accutane (past 12 months):", formData.accutanePast12Months || ""],
      ["Retin-A (past month):", formData.retinAPastMonth || ""],
      [
        "Other Medications (past 6 months):",
        formData.otherMedicationsPast6Months || "",
      ],
      [
        "Other Medications Description:",
        formData.otherMedicationsDescription || "",
      ],
      ["Latex Allergy:", formData.latexAllergy || ""],
      ["Skincare Product Allergy:", formData.skincareProductAllergy || ""],
      ["Allergies List:", formData.allergiesList || ""],
      ["Current Medications:", formData.currentMedications || ""],
      ["Medications List:", formData.medicationsList || ""],
    ];

    autoTable(doc, {
      startY: yPos,
      head: [["Field", "Value"]],
      body: medicalInfo,
      theme: "grid",
      headStyles: { fillColor: [75, 96, 67] },
      styles: { fontSize: 10 },
      columnStyles: { 0: { cellWidth: 80 }, 1: { cellWidth: 100 } },
    });

    yPos = doc.lastAutoTable.finalY + 15;
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }

    // Additional Information Section
    doc.setFontSize(14);
    doc.text("Additional Information", 14, yPos);
    yPos += 10;

    const additionalInfo = [
      ["Claustrophobia:", formData.claustrophobia || ""],
      ["Pregnant:", formData.pregnant ? "Yes" : "No"],
      [
        "Trying to Become Pregnant:",
        formData.tryingToBecomePregnant ? "Yes" : "No",
      ],
      ["Not Pregnant:", formData.notPregnant ? "Yes" : "No"],
      [
        "Taking Oral Contraceptives:",
        formData.takingOralContraceptives ? "Yes" : "No",
      ],
      [
        "Taking Hormone Replacements:",
        formData.takingHormoneReplacements ? "Yes" : "No",
      ],
      ["Ingrown Facial Hairs:", formData.ingrownFacialHairs || ""],
      ["Razor Burn:", formData.razorBurn || ""],
    ];

    autoTable(doc, {
      startY: yPos,
      head: [["Field", "Value"]],
      body: additionalInfo,
      theme: "grid",
      headStyles: { fillColor: [75, 96, 67] },
      styles: { fontSize: 10 },
      columnStyles: { 0: { cellWidth: 80 }, 1: { cellWidth: 100 } },
    });

    return doc;
  };

  const handleDownloadPDF = () => {
    const doc = generatePDF();
    const fileName = `IntakeForm_${formData.firstName}_${formData.lastName}_${
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
          <h2 className="text-2xl font-bold font-heading">INTAKE FORM</h2>
          <div className="flex gap-2">
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
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information Section */}
            <section className="border-b-2 border-[#A8C3A0] pb-6">
              <h3 className="text-xl font-bold text-[#4B6043] mb-4 font-heading">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-1">
                    DOB *
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
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
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
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
                    Home #
                  </label>
                  <input
                    type="tel"
                    name="homePhone"
                    value={formData.homePhone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-1">
                    Cell #
                  </label>
                  <input
                    type="tel"
                    name="cellPhone"
                    value={formData.cellPhone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-1">
                    Work #
                  </label>
                  <input
                    type="tel"
                    name="workPhone"
                    value={formData.workPhone}
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
                    Emergency Contact
                  </label>
                  <input
                    type="text"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-1">
                    Emergency Phone #
                  </label>
                  <input
                    type="tel"
                    name="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-1">
                    Whom May we thank for referring you
                  </label>
                  <input
                    type="text"
                    name="referral"
                    value={formData.referral}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-1">
                    Physician
                  </label>
                  <input
                    type="text"
                    name="physician"
                    value={formData.physician}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0]"
                  />
                </div>
              </div>
            </section>

            {/* Skin and Sun Exposure Section */}
            <section className="border-b-2 border-[#A8C3A0] pb-6">
              <h3 className="text-xl font-bold text-[#4B6043] mb-4 font-heading">
                Skin and Sun Exposure
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-2">
                    Exposure to the sun (please circle):
                  </label>
                  <div className="flex flex-wrap gap-4">
                    {["never", "light", "moderate", "excessive"].map(
                      (option) => (
                        <label key={option} className="flex items-center">
                          <input
                            type="radio"
                            name="sunExposure"
                            value={option}
                            checked={formData.sunExposure === option}
                            onChange={handleInputChange}
                            className="mr-2"
                          />
                          <span className="capitalize">{option}</span>
                        </label>
                      )
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-1">
                    What is your sunscreen regimen?
                  </label>
                  <textarea
                    name="sunscreenRegimen"
                    value={formData.sunscreenRegimen}
                    onChange={handleInputChange}
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-2">
                    How do you prefer to get skin color?
                  </label>
                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="skinColorPreference.sunbathe"
                        checked={formData.skinColorPreference.sunbathe}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>Sunbathe</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="skinColorPreference.selfTanning"
                        checked={formData.skinColorPreference.selfTanning}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>Self-Tanning</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="skinColorPreference.tanningBed"
                        checked={formData.skinColorPreference.tanningBed}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>Tanning Bed</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="skinColorPreference.nothing"
                        checked={formData.skinColorPreference.nothing}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>Nothing</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-2">
                    How would you describe your skin?
                  </label>
                  <select
                    name="skinType"
                    value={formData.skinType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0]"
                  >
                    <option value="">Select...</option>
                    <option value="Normal to oily">Normal to oily</option>
                    <option value="Normal to Dry">Normal to Dry</option>
                    <option value="Extremely Oily">Extremely Oily</option>
                    <option value="Extremely Dry">Extremely Dry</option>
                    <option value="Acne">Acne</option>
                    <option value="Combination">Combination</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-2">
                    Do you experience?
                  </label>
                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="skinIssues.flakiness"
                        checked={formData.skinIssues.flakiness}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>Flakiness</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="skinIssues.tightness"
                        checked={formData.skinIssues.tightness}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>Tightness</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="skinIssues.redness"
                        checked={formData.skinIssues.redness}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>Redness</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="skinIssues.excessiveOily"
                        checked={formData.skinIssues.excessiveOily}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>Excessive oily shine during the day</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-2">
                    What type of foundation do you wear?
                  </label>
                  <div className="flex flex-wrap gap-4">
                    {["liquid", "Powder", "Cream", "None"].map((option) => (
                      <label key={option} className="flex items-center">
                        <input
                          type="radio"
                          name="foundationType"
                          value={option}
                          checked={formData.foundationType === option}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-2">
                    How does your skin heal?
                  </label>
                  <div className="flex flex-wrap gap-4">
                    {["Fast", "Pigments", "Scars", "heals poorly"].map(
                      (option) => (
                        <label key={option} className="flex items-center">
                          <input
                            type="radio"
                            name="skinHealing"
                            value={option}
                            checked={formData.skinHealing === option}
                            onChange={handleInputChange}
                            className="mr-2"
                          />
                          <span>{option}</span>
                        </label>
                      )
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-2">
                    Do you bruise easily?
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="bruiseEasily"
                        value="yes"
                        checked={formData.bruiseEasily === "yes"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="bruiseEasily"
                        value="no"
                        checked={formData.bruiseEasily === "no"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-2">
                    Any personal or family history of cancer?
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="cancerHistory"
                        value="yes"
                        checked={formData.cancerHistory === "yes"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="cancerHistory"
                        value="no"
                        checked={formData.cancerHistory === "no"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-2">
                    Do you take care of your skin at home?
                  </label>
                  <div className="flex gap-4 mb-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="homeCare"
                        value="yes"
                        checked={formData.homeCare === "yes"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="homeCare"
                        value="no"
                        checked={formData.homeCare === "no"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>No</span>
                    </label>
                  </div>
                  {formData.homeCare === "yes" && (
                    <textarea
                      name="homeCareDescription"
                      value={formData.homeCareDescription}
                      onChange={handleInputChange}
                      placeholder="Please describe:"
                      rows="2"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0]"
                    />
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-2">
                    Is this your first skin care treatment?
                  </label>
                  <div className="flex gap-4 mb-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="firstTreatment"
                        value="yes"
                        checked={formData.firstTreatment === "yes"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="firstTreatment"
                        value="no"
                        checked={formData.firstTreatment === "no"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>No</span>
                    </label>
                  </div>
                  {formData.firstTreatment === "no" && (
                    <textarea
                      name="previousTreatments"
                      value={formData.previousTreatments}
                      onChange={handleInputChange}
                      placeholder="If no, what have you liked about previous treatments?"
                      rows="2"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0]"
                    />
                  )}
                </div>
              </div>
            </section>

            {/* Medical History Section */}
            <section className="border-b-2 border-[#A8C3A0] pb-6">
              <h3 className="text-xl font-bold text-[#4B6043] mb-4 font-heading">
                Medical History and Medications
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-2">
                    Do you smoke?
                  </label>
                  <div className="flex gap-4 mb-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="smokes"
                        value="yes"
                        checked={formData.smokes === "yes"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="smokes"
                        value="no"
                        checked={formData.smokes === "no"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>No</span>
                    </label>
                  </div>
                  {formData.smokes === "yes" && (
                    <input
                      type="text"
                      name="smokingAmount"
                      value={formData.smokingAmount}
                      onChange={handleInputChange}
                      placeholder="If yes, specify daily amount:"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0]"
                    />
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-2">
                    Do you have (circle all that apply):
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {Object.keys(formData.medicalConditions).map(
                      (condition) => (
                        <label key={condition} className="flex items-center">
                          <input
                            type="checkbox"
                            name={`medicalConditions.${condition}`}
                            checked={formData.medicalConditions[condition]}
                            onChange={handleInputChange}
                            className="mr-2"
                          />
                          <span className="capitalize">
                            {condition.replace(/([A-Z])/g, " $1").trim()}
                          </span>
                        </label>
                      )
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-2">
                    Have you used Accutane in the past 12 months?
                  </label>
                  <div className="flex gap-4">
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
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-2">
                    Have you used Retin-A in the past month?
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="retinAPastMonth"
                        value="yes"
                        checked={formData.retinAPastMonth === "yes"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="retinAPastMonth"
                        value="no"
                        checked={formData.retinAPastMonth === "no"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-2">
                    Have you used any other oral/topical skin medications in the
                    past 6 months?
                  </label>
                  <div className="flex gap-4 mb-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="otherMedicationsPast6Months"
                        value="yes"
                        checked={formData.otherMedicationsPast6Months === "yes"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="otherMedicationsPast6Months"
                        value="no"
                        checked={formData.otherMedicationsPast6Months === "no"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>No</span>
                    </label>
                  </div>
                  {formData.otherMedicationsPast6Months === "yes" && (
                    <textarea
                      name="otherMedicationsDescription"
                      value={formData.otherMedicationsDescription}
                      onChange={handleInputChange}
                      placeholder="If yes, please describe:"
                      rows="2"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0]"
                    />
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-2">
                    Do you have: allergies to latex?
                  </label>
                  <div className="flex gap-4 mb-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="latexAllergy"
                        value="yes"
                        checked={formData.latexAllergy === "yes"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="latexAllergy"
                        value="no"
                        checked={formData.latexAllergy === "no"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>No</span>
                    </label>
                  </div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-2">
                    allergies to skin care products?
                  </label>
                  <div className="flex gap-4 mb-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="skincareProductAllergy"
                        value="yes"
                        checked={formData.skincareProductAllergy === "yes"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="skincareProductAllergy"
                        value="no"
                        checked={formData.skincareProductAllergy === "no"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>No</span>
                    </label>
                  </div>
                  {formData.skincareProductAllergy === "yes" && (
                    <textarea
                      name="allergiesList"
                      value={formData.allergiesList}
                      onChange={handleInputChange}
                      placeholder="Please list:"
                      rows="2"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0]"
                    />
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-2">
                    Are you currently on any medications?
                  </label>
                  <div className="flex gap-4 mb-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="currentMedications"
                        value="yes"
                        checked={formData.currentMedications === "yes"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="currentMedications"
                        value="no"
                        checked={formData.currentMedications === "no"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>No</span>
                    </label>
                  </div>
                  {formData.currentMedications === "yes" && (
                    <textarea
                      name="medicationsList"
                      value={formData.medicationsList}
                      onChange={handleInputChange}
                      placeholder="Please list:"
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0]"
                    />
                  )}
                </div>
              </div>
            </section>

            {/* Gender-specific Section */}
            <section className="border-b-2 border-[#A8C3A0] pb-6">
              <h3 className="text-xl font-bold text-[#4B6043] mb-4 font-heading">
                Additional Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-2">
                    Have you ever suffered from claustrophobia?
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="claustrophobia"
                        value="yes"
                        checked={formData.claustrophobia === "yes"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="claustrophobia"
                        value="no"
                        checked={formData.claustrophobia === "no"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-2">
                    <strong>Women only</strong> Are you (circle all that apply):
                  </label>
                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="pregnant"
                        checked={formData.pregnant}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>Pregnant</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="tryingToBecomePregnant"
                        checked={formData.tryingToBecomePregnant}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>Trying to become pregnant</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="notPregnant"
                        checked={formData.notPregnant}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>Not pregnant</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="takingOralContraceptives"
                        checked={formData.takingOralContraceptives}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>Taking Oral Contraceptives</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="takingHormoneReplacements"
                        checked={formData.takingHormoneReplacements}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>Taking Hormone Replacements</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-2">
                    <strong>Men only</strong> Do you suffer from:
                  </label>
                  <div className="space-y-2">
                    <div>
                      <span className="mr-4">Ingrown facial hairs</span>
                      <label className="inline-flex items-center mr-4">
                        <input
                          type="radio"
                          name="ingrownFacialHairs"
                          value="yes"
                          checked={formData.ingrownFacialHairs === "yes"}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        <span>Yes</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="ingrownFacialHairs"
                          value="no"
                          checked={formData.ingrownFacialHairs === "no"}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        <span>No</span>
                      </label>
                    </div>
                    <div>
                      <span className="mr-4">Experience Razor Burn</span>
                      <label className="inline-flex items-center mr-4">
                        <input
                          type="radio"
                          name="razorBurn"
                          value="yes"
                          checked={formData.razorBurn === "yes"}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        <span>Yes</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="razorBurn"
                          value="no"
                          checked={formData.razorBurn === "no"}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        <span>No</span>
                      </label>
                    </div>
                  </div>
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

export default IntakeForm;
