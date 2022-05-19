<template>
  <div
    class="transaction-list flex lg:w-8/12 w-full flex-col flex-1 justify-center"
  >
    <div v-for="item in items">
      <TransactionItem
        :balance="balance"
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
