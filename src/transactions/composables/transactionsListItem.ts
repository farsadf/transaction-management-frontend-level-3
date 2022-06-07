import { computed, ref, watch } from "vue";

import { getAccount } from "../apis";

import { formatCurrency } from "../../utils";

import type { Transaction } from "../types";

const useTransactionsListItem = ({
  transaction,
  showBalance,
}: {
  transaction: Transaction;
  showBalance: boolean;
}) => {
  const balance = ref<number | null>(null);
  const isLoadingBalance = ref<boolean>(false);
  const errorMessage = ref<string | null>(null);

  const loadAccountBalance = () => {
    isLoadingBalance.value = true;

    getAccount(transaction.account_id)
      .then((result) => {
        errorMessage.value = null;
        balance.value = result.balance;
      })
      .catch((error: Error) => {
        errorMessage.value = error.message;
      })
      .finally(() => {
        isLoadingBalance.value = false;
      });
  };

  const transactionDirection = computed(() => {
    if (transaction.amount > 0) {
      return "to";
    }

    return "from";
  });

  watch(
    () => showBalance,
    (show) => {
      if (show && balance.value === null) {
        loadAccountBalance();
      }
    },
    { immediate: true }
  );

  const formattedBalance = computed(() => formatCurrency(balance.value || 0));

  const transactionText = computed(() => {
    const amount = formatCurrency(Math.abs(transaction.amount));

    return `Transferred ${amount} ${transactionDirection.value} account ${transaction.account_id}`;
  });

  return {
    balance: formattedBalance,
    rawBalance: balance,
    isLoadingBalance,
    errorMessage,
    transactionText,

    retry: loadAccountBalance,
  };
};

export default useTransactionsListItem;
