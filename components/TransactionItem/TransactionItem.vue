<template>
  <div class="t-transaction-item w-100 shadow-sm">
    <span
      class="t-transaction-item__badge"
      v-if="transaction.isNew && showNewBadge"
      >NEW</span
    >
    <span v-html="customText"></span>
  </div>
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
  data() {
    return {
      showNewBadge: true,
    }
  },
  computed: {
    customText() {
      return `Transfer <b>$${this.transaction.amount}</b> from account <b>${this.transaction.account_id}</b>`
    },
  },
  mounted() {
    if (this.transaction.isNew) {
      setTimeout(() => {
        this.showNewBadge = false
      }, 5000)
    }
  },
}
</script>
