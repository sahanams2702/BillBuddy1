import React, { useState } from "react";
import "../styles/UploadInvoice.css"; // Make sure to create this stylesheet

const UploadInvoice = () => {
  const [invoiceFile, setInvoiceFile] = useState(null);

  const handleFileChange = (e) => {
    // Handle file changes here
    const file = e.target.files[0];
    setInvoiceFile(file);
  };

  const handleUpload = () => {
    // Handle upload logic here
    if (invoiceFile) {
      // Perform the upload, you can use axios or fetch here
      console.log("File uploaded:", invoiceFile.name);
      // Reset the file state after upload
      setInvoiceFile(null);
    } else {
      alert("Please choose a file to upload."); 
    }
  };

  return (
    <div className="upload-invoice-page">
      
      <div className="content">
        <h2>Upload Your Invoice</h2>
        <p>Choose your invoice file and click the upload button.</p>
        <input
          type="file"
          accept=".pdf, .doc, .docx"
          onChange={handleFileChange}
        />
        <button onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
};

export default UploadInvoice;
