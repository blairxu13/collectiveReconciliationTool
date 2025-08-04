export default function ResultsModal({ report }) {
  if (!report) return null;

  const { verifiedUntil, mismatches } = report;

  return (
    <div style={{
      background: "white",
      padding: "1.5rem",
      borderRadius: "12px",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      maxWidth: "500px",
      margin: "2rem auto"
    }}>
      <h2 style={{ marginBottom: "1rem" }}>Reconciliation Report</h2>

      <p>
        Verified until <strong>{verifiedUntil}</strong>
      </p>

      {mismatches.length > 0 ? (
        <div style={{ color: "red", marginTop: "1rem" }}>
          <p>Mismatch on <strong>{mismatches[0].date}</strong>:</p>
          <p>Expected: {mismatches[0].expected}</p>
          <p>Actual: {mismatches[0].actual}</p>
          <p>Difference: {mismatches[0].difference}</p>
        </div>
      ) : (
        <p style={{ color: "green", marginTop: "1rem" }}>
          Congrats! All balances matches! no issues detected!
        </p>
      )}
    </div>
  );
}
