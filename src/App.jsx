import { useState } from "react";
import FileUpload from "./components/FileUpload";
import ResultsModal from "./ui/ResultsModal";
import { parseCsv } from "./logic/parseCsv";
import { reconcile } from "./logic/reconcile";

export default function App() {
  const [transactionsFile, setTransactionsFile] = useState(null);
  const [bankFile, setBankFile] = useState(null);
  const [report, setReport] = useState(null);

  // Callback when both files are uploaded
  const handleFilesSelected = async ({ transactions, bank }) => {
    // Save files to state (for reuse)
    setTransactionsFile(transactions);
    setBankFile(bank);

    // Parse both CSV files into structured arrays
    const txns = await parseCsv(transactions);
    const bankData = await parseCsv(bank);

    // Compare running transaction totals vs bank balances
    const result = reconcile(txns, bankData);

    // Save the reconciliation report to display to user
    setReport(result);
  };

  return (
    <div className="app-container">
      <FileUpload onFilesSelected={handleFilesSelected} />
      {report && <ResultsModal report={report} />}
    </div>
  );
}
