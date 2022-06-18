import { computed } from "vue";

import { formatCurrency } from "../utils";

import type { Transaction } from "../types";

const useTransactionsListItem = ({
  transaction,
  balance,
}: {
  transaction: Transaction;
  balance?: number;
}) => {
  const transactionDirection = computed(() => {
    if (transaction.amount > 0) {
      return "to";
    }

    return "from";
  });

  const formattedBalance = computed(() => {
    return balance ? formatCurrency(balance) : "";
  });

  const transactionText = computed(() => {
    const amount = formatCurrency(Math.abs(transaction.amount));

    return `Transferred ${amount} ${transactionDirection.value} account ${transaction.account_id}`;
  });

  return {
    rawBalance: balance,
    transactionText,
    balance: formattedBalance,
  };
};

export default useTransactionsListItem;
