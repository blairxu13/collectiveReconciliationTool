import { useState, useEffect } from "react";

export default function FileUpload({ onFilesSelected }) {
  // Prevent default drag and drop behavior
  useEffect(() => {
    const preventDefaults = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    window.addEventListener("dragover", preventDefaults);
    window.addEventListener("drop", preventDefaults);

    return () => {
      window.removeEventListener("dragover", preventDefaults);
      window.removeEventListener("drop", preventDefaults);
    };
  }, []);

  // State for each file
  const [transactionFile, setTransactionFile] = useState(null);
  const [bankFile, setBankFile] = useState(null);

  // Handle drop event for transaction file
  const handleTransactionDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) setTransactionFile(file);
  };

  // Handle drop event for bank file
  const handleBankDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) setBankFile(file);
  };

  // Call parent with both files when ready
  const handleSubmit = () => {
    if (transactionFile && bankFile) {
      onFilesSelected({
        transactions: transactionFile,
        bank: bankFile,
      });
    }
  };

  return (
    <>
      {/* Drop zone for transaction file */}
      <div
        onDrop={handleTransactionDrop}
        onDragOver={(e) => e.preventDefault()}
        style={{
          padding: "1rem",
          border: "1px dashed gray",
          margin: "1rem 0",
        }}
      >
        Drop Transactions File
        {transactionFile && (
          <p style={{ color: "blue", marginTop: "0.5rem" }}>
            {transactionFile.name}
          </p>
        )}
      </div>

      {/* Drop zone for bank file */}
      <div
        onDrop={handleBankDrop}
        onDragOver={(e) => e.preventDefault()}
        style={{
          padding: "1rem",
          border: "1px dashed gray",
          margin: "1rem 0",
        }}
      >
        Drop Bank File
        {bankFile && (
          <p style={{ color: "blue", marginTop: "0.5rem" }}>
            {bankFile.name}
          </p>
        )}
      </div>

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        style={{
          marginTop: "1rem",
          padding: "0.75rem 1.5rem",
          backgroundColor: "#4CAF50",
          color: "white",
          fontSize: "1rem",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Check Files
      </button>
    </>
  );
}
