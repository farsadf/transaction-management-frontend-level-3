<script setup lang="ts">
import useTrasactionForm from "../composables/transactionForm";

import type { Transaction } from "../types";

type IProps = {
  addTransaction: (transaction: Transaction) => void;
};

const props = defineProps<IProps>();

const { submitTransaction, isSubmitting, errorMessage } = useTrasactionForm(
  props.addTransaction
);
</script>

<template>
  <div class="flex flex-col justify-start p-4">
    <h2 class="text-lg font-bold pb-4">Submit new transaction:</h2>

    <form
      class="flex flex-col p-4 border flex-grow"
      @submit.prevent="submitTransaction"
    >
      <label for="account-id">Account ID:</label>
      <input
        data-type="account-id"
        name="accountId"
        id="account-id"
        class="mb-4 border"
        required
        :disabled="isSubmitting"
      />

      <label for="amount">Amount:</label>
      <input
        data-type="amount"
        name="amount"
        id="amount"
        class="mb-4 border"
        type="text"
        pattern="[^0]\d+"
        required
        :disabled="isSubmitting"
      />

      <input
        data-type="transaction-submit"
        type="submit"
        class="border bg-gray-300 disabled:bg-white py-2"
        :value="isSubmitting ? 'Saving Transaction...' : 'Submit'"
        :disabled="isSubmitting"
      />

      <span class="text-red-800" v-if="errorMessage">{{ errorMessage }}</span>
    </form>
  </div>
</template>
