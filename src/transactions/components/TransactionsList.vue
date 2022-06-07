<script setup lang="ts">
import TransactionsListItem from "./TransactionsListItem.vue";

import type { Transaction } from "../types";

type IProps = {
  transactions: Transaction[];
  isLoading: boolean;
  errorMessage: string | null;
  retry: () => void;
};

defineProps<IProps>();
</script>

<template>
  <div class="flex flex-col justify-start p-4">
    <h2 class="text-lg font-bold pb-4">Transaction History:</h2>

    <span v-if="isLoading">Loading Transactions...</span>

    <span v-else-if="errorMessage" class="text-red-800">
      {{ errorMessage }}
      <span class="cursor-pointer text-red-400" @click="retry">Retry</span>
    </span>

    <div class="flex flex-col flex-grow gap-4 overflow-auto">
      <transactions-list-item
        v-for="(transaction, index) in transactions"
        :key="transaction.transaction_id"
        :transaction="transaction"
        :show-balance="index === 0"
      />
    </div>
  </div>
</template>
