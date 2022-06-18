<script setup lang="ts">
import TransactionForm from "./components/TransactionForm.vue";
import TransactionsList from "./components/TransactionsList.vue";

import useTransactions from "./composables/transactions";

const {
  transactions,
  isLoading,
  loadTransactions,
  errorMessage,
  addTransaction,
} = useTransactions();
</script>

<template>
  <div class="flex flex-row flex-wrap">
    <div class="md:w-[400px] w-full md:h-full md:border-r">
      <TransactionForm :add-transaction="addTransaction" />
    </div>

    <TransactionsList
      class="md:h-full flex-grow"
      :transactions="transactions"
      :isLoading="isLoading"
      :error-message="errorMessage"
      :retry="loadTransactions"
    />
  </div>
</template>
