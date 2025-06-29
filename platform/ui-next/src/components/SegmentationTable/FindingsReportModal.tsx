import React, { useState, useEffect } from 'react';
import { Dialog } from './Dialog';
import { jsPDF } from 'jspdf';

// Utility function to format date from YYYYMMDD to YYYY-MM-DD
// PatientDOB "19880602"
const formatDateFromDICOM = dicomDate => {
  if (!dicomDate || dicomDate.length !== 8) {
    return '';
  }
  const year = dicomDate.substring(0, 4);
  const month = dicomDate.substring(4, 6);
  const day = dicomDate.substring(6, 8);
  return `${year}-${month}-${day}`;
};

// Utility function to extract patient name from DICOM format
const formatPatientName = patientNameObj => {
  if (!patientNameObj) {
    return '';
  }

  // Handle different formats of patient name
  if (typeof patientNameObj === 'string') {
    return patientNameObj;
  }

  // Handle DICOM PersonName format
  if (patientNameObj.Alphabetic) {
    return patientNameObj.Alphabetic;
  }

  // Handle array format or proxy object
  if (patientNameObj[0] && typeof patientNameObj[0] === 'object') {
    const nameComponents = patientNameObj[0];
    if (nameComponents.Alphabetic) {
      return nameComponents.Alphabetic;
    }
  }

  // Fallback to string representation
  return patientNameObj.toString ? patientNameObj.toString() : '';
};

