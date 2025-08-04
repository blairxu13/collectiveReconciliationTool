export async function parseCsv(file) {
  const text = await file.text(); // read file into text
  const lines = text.split("\n").filter(line => line.trim() !== ""); // get each line
  const headers = lines[0].split(",").map(h => h.trim()); // extract header

  const result = [];

  // check type: transaction or bank file
  if (headers[1] === "amount") {
    // it's a transactions file
    for (let i = 1; i < lines.length; i++) {
      const [date, amountStr] = lines[i].split(",");
      result.push({
        date: date.trim(),
        amount: parseFloat(amountStr.trim())
      });
    }
    result.sort((a, b) => new Date(a.date) - new Date(b.date));
  } else if (headers[1] === "balance") {
    // it's a bank file
    for (let i = 1; i < lines.length; i++) {
      const [date, balanceStr] = lines[i].split(",");
      result.push({
        date: date.trim(),
        balance: parseFloat(balanceStr.trim())
      });
    }
  } else {
    throw new Error("Unknown file format, please check the format!");
  }

  return result;
}
