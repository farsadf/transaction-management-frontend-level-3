import { ref } from "vue";

import { sendTransaction } from "../apis";

import type { Transaction, TransactionDTO } from "../types";

const useTransactionForm = (
  addTransaction: (transaction: Transaction) => void
) => {
  const isSubmitting = ref<boolean>(false);
  const errorMessage = ref<string | null>(null);

  const submitTransaction = (event: Event) => {
    isSubmitting.value = true;
    errorMessage.value = "";

    const form = event.target as HTMLFormElement;

    const transaction: TransactionDTO = {
      amount: parseInt(form.amount.value, 10),
      account_id: form.accountId.value,
    };

    if (transaction.amount === 0) {
      errorMessage.value = "Amount must be greater than 0";
      isSubmitting.value = false;
      return;
    }

    sendTransaction(transaction)
      .then((result) => {
        addTransaction(result);

        form.reset();
      })
      .catch((error: Error) => {
        errorMessage.value = error.message;
      })
      .finally(() => {
        isSubmitting.value = false;
      });
  };

  return {
    submitTransaction,

    isSubmitting,
    errorMessage,
  };
};

export default useTransactionForm;