// Enhanced PDF generation function with improved formatting
const generateAndDownloadPDF = async formData => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - 2 * margin;

  let yPosition = margin;
  const lineHeight = 6;
  const sectionSpacing = 6;

  // Helper function to add header
  const addHeader = (isSubsequentPage = false) => {
    const headerY = margin;
    doc.setFont('arial', 'bold');
    doc.setFontSize(14);

    if (!isSubsequentPage) {
      doc.text('PSMA PET/CT IMAGING REPORT', pageWidth / 2, headerY, { align: 'center' });
    }

    doc.setFontSize(10);
    doc.setFont('arial', 'normal');
    const institutionInfo = [
      'Department of Radiology',
      formData.institutionName || 'Institution Name',
      '123 Medical Center Drive, City, State 12345',
    ];

    institutionInfo.forEach((line, index) => {
      doc.text(line, pageWidth - margin, headerY + index * 5, { align: 'right' });
    });

    // Logo placeholder
    doc.setFontSize(8);
    doc.text('[Institution Logo]', margin, headerY);

    return headerY + 20;
  };

  // Helper function to check if we need a new page
  const checkPageBreak = requiredHeight => {
    if (yPosition + requiredHeight > pageHeight - margin - 10) {
      doc.addPage();
      yPosition = addHeader(true); // Add header for subsequent pages
      return true;
    }
    return false;
  };

  // Helper function to add text with word wrapping
  const addWrappedText = (text, x, y, maxWidth, fontSize = 10, isBold = false) => {
    doc.setFontSize(fontSize);
    doc.setFont('arial', isBold ? 'bold' : 'normal');

    const lines = doc.splitTextToSize(text, maxWidth);
    let currentY = y;

    lines.forEach(line => {
      checkPageBreak(lineHeight);
      doc.text(line, x, currentY);
      currentY += lineHeight;
    });

    return currentY;
  };

  // Helper function to add section
  const addSection = (title, content, titleX = margin, contentX = margin) => {
    checkPageBreak(lineHeight * 3);

    // Section title
    doc.setFont('arial', 'bold');
    doc.setFontSize(12);
    doc.text(title, titleX, yPosition);
    yPosition += lineHeight;

    // Section content
    doc.setFont('arial', 'normal');
    doc.setFontSize(10);
    yPosition = addWrappedText(content, contentX, yPosition, contentWidth - (contentX - margin));

    // Add horizontal line after content
    yPosition += lineHeight / 2;
    // yPosition = addHorizontalLine(yPosition);

    yPosition += sectionSpacing;
    return yPosition;
  };

  // Helper function to add numbered impression
  const addNumberedImpression = items => {
    checkPageBreak(lineHeight * (items.split('\n').length + 2));

    doc.setFont('arial', 'bold');
    doc.setFontSize(12);
    doc.text('IMPRESSION:', margin, yPosition);
    yPosition += lineHeight;

    doc.setFont('arial', 'normal');
    doc.setFontSize(10);

    items.split('\n').forEach((item, index) => {
      if (item.trim()) {
        const text = `${index + 1}. ${item.trim()}`;
        yPosition = addWrappedText(text, margin + 5, yPosition, contentWidth - 5);
        yPosition += lineHeight / 2;
      }
    });

    // Add horizontal line after impression
    yPosition += lineHeight / 2;
    // yPosition = addHorizontalLine(yPosition);

    yPosition += sectionSpacing;
    return yPosition;
  };

  // Helper function to add horizontal line
  const addHorizontalLine = (y, fullWidth = true) => {
    const startX = fullWidth ? margin : margin + 5;
    const endX = fullWidth ? pageWidth - margin : pageWidth - margin - 5;
    doc.setLineWidth(0.3);
    doc.line(startX, y, endX, y);
    return y + 3;
  };

  // Calculate age helper
  const calculateAge = dob => {
    if (!dob) {
      return 'N/A';
    }
    try {
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    } catch (error) {
      return 'N/A';
    }
  };

  // Add header for first page
  yPosition = addHeader();
  yPosition = addHorizontalLine(yPosition);
  yPosition += 5;

  // Patient Information Section
  doc.setFont('arial', 'bold');
  doc.setFontSize(12);
  doc.text('PATIENT INFORMATION:', margin, yPosition);
  yPosition += lineHeight;

  const leftColumnX = margin + 5;
  const rightColumnX = pageWidth / 2;
  let leftY = yPosition;
  let rightY = yPosition;

  // Left column
  const leftFields = [
    { label: 'Patient Name:', value: (formData.patientName || 'N/A').toUpperCase() },
    { label: 'MRN:', value: formData.mrn || 'N/A' },
    { label: 'Referring Physician:', value: (formData.referringPhysician || 'N/A').toUpperCase() },
  ];

  leftFields.forEach(field => {
    doc.setFont('arial', 'bold');
    doc.setFontSize(10);
    doc.text(field.label, leftColumnX, leftY);
    doc.setFont('arial', 'normal');
    leftY = addWrappedText(field.value, leftColumnX, leftY + lineHeight, contentWidth / 2 - 5);
    leftY += lineHeight;
  });

  // Right column
  const rightFields = [
    {
      label: 'Exam Date:',
      value: formData.examDate
        ? new Date(formData.examDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        : 'N/A',
    },
    {
      label: 'DOB:',
      value: formData.dob
        ? `${new Date(formData.dob).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })} (Age: ${calculateAge(formData.dob)})`
        : 'N/A',
    },
    { label: 'Study:', value: formData.studyDescription || 'PSMA PET/CT' },
  ];

  rightFields.forEach(field => {
    doc.setFont('arial', 'bold');
    doc.setFontSize(10);
    doc.text(field.label, rightColumnX, rightY);
    doc.setFont('arial', 'normal');
    rightY = addWrappedText(field.value, rightColumnX, rightY + lineHeight, contentWidth / 2 - 5);
    rightY += lineHeight;
  });

  yPosition = Math.max(leftY, rightY) + lineHeight / 2;
  yPosition = addHorizontalLine(yPosition);
  yPosition += sectionSpacing;

  // Report Sections
  const sections = [
    { title: 'CLINICAL INDICATION:', content: formData.clinicalHistory },
    {
      title: 'TECHNIQUE:',
      content:
        formData.technique ||
        'PSMA PET/CT performed from skull base to mid-thigh following administration of [X] mCi of [F-18/Ga-68] PSMA-11.',
    },
    { title: 'COMPARISON:', content: formData.comparison || 'None.' },
    {
      title: 'RADIOPHARMACEUTICAL:',
      content: formData.radiopharmaceutical || '[F-18/Ga-68] PSMA-11, [X] mCi, IV administration.',
    },
    { title: 'FINDINGS:', content: formData.report || 'No evidence of PSMA-avid disease.' },
  ];

  sections.forEach(section => {
    if (section.content) {
      yPosition = addSection(section.title, section.content);
    }
  });

  // Impression Section (Numbered)
  if (formData.conclusion) {
    yPosition = addNumberedImpression(formData.conclusion);
  }

  // Reporting Physician
  yPosition += 5;
  yPosition = addSection(
    'REPORTING PHYSICIAN:',
    `${formData.reportingPhysician || 'N/A'}\n${new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })}`
  );

  // Footer
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setFont('arial', 'normal');

    // Page number
    const pageText = `Page ${i} of ${pageCount}`;
    doc.text(pageText, pageWidth - margin, pageHeight - 10, { align: 'right' });

    // Timestamp
    const timestamp = `Generated: ${new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })}`;
    doc.text(timestamp, margin, pageHeight - 10);
  }

  // Generate filename
  const fileName = `PSMA_PETCT_Report_${formData.patientName?.replace(/[^a-zA-Z0-9]/g, '_') || 'Patient'}_${new Date().toISOString().split('T')[0]}.pdf`;

  // Save and open
  const pdfBlob = doc.output('blob');
  const url = URL.createObjectURL(pdfBlob);
  window.open(url, '_blank');
  doc.save(fileName);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};

