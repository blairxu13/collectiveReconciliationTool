export default function ResultsModal({ report }) {
  if (!report) return null;

  const { verifiedUntil, report: dailyResults } = report;

  return (
    <div style={{
      background: "white",
      padding: "1.5rem",
      borderRadius: "12px",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      maxWidth: "600px",
      margin: "2rem auto"
    }}>
      <h2 style={{ marginBottom: "1rem" }}>Reconciliation Report</h2>

      <p>
        Verified until <strong>{verifiedUntil}</strong>
      </p>

      <ul style={{ marginTop: "1rem", paddingLeft: 0 }}>
        {dailyResults.map((entry, idx) => (
          <li key={idx} style={{
            marginBottom: "0.75rem",
            listStyle: "none",
            color: entry.matched ? "green" : "red"
          }}>
            <strong>{entry.date}</strong> | {entry.matched ? "✅" : "❌"} Expected: {entry.expected} | Actual: {entry.actual} | Difference: {entry.difference}
          </li>
        ))}
      </ul>
    </div>
  );
}
