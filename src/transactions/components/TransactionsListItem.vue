<script setup lang="ts">
import useTransactionsListItem from "../composables/transactionsListItem";

import type { Transaction } from "../types";

type IProps = {
  transaction: Transaction;
  showBalance: boolean;
};

const props = defineProps<IProps>();

const {
  balance,
  errorMessage,
  isLoadingBalance,
  retry,
  transactionText,
  rawBalance,
} = useTransactionsListItem(props);
</script>

<template>
  <div
    class="p-4 border flex flex-col gap-4"
    data-type="transaction"
    :data-account-id="transaction.account_id"
    :data-amount="transaction.amount"
    :data-balance="rawBalance"
  >
    <span>
      {{ transactionText }}
    </span>

    <template v-if="showBalance">
      <span v-if="isLoadingBalance">Loading balance...</span>

      <span class="text-red-800" v-else-if="errorMessage">
        {{ errorMessage }}
        <span class="cursor-pointer text-red-400" @click="retry">Retry</span>
      </span>

      <span v-else>the current account balance {{ balance }}</span>
    </template>
  </div>
</template>
