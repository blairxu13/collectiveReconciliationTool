export function reconcile(transactions, bankData) {
  const mismatches = [];
  let verifiedUntil = null;
  const dailyTxMap = {}; // holds grouped transactions by date

  // group transactions by day, some dates may have multiple
  for (const entry of transactions) {
    const { date, amount } = entry;
    if (!dailyTxMap[date]) {
      dailyTxMap[date] = [];
    }
    dailyTxMap[date].push(amount);
  }

  // use bank statement as the single source of truth
  for (let i = 1; i < bankData.length; i++) {
    const currentDay = bankData[i];
    const dayBefore = bankData[i - 1];
    const date = currentDay.date;
    const balanceBefore = dayBefore.balance;

    const todaysActivity = dailyTxMap[date] || []; // if nothing happened today, default to empty
    const todayTotal = todaysActivity.reduce((acc, val) => acc + val, 0);

    const predicted = Math.round((balanceBefore + todayTotal) * 100) / 100;
    const bankReported = currentDay.balance;

    // if what we expect != what bank says, flag it
    if (predicted !== bankReported) {
      mismatches.push({
        date,
        expected: predicted,
        actual: bankReported,
        difference: Math.round((bankReported - predicted) * 100) / 100
      });
      break;
    } else {
      verifiedUntil = date; // today's transaction looks right
    }
  }

  return {
    verifiedUntil,
    mismatches
  };
}
