<template>
  <div class="t-transaction-item w-100 shadow-sm" v-html="customText"></div>
</template>

<script>
export default {
  name: 'TransactionItem',
  props: {
    transaction: {
      type: Object,
      required: true,
    },
  },
  computed: {
    customText() {
      return `Transfer <b>$${this.transaction.amount}</b> from account <b>${this.transaction.account_id}</b>`
    },
  },
}
</script>
