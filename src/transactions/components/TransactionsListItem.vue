<script setup lang="ts">
import useTransactionsListItem from "../composables/transactionsListItem";

import type { Transaction } from "../types";

type IProps = {
  transaction: Transaction;
  balance?: number;
};

const props = defineProps<IProps>();

const { transactionText, balance, rawBalance } = useTransactionsListItem(props);
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

    <span v-if="balance">the current account balance {{ balance }}</span>
  </div>
</template>