const FindingsReportModal = ({ studyMetadata, AllSegmentations, patientMetaData }) => {
  console.log('studyMetadata', studyMetadata);
  console.log('AllSegmentations', AllSegmentations);
  console.log('patientMetaData', patientMetaData);

  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  console.log(
    'PatientDOB',
    patientMetaData?.PatientDOB,
    '  ',
    formatDateFromDICOM(patientMetaData?.PatientDOB)
  );

  // Initialize formData with pre-populated data from metadata
  const getInitialFormData = () => {
    return {
      patientName: formatPatientName(patientMetaData?.PatientName) || '',
      mrn: patientMetaData?.PatientID || '',
      referringPhysician: patientMetaData?.ReferringPhysicianName || '',
      reportingPhysician: 'Dr. [Radiologist Name], MD',
      examDate: formatDateFromDICOM(studyMetadata?.StudyDate) || '2025-06-29',
      dob: formatDateFromDICOM(patientMetaData?.PatientDOB) || '2025-06-29',
      clinicalHistory: 'History of prostate cancer. Evaluation for disease extent and staging.',
      technique: `Whole-body PET/CT imaging was performed 60 minutes following intravenous administration of 185 MBq (5.0 mCi) of 68Ga-PSMA-11. Images were acquired from the vertex of the skull to the upper thighs. CT images were obtained for attenuation correction and anatomical correlation.`,
      radiopharmaceutical: '68Ga-PSMA-11 (Gallium-68 PSMA), 185 MBq (5.0 mCi) IV',
      comparison: 'No prior PSMA PET/CT available for comparison.',
      report: '',
      conclusion: '',
      studyInstanceUID: studyMetadata?.StudyInstanceUID || '',
      studyDescription: studyMetadata?.StudyDescription || 'PSMA PET/CT WHOLE BODY',
      institutionName: studyMetadata?.InstitutionName || 'Nuclear Medicine Department',
      seriesDescription: studyMetadata?.SeriesDescription || 'PET/CT',
    };
  };

  const [formData, setFormData] = useState(getInitialFormData());

  // Update form data when metadata changes (only if form is not already populated)
  useEffect(() => {
    if ((studyMetadata || patientMetaData) && !formData.patientName && !formData.mrn) {
      setFormData(getInitialFormData());
    }
  }, [studyMetadata, patientMetaData]);

  // Handle dialog close
  const onClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  // Handle minimize
  const onMinimize = () => {
    setIsMinimized(true);
    setIsOpen(false);
  };

  // Handle restore from minimized state
  const onRestore = () => {
    setIsMinimized(false);
    setIsOpen(true);
  };

  // Handle Esc key to close dialog
  useEffect(() => {
    const handleEsc = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    }
  }, [isOpen]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!formData.patientName || !formData.mrn || !formData.report) {
      alert('Please fill in required fields: Patient Name, MRN, and Findings.');
      return;
    }

    console.log('Report Data:', formData);

    try {
      // Generate and download PDF
      await generateAndDownloadPDF(formData);

      // Close the modal
      onClose();
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  const dialogTitle = 'PSMA PET/CT Findings Report Generation';

  return (
    <>
      {/* Main Button or Minimized Button */}
      {isMinimized ? (
        <button
          onClick={onRestore}
          className="bg-primary-main hover:bg-primary-main/50 fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full px-3 py-2 text-white shadow-lg"
          type="button"
        >
          <span className="text-sm">📄</span>
          <span className="text-xs">Report Draft</span>
        </button>
      ) : (
        !isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="bg-primary-main hover:bg-primary-main/50 w-full rounded p-2 text-white"
            type="button"
          >
            Generate Findings Report
          </button>
        )
      )}

      <Dialog
        isOpen={isOpen}
        onClose={onClose}
        title={dialogTitle}
      >
        <div
          className="max-h-[80vh] overflow-y-auto rounded-lg p-6"
          style={{ backgroundColor: 'rgb(9, 12, 42)' }}
        >
          {/* Header with minimize button */}
          <div className="mb-4 -mt-2 flex items-center justify-between">
            <h2
              className="text-lg font-semibold"
              style={{ color: 'rgb(125, 179, 207)' }}
            >
              PSMA PET/CT Report
            </h2>
            <button
              onClick={onMinimize}
              className="rounded px-2 py-1 text-sm text-gray-400 hover:text-white"
              type="button"
              title="Minimize (save progress)"
            >
              ➖ Minimize
            </button>
          </div>
          <div className="space-y-6">
            <div className="space-y-4">
              {/* Patient Details */}
              <div>
                <h3
                  className="text-lg font-semibold"
                  style={{ color: 'rgb(125, 179, 207)' }}
                >
                  Patient Information
                </h3>
                <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label
                      className="mb-1 block text-sm font-medium"
                      style={{ color: 'rgb(125, 179, 207)' }}
                    >
                      Patient Name *
                    </label>
                    <input
                      type="text"
                      name="patientName"
                      value={formData.patientName}
                      onChange={handleInputChange}
                      placeholder="Enter patient name"
                      className="w-full rounded border border-gray-700 bg-gray-800 px-2 py-1 text-white"
                      required
                    />
                  </div>
                  <div>
                    <label
                      className="mb-1 block text-sm font-medium"
                      style={{ color: 'rgb(125, 179, 207)' }}
                    >
                      MRN *
                    </label>
                    <input
                      type="text"
                      name="mrn"
                      value={formData.mrn}
                      onChange={handleInputChange}
                      placeholder="Enter Medical Record Number"
                      className="w-full rounded border border-gray-700 bg-gray-800 px-2 py-1 text-white"
                      required
                    />
                  </div>
                  <div>
                    <label
                      className="mb-1 block text-sm font-medium"
                      style={{ color: 'rgb(125, 179, 207)' }}
                    >
                      Referring Physician
                    </label>
                    <input
                      type="text"
                      name="referringPhysician"
                      value={formData.referringPhysician}
                      onChange={handleInputChange}
                      placeholder="Enter referring physician name"
                      className="w-full rounded border border-gray-700 bg-gray-800 px-2 py-1 text-white"
                    />
                  </div>
                  <div>
                    <label
                      className="mb-1 block text-sm font-medium"
                      style={{ color: 'rgb(125, 179, 207)' }}
                    >
                      Reporting Physician
                    </label>
                    <input
                      type="text"
                      name="reportingPhysician"
                      value={formData.reportingPhysician}
                      onChange={handleInputChange}
                      placeholder="Enter reporting physician name"
                      className="w-full rounded border border-gray-700 bg-gray-800 px-2 py-1 text-white"
                    />
                  </div>
                  <div>
                    <label
                      className="mb-1 block text-sm font-medium"
                      style={{ color: 'rgb(125, 179, 207)' }}
                    >
                      Exam Date
                    </label>
                    <input
                      type="date"
                      name="examDate"
                      value={formData.examDate}
                      onChange={handleInputChange}
                      className="w-full rounded border border-gray-700 bg-gray-800 px-2 py-1 text-white"
                    />
                  </div>
                  <div>
                    <label
                      className="mb-1 block text-sm font-medium"
                      style={{ color: 'rgb(125, 179, 207)' }}
                    >
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                      className="w-full rounded border border-gray-700 bg-gray-800 px-2 py-1 text-white"
                    />
                  </div>
                  <div>
                    <label
                      className="mb-1 block text-sm font-medium"
                      style={{ color: 'rgb(125, 179, 207)' }}
                    >
                      Institution
                    </label>
                    <input
                      type="text"
                      name="institutionName"
                      value={formData.institutionName}
                      onChange={handleInputChange}
                      placeholder="Enter institution name"
                      className="w-full rounded border border-gray-700 bg-gray-800 px-2 py-1 text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Clinical History */}
              <div>
                <label
                  className="mb-1 block text-sm font-medium"
                  style={{ color: 'rgb(125, 179, 207)' }}
                >
                  Clinical History
                </label>
                <textarea
                  name="clinicalHistory"
                  value={formData.clinicalHistory}
                  onChange={handleInputChange}
                  placeholder="Enter clinical history"
                  className="w-full rounded border border-gray-700 bg-gray-800 px-2 py-1 text-white"
                  rows="3"
                />
              </div>

              {/* Technique */}
              <div>
                <label
                  className="mb-1 block text-sm font-medium"
                  style={{ color: 'rgb(125, 179, 207)' }}
                >
                  Technique
                </label>
                <textarea
                  name="technique"
                  value={formData.technique}
                  onChange={handleInputChange}
                  className="w-full rounded border border-gray-700 bg-gray-800 px-2 py-1 text-white"
                  rows="4"
                />
              </div>

              {/* Radiopharmaceutical */}
              <div>
                <label
                  className="mb-1 block text-sm font-medium"
                  style={{ color: 'rgb(125, 179, 207)' }}
                >
                  Radiopharmaceutical
                </label>
                <input
                  type="text"
                  name="radiopharmaceutical"
                  value={formData.radiopharmaceutical}
                  onChange={handleInputChange}
                  placeholder="Enter radiopharmaceutical details"
                  className="w-full rounded border border-gray-700 bg-gray-800 px-2 py-1 text-white"
                />
              </div>

              {/* Comparison */}
              <div>
                <label
                  className="mb-1 block text-sm font-medium"
                  style={{ color: 'rgb(125, 179, 207)' }}
                >
                  Comparison
                </label>
                <textarea
                  name="comparison"
                  value={formData.comparison}
                  onChange={handleInputChange}
                  placeholder="Enter comparison with prior studies"
                  className="w-full rounded border border-gray-700 bg-gray-800 px-2 py-1 text-white"
                  rows="2"
                />
              </div>

              {/* Report */}
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <label
                    className="block text-sm font-medium"
                    style={{ color: 'rgb(125, 179, 207)' }}
                  >
                    Findings *
                  </label>
                </div>
                <textarea
                  name="report"
                  value={formData.report}
                  onChange={handleInputChange}
                  placeholder="Enter detailed findings from the PSMA PET/CT study"
                  className="w-full rounded border border-gray-700 bg-gray-800 px-2 py-1 text-white"
                  rows="8"
                  required
                />
              </div>

              {/* Conclusion */}
              <div>
                <label
                  className="mb-1 block text-sm font-medium"
                  style={{ color: 'rgb(125, 179, 207)' }}
                >
                  Impression
                </label>
                <textarea
                  name="conclusion"
                  value={formData.conclusion}
                  onChange={handleInputChange}
                  placeholder="Enter summary and clinical impression"
                  className="w-full rounded border border-gray-700 bg-gray-800 px-2 py-1 text-white"
                  rows="4"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                onClick={onClose}
                className="rounded bg-gray-600 p-2 text-white hover:bg-gray-700"
                type="button"
              >
                Close
              </button>
              <button
                onClick={handleSave}
                className="bg-primary-main hover:bg-primary-main/50 rounded p-2 text-white"
                type="button"
              >
                Generate & Open PDF Report
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default FindingsReportModal;
