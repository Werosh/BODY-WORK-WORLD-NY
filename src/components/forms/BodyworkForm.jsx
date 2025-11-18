import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function BodyworkForm({ onClose }) {
  const [formData, setFormData] = useState({
    // Personal Information
    name: "",
    email: "",
    phone: "",
    dob: "",
    address: "",
    cityStateZip: "",
    emergencyContactName: "",
    emergencyPhone: "",
    occupation: "",
    relationship: "",
    referredBy: "",
    age: "",

    // Health Information
    medications: "",
    medicationsList: "",
    allergies: "",
    allergiesList: "",
    pregnant: "",
    pregnancyMonths: "",
    dueDate: "",
    medicalSupervision: "",
    medicalSupervisionDescription: "",
    healthConditions: {
      areasOfSwelling: "",
      autoimmuneDisorder: "",
      backNeckProblems: "",
      bleedingDisorders: "",
      bloodClots: "",
      bruiseEasily: "",
      bursitis: "",
      cancer: "",
      contagiousCondition: "",
      decreasedSensation: "",
      diabetes: "",
      fibromyalgia: "",
      headaches: "",
      heartCondition: "",
      hypertension: "",
      kidneyDisease: "",
      multipleSclerosis: "",
      neurologicalCondition: "",
      neuropathy: "",
      osteoarthritis: "",
      osteoporosis: "",
      phlebitis: "",
      sciatica: "",
      seizures: "",
      stroke: "",
      tendinitis: "",
      tmjDisorder: "",
      varicoseVeins: "",
      vertigoDizziness: "",
    },
    brokenSkin: "",
    brokenSkinLocation: "",
    jointReplacement: "",
    jointReplacementLocation: "",
    recentInjuries: "",
    recentInjuriesDescription: "",
    otherHealthConditions: "",

    // Massage Information
    previousMassage: "",
    howRecently: "",
    reasonForMassage: {
      relaxation: false,
      specificProblem: false,
    },
    areasOfDiscomfort: "",
    pressurePreference: "",

    // Signature
    signature: "",
    date: "",
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
      const emailData = {
        to_name: "BODY WORK WORLD NY",
        from_name: formData.name,
        from_email: formData.email,
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
    let emailContent = "CLIENT INTAKE FORM - THERAPEUTIC MASSAGE\n\n";
    emailContent += "=== PERSONAL INFORMATION ===\n";
    emailContent += `Name: ${formData.name}\n`;
    emailContent += `Email: ${formData.email}\n`;
    emailContent += `Phone (cell/day): ${formData.phone}\n`;
    emailContent += `DOB: ${formData.dob}\n`;
    emailContent += `Address: ${formData.address}\n`;
    emailContent += `City/State/Zip: ${formData.cityStateZip}\n`;
    emailContent += `Emergency Contact Name: ${formData.emergencyContactName}\n`;
    emailContent += `Emergency Phone: ${formData.emergencyPhone}\n`;
    emailContent += `Occupation: ${formData.occupation}\n`;
    emailContent += `Relationship: ${formData.relationship}\n`;
    emailContent += `Referred by: ${formData.referredBy}\n`;
    emailContent += `Age: ${formData.age}\n\n`;

    emailContent += "=== HEALTH INFORMATION ===\n";
    emailContent += `Medications: ${formData.medications}`;
    if (formData.medications === "yes" && formData.medicationsList) {
      emailContent += ` - ${formData.medicationsList}`;
    }
    emailContent += `\n`;
    emailContent += `Allergies: ${formData.allergies}`;
    if (formData.allergies === "yes" && formData.allergiesList) {
      emailContent += ` - ${formData.allergiesList}`;
    }
    emailContent += `\n`;
    emailContent += `Pregnant: ${formData.pregnant}`;
    if (formData.pregnant === "yes") {
      emailContent += ` - ${formData.pregnancyMonths} months, Due: ${formData.dueDate}`;
    }
    emailContent += `\n`;
    emailContent += `Medical Supervision: ${formData.medicalSupervision}`;
    if (
      formData.medicalSupervision === "yes" &&
      formData.medicalSupervisionDescription
    ) {
      emailContent += ` - ${formData.medicalSupervisionDescription}`;
    }
    emailContent += `\n\n`;

    emailContent += "Health Conditions:\n";
    const healthConditionLabels = {
      areasOfSwelling: "Areas of swelling",
      autoimmuneDisorder: "Autoimmune disorder",
      backNeckProblems: "Back / neck problems",
      bleedingDisorders: "Bleeding disorders",
      bloodClots: "Blood clots",
      bruiseEasily: "Bruise easily",
      bursitis: "Bursitis",
      cancer: "Cancer",
      contagiousCondition: "Contagious condition",
      decreasedSensation: "Decreased sensation",
      diabetes: "Diabetes",
      fibromyalgia: "Fibromyalgia",
      headaches: "Headaches",
      heartCondition: "Heart condition",
      hypertension: "Hypertension",
      kidneyDisease: "Kidney disease",
      multipleSclerosis: "Multiple sclerosis",
      neurologicalCondition: "Neurological condition",
      neuropathy: "Neuropathy",
      osteoarthritis: "Osteoarthritis",
      osteoporosis: "Osteoporosis",
      phlebitis: "Phlebitis",
      sciatica: "Sciatica",
      seizures: "Seizures",
      stroke: "Stroke",
      tendinitis: "Tendinitis",
      tmjDisorder: "TMJ disorder",
      varicoseVeins: "Varicose veins",
      vertigoDizziness: "Vertigo / dizziness",
    };

    Object.entries(formData.healthConditions).forEach(([key, value]) => {
      if (value === "yes") {
        emailContent += `- ${healthConditionLabels[key]}: Yes\n`;
      }
    });

    emailContent += `\nBroken Skin: ${formData.brokenSkin}`;
    if (formData.brokenSkin === "yes" && formData.brokenSkinLocation) {
      emailContent += ` - ${formData.brokenSkinLocation}`;
    }
    emailContent += `\n`;
    emailContent += `Joint Replacement: ${formData.jointReplacement}`;
    if (
      formData.jointReplacement === "yes" &&
      formData.jointReplacementLocation
    ) {
      emailContent += ` - ${formData.jointReplacementLocation}`;
    }
    emailContent += `\n`;
    emailContent += `Recent Injuries (past 2 years): ${formData.recentInjuries}`;
    if (
      formData.recentInjuries === "yes" &&
      formData.recentInjuriesDescription
    ) {
      emailContent += ` - ${formData.recentInjuriesDescription}`;
    }
    emailContent += `\n`;
    if (formData.otherHealthConditions) {
      emailContent += `Other Health Conditions: ${formData.otherHealthConditions}\n`;
    }
    emailContent += "\n";

    emailContent += "=== MASSAGE INFORMATION ===\n";
    emailContent += `Previous Massage: ${formData.previousMassage}`;
    if (formData.previousMassage === "yes" && formData.howRecently) {
      emailContent += ` - ${formData.howRecently}`;
    }
    emailContent += `\n`;
    emailContent += `Reason for Massage: ${
      Object.entries(formData.reasonForMassage)
        .filter(([_, val]) => val)
        .map(([key]) => key.replace(/([A-Z])/g, " $1").trim())
        .join(", ") || "None"
    }\n`;
    if (formData.areasOfDiscomfort) {
      emailContent += `Areas of Discomfort: ${formData.areasOfDiscomfort}\n`;
    }
    emailContent += `Pressure Preference: ${formData.pressurePreference}\n\n`;

    emailContent += "=== ACKNOWLEDGMENT ===\n";
    emailContent += `Signature: ${formData.signature}\n`;
    emailContent += `Date: ${formData.date}\n`;

    return emailContent;
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("CLIENT INTAKE FORM - THERAPEUTIC MASSAGE", 105, 20, {
      align: "center",
    });

    let yPos = 30;

    // Personal Information
    doc.setFontSize(14);
    doc.text("Personal Information", 14, yPos);
    yPos += 10;

    const personalInfo = [
      ["Name:", formData.name || ""],
      ["Email:", formData.email || ""],
      ["Phone:", formData.phone || ""],
      ["DOB:", formData.dob || ""],
      ["Address:", formData.address || ""],
      ["City/State/Zip:", formData.cityStateZip || ""],
      ["Emergency Contact:", formData.emergencyContactName || ""],
      ["Emergency Phone:", formData.emergencyPhone || ""],
      ["Occupation:", formData.occupation || ""],
      ["Relationship:", formData.relationship || ""],
      ["Referred by:", formData.referredBy || ""],
      ["Age:", formData.age || ""],
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

    // Health Information
    doc.setFontSize(14);
    doc.text("Health Information", 14, yPos);
    yPos += 10;

    const healthInfo = [
      [
        "Medications:",
        `${formData.medications}${
          formData.medications === "yes" && formData.medicationsList
            ? ` - ${formData.medicationsList}`
            : ""
        }`,
      ],
      [
        "Allergies:",
        `${formData.allergies}${
          formData.allergies === "yes" && formData.allergiesList
            ? ` - ${formData.allergiesList}`
            : ""
        }`,
      ],
      [
        "Pregnant:",
        `${formData.pregnant}${
          formData.pregnant === "yes"
            ? ` - ${formData.pregnancyMonths} months, Due: ${formData.dueDate}`
            : ""
        }`,
      ],
      [
        "Medical Supervision:",
        `${formData.medicalSupervision}${
          formData.medicalSupervision === "yes" &&
          formData.medicalSupervisionDescription
            ? ` - ${formData.medicalSupervisionDescription}`
            : ""
        }`,
      ],
      [
        "Broken Skin:",
        `${formData.brokenSkin}${
          formData.brokenSkin === "yes" && formData.brokenSkinLocation
            ? ` - ${formData.brokenSkinLocation}`
            : ""
        }`,
      ],
      [
        "Joint Replacement:",
        `${formData.jointReplacement}${
          formData.jointReplacement === "yes" &&
          formData.jointReplacementLocation
            ? ` - ${formData.jointReplacementLocation}`
            : ""
        }`,
      ],
      [
        "Recent Injuries:",
        `${formData.recentInjuries}${
          formData.recentInjuries === "yes" &&
          formData.recentInjuriesDescription
            ? ` - ${formData.recentInjuriesDescription}`
            : ""
        }`,
      ],
      ["Other Conditions:", formData.otherHealthConditions || ""],
    ];

    autoTable(doc, {
      startY: yPos,
      head: [["Field", "Value"]],
      body: healthInfo,
      theme: "grid",
      headStyles: { fillColor: [75, 96, 67] },
      styles: { fontSize: 9 },
      columnStyles: { 0: { cellWidth: 60 }, 1: { cellWidth: 120 } },
    });

    yPos = doc.lastAutoTable.finalY + 15;
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }

    // Health Conditions
    doc.setFontSize(12);
    doc.text("Health Conditions Checklist:", 14, yPos);
    yPos += 8;

    const healthConditionLabels = {
      areasOfSwelling: "Areas of swelling",
      autoimmuneDisorder: "Autoimmune disorder",
      backNeckProblems: "Back / neck problems",
      bleedingDisorders: "Bleeding disorders",
      bloodClots: "Blood clots",
      bruiseEasily: "Bruise easily",
      bursitis: "Bursitis",
      cancer: "Cancer",
      contagiousCondition: "Contagious condition",
      decreasedSensation: "Decreased sensation",
      diabetes: "Diabetes",
      fibromyalgia: "Fibromyalgia",
      headaches: "Headaches",
      heartCondition: "Heart condition",
      hypertension: "Hypertension",
      kidneyDisease: "Kidney disease",
      multipleSclerosis: "Multiple sclerosis",
      neurologicalCondition: "Neurological condition",
      neuropathy: "Neuropathy",
      osteoarthritis: "Osteoarthritis",
      osteoporosis: "Osteoporosis",
      phlebitis: "Phlebitis",
      sciatica: "Sciatica",
      seizures: "Seizures",
      stroke: "Stroke",
      tendinitis: "Tendinitis",
      tmjDisorder: "TMJ disorder",
      varicoseVeins: "Varicose veins",
      vertigoDizziness: "Vertigo / dizziness",
    };

    const healthConditionsData = Object.entries(formData.healthConditions)
      .filter(([_, value]) => value === "yes")
      .map(([key]) => [healthConditionLabels[key], "Yes"]);

    if (healthConditionsData.length > 0) {
      autoTable(doc, {
        startY: yPos,
        head: [["Condition", "Yes"]],
        body: healthConditionsData,
        theme: "grid",
        headStyles: { fillColor: [75, 96, 67] },
        styles: { fontSize: 9 },
        columnStyles: { 0: { cellWidth: 140 }, 1: { cellWidth: 40 } },
      });

      yPos = doc.lastAutoTable.finalY + 15;
    } else {
      doc.setFontSize(10);
      doc.text("None reported", 14, yPos);
      yPos += 10;
    }

    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }

    // Massage Information
    doc.setFontSize(14);
    doc.text("Massage Information", 14, yPos);
    yPos += 10;

    const massageInfo = [
      [
        "Previous Massage:",
        `${formData.previousMassage}${
          formData.previousMassage === "yes" && formData.howRecently
            ? ` - ${formData.howRecently}`
            : ""
        }`,
      ],
      [
        "Reason:",
        Object.entries(formData.reasonForMassage)
          .filter(([_, val]) => val)
          .map(([key]) => key.replace(/([A-Z])/g, " $1").trim())
          .join(", ") || "None",
      ],
      ["Areas of Discomfort:", formData.areasOfDiscomfort || ""],
      ["Pressure Preference:", formData.pressurePreference || ""],
    ];

    autoTable(doc, {
      startY: yPos,
      head: [["Field", "Value"]],
      body: massageInfo,
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

    // Signature
    doc.setFontSize(14);
    doc.text("Acknowledgment", 14, yPos);
    yPos += 10;

    const disclaimerText =
      "By signing below, I acknowledge that I am aware of the benefits and risks of massage therapy and that I have completed this form to the best of my knowledge. I also agree to inform my massage therapist of any health or medical changes.";

    const splitDisclaimer = doc.splitTextToSize(disclaimerText, 180);
    doc.setFontSize(10);
    doc.text(splitDisclaimer, 14, yPos);
    yPos += splitDisclaimer.length * 5 + 10;

    const signatureInfo = [
      ["Signature:", formData.signature || ""],
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
    const fileName = `BodyworkForm_${formData.name}_${
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
            CLIENT INTAKE FORM - THERAPEUTIC MASSAGE
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
            className="space-y-8 md:mt-[1600px] mt-[3200px]"
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
                    Phone (cell/day) *
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
                    City/State/Zip
                  </label>
                  <input
                    type="text"
                    name="cityStateZip"
                    value={formData.cityStateZip}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-1">
                    Emergency Contact Name
                  </label>
                  <input
                    type="text"
                    name="emergencyContactName"
                    value={formData.emergencyContactName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-1">
                    Emergency Phone
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
                    Occupation
                  </label>
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-1">
                    Relationship
                  </label>
                  <input
                    type="text"
                    name="relationship"
                    value={formData.relationship}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-1">
                    Referred by
                  </label>
                  <input
                    type="text"
                    name="referredBy"
                    value={formData.referredBy}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-1">
                    Age
                  </label>
                  <input
                    type="text"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0]"
                  />
                </div>
              </div>
            </section>

            {/* Health Information Section */}
            <section className="border-b-2 border-[#A8C3A0] pb-6">
              <h3 className="text-xl font-bold text-[#4B6043] mb-4 font-heading">
                Health Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-2">
                    Are you taking any medications?
                  </label>
                  <div className="flex gap-4 mb-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="medications"
                        value="yes"
                        checked={formData.medications === "yes"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="medications"
                        value="no"
                        checked={formData.medications === "no"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>No</span>
                    </label>
                  </div>
                  {formData.medications === "yes" && (
                    <textarea
                      name="medicationsList"
                      value={formData.medicationsList}
                      onChange={handleInputChange}
                      placeholder="If yes, please list:"
                      rows="2"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0]"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-2">
                    Any allergies? (oils, lotions, nuts, fruits, skin, etc.)
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
                    <textarea
                      name="allergiesList"
                      value={formData.allergiesList}
                      onChange={handleInputChange}
                      placeholder="If yes, please list:"
                      rows="2"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0]"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-2">
                    Are you pregnant?
                  </label>
                  <div className="flex gap-4 mb-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="pregnant"
                        value="yes"
                        checked={formData.pregnant === "yes"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="pregnant"
                        value="no"
                        checked={formData.pregnant === "no"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>No</span>
                    </label>
                  </div>
                  {formData.pregnant === "yes" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="pregnancyMonths"
                        value={formData.pregnancyMonths}
                        onChange={handleInputChange}
                        placeholder="If yes, how many months:"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0]"
                      />
                      <input
                        type="date"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleInputChange}
                        placeholder="Due date:"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0]"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-2">
                    Are you currently under medical supervision or receiving
                    other medical interventions?
                  </label>
                  <div className="flex gap-4 mb-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="medicalSupervision"
                        value="yes"
                        checked={formData.medicalSupervision === "yes"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="medicalSupervision"
                        value="no"
                        checked={formData.medicalSupervision === "no"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>No</span>
                    </label>
                  </div>
                  {formData.medicalSupervision === "yes" && (
                    <textarea
                      name="medicalSupervisionDescription"
                      value={formData.medicalSupervisionDescription}
                      onChange={handleInputChange}
                      placeholder="If yes, please describe:"
                      rows="2"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0]"
                    />
                  )}
                </div>

                {/* Health Conditions Checklist */}
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-3">
                    Health Conditions (Please check if applicable):
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      { key: "areasOfSwelling", label: "Areas of swelling" },
                      {
                        key: "autoimmuneDisorder",
                        label: "Autoimmune disorder",
                      },
                      {
                        key: "backNeckProblems",
                        label: "Back / neck problems",
                      },
                      { key: "bleedingDisorders", label: "Bleeding disorders" },
                      { key: "bloodClots", label: "Blood clots" },
                      { key: "bruiseEasily", label: "Bruise easily" },
                      { key: "bursitis", label: "Bursitis" },
                      { key: "cancer", label: "Cancer" },
                      {
                        key: "contagiousCondition",
                        label: "Contagious condition",
                      },
                      {
                        key: "decreasedSensation",
                        label: "Decreased sensation",
                      },
                      { key: "diabetes", label: "Diabetes" },
                      { key: "fibromyalgia", label: "Fibromyalgia" },
                      { key: "headaches", label: "Headaches" },
                      { key: "heartCondition", label: "Heart condition" },
                      { key: "hypertension", label: "Hypertension" },
                      { key: "kidneyDisease", label: "Kidney disease" },
                      { key: "multipleSclerosis", label: "Multiple sclerosis" },
                      {
                        key: "neurologicalCondition",
                        label: "Neurological condition",
                      },
                      { key: "neuropathy", label: "Neuropathy" },
                      { key: "osteoarthritis", label: "Osteoarthritis" },
                      { key: "osteoporosis", label: "Osteoporosis" },
                      { key: "phlebitis", label: "Phlebitis" },
                      { key: "sciatica", label: "Sciatica" },
                      { key: "seizures", label: "Seizures" },
                      { key: "stroke", label: "Stroke" },
                      { key: "tendinitis", label: "Tendinitis" },
                      { key: "tmjDisorder", label: "TMJ disorder" },
                      { key: "varicoseVeins", label: "Varicose veins" },
                      { key: "vertigoDizziness", label: "Vertigo / dizziness" },
                    ].map(({ key, label }) => (
                      <div
                        key={key}
                        className="flex items-center justify-between border-b border-gray-200 pb-1"
                      >
                        <span className="text-sm text-[#2E2E2E]">{label}</span>
                        <div className="flex gap-3">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name={`healthConditions.${key}`}
                              value="no"
                              checked={formData.healthConditions[key] === "no"}
                              onChange={handleInputChange}
                              className="mr-1"
                            />
                            <span className="text-xs">No</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name={`healthConditions.${key}`}
                              value="yes"
                              checked={formData.healthConditions[key] === "yes"}
                              onChange={handleInputChange}
                              className="mr-1"
                            />
                            <span className="text-xs">Yes</span>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-2">
                    Areas of broken skin? (e.g. rash, wounds)
                  </label>
                  <div className="flex gap-4 mb-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="brokenSkin"
                        value="yes"
                        checked={formData.brokenSkin === "yes"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="brokenSkin"
                        value="no"
                        checked={formData.brokenSkin === "no"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>No</span>
                    </label>
                  </div>
                  {formData.brokenSkin === "yes" && (
                    <input
                      type="text"
                      name="brokenSkinLocation"
                      value={formData.brokenSkinLocation}
                      onChange={handleInputChange}
                      placeholder="If yes, where?"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0]"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-2">
                    History of joint replacement surgery?
                  </label>
                  <div className="flex gap-4 mb-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="jointReplacement"
                        value="yes"
                        checked={formData.jointReplacement === "yes"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="jointReplacement"
                        value="no"
                        checked={formData.jointReplacement === "no"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>No</span>
                    </label>
                  </div>
                  {formData.jointReplacement === "yes" && (
                    <input
                      type="text"
                      name="jointReplacementLocation"
                      value={formData.jointReplacementLocation}
                      onChange={handleInputChange}
                      placeholder="Which joint(s)?"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0]"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-2">
                    Recent injuries or medical procedures in the past 2 years?
                  </label>
                  <div className="flex gap-4 mb-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="recentInjuries"
                        value="yes"
                        checked={formData.recentInjuries === "yes"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="recentInjuries"
                        value="no"
                        checked={formData.recentInjuries === "no"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>No</span>
                    </label>
                  </div>
                  {formData.recentInjuries === "yes" && (
                    <textarea
                      name="recentInjuriesDescription"
                      value={formData.recentInjuriesDescription}
                      onChange={handleInputChange}
                      placeholder="Please describe:"
                      rows="2"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0]"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-1">
                    Please describe any other injuries or health conditions:
                  </label>
                  <textarea
                    name="otherHealthConditions"
                    value={formData.otherHealthConditions}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0]"
                  />
                </div>
              </div>
            </section>

            {/* Massage Information Section */}
            <section className="border-b-2 border-[#A8C3A0] pb-6">
              <h3 className="text-xl font-bold text-[#4B6043] mb-4 font-heading">
                Massage Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-2">
                    Have you had professional massage before?
                  </label>
                  <div className="flex gap-4 mb-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="previousMassage"
                        value="yes"
                        checked={formData.previousMassage === "yes"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="previousMassage"
                        value="no"
                        checked={formData.previousMassage === "no"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>No</span>
                    </label>
                  </div>
                  {formData.previousMassage === "yes" && (
                    <input
                      type="text"
                      name="howRecently"
                      value={formData.howRecently}
                      onChange={handleInputChange}
                      placeholder="How recently?"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0]"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-2">
                    Reason for seeking massage:
                  </label>
                  <div className="flex flex-wrap gap-4 mb-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="reasonForMassage.relaxation"
                        checked={formData.reasonForMassage.relaxation}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>Relaxation</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="reasonForMassage.specificProblem"
                        checked={formData.reasonForMassage.specificProblem}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>Specific problem</span>
                    </label>
                  </div>
                  <textarea
                    name="areasOfDiscomfort"
                    value={formData.areasOfDiscomfort}
                    onChange={handleInputChange}
                    placeholder="Please indicate any areas of discomfort"
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C3A0]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#4B6043] mb-2">
                    How much pressure do you prefer?
                  </label>
                  <div className="flex flex-wrap gap-4">
                    {["Light", "Medium", "Firm"].map((option) => (
                      <label key={option} className="flex items-center">
                        <input
                          type="radio"
                          name="pressurePreference"
                          value={option}
                          checked={formData.pressurePreference === option}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Acknowledgment Section */}
            <section className="border-b-2 border-[#A8C3A0] pb-6">
              <h3 className="text-xl font-bold text-[#4B6043] mb-4 font-heading">
                Acknowledgment
              </h3>
              <p className="text-sm text-[#2E2E2E] mb-4 leading-relaxed">
                By signing below, I acknowledge that I am aware of the benefits
                and risks of massage therapy and that I have completed this form
                to the best of my knowledge. I also agree to inform my massage
                therapist of any health or medical changes.
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

export default BodyworkForm;
