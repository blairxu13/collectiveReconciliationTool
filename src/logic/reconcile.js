export function reconcile(transactions, bankData) {
  const fullReport = [];
  const dailyTxMap = {};

  // Group transactions by day
  for (const { date, amount } of transactions) {
    if (!dailyTxMap[date]) dailyTxMap[date] = [];
    dailyTxMap[date].push(amount);
  }

  // Go through bankData starting from index 1
  for (let i = 1; i < bankData.length; i++) {
    const currentDay = bankData[i];
    const dayBefore = bankData[i - 1];
    const date = currentDay.date;
    const balanceBefore = dayBefore.balance;

    const todaysTx = dailyTxMap[date] || [];
    const totalTx = todaysTx.reduce((a, b) => a + b, 0);
    const predicted = Math.round((balanceBefore + totalTx) * 100) / 100;
    const actual = currentDay.balance;
    const difference = Math.round((actual - predicted) * 100) / 100;

    fullReport.push({
      date,
      expected: predicted,
      actual,
      difference,
      matched: predicted === actual
    });
  }

  return {
    verifiedUntil: bankData.at(-1)?.date || null,
    report: fullReport
  };
}
