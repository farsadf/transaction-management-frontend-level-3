import type { Transaction } from "../types";

const formatCurrency = (() => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

  return (value: number) => formatter.format(value);
})();

const calculateBalance = (transactions: Transaction[], accountId: string) => {
  return transactions.reduce((balance, transaction) => {
    if (transaction.account_id === accountId)
      return balance + transaction.amount;

    return balance;
  }, 0);
};

export { formatCurrency, calculateBalance };
