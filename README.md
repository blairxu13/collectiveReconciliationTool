# Reconciliation Checker (Collective Version)

Quick app I built to compare a list of transactions with daily bank balances and see if they actually match up.

---

## What this does

You drop in two CSVs:
- one with transactions (`date`, `amount`)
- one with daily bank balances

Then the app checks:
> “If I apply all the transactions in order, does each day's total match the bank's reported balance?”

If anything's off, it flags the first mismatch and stops there.

---

## Assumptions

- CSVs are valid and sorted by date
- The bank statement is the source of truth
- Not handling weird formatting, timezones, or currencies for now

---

## How I approached it

- Grouped transactions by date (some days have multiple entries)
- Started from the first confirmed bank balance
- For each day:
  - Added that day’s total transactions to the previous day's balance
  - Compared the result to what the bank says
- If there’s a mismatch, I flag it 

---

## Edge cases I handled

- Multiple transactions in one day
- Days with no transactions (carry forward the previous balance)
- If there are fewer transaction days than bank entries, verification stops at the last matching day

---

## Tech stack

- React + Vite
- JavaScript

---

## How to run it

```bash
npm install
npm run dev
