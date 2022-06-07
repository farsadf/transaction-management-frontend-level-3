import { onMounted, ref } from "vue";

import { getTransactions } from "../apis";

import type { Transaction } from "../types";

const useTransactions = () => {
  const transactions = ref<Transaction[]>([]);
  const isLoading = ref<boolean>(false);
  const errorMessage = ref<string | null>(null);

  const loadTransactions = () => {
    isLoading.value = true;

    getTransactions()
      .then((result) => {
        errorMessage.value = null;
        transactions.value = result;
      })
      .catch((error: Error) => {
        errorMessage.value = error.message;
      })
      .finally(() => {
        isLoading.value = false;
      });
  };

  const addTransaction = (transaction: Transaction) => {
    transactions.value.unshift(transaction);
  };

  onMounted(loadTransactions);

  return {
    transactions,
    isLoading,
    errorMessage,

    loadTransactions,
    addTransaction,
  };
};

export default useTransactions;
