<template>
  <div class="transaction-list">
    <div v-for="item in items">
      <TransactionItem
        :id="item.transaction_id"
        :accountId="item.account_id"
        :amount="item.amount"
        :createdAt="item.created_at"
        :key="item.transaction_id"
      />
    </div>
  </div>
</template>

<script>
import TransactionItem from "./TransactionItem.vue";
export default {
  components: { TransactionItem },
  props: {
    items: {
      type: Array,
    },
  },
};
</script>

<style></style>
