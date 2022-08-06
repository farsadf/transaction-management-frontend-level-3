<template>
  <div
    class="card-box pa-3 mb-4"
    data-type="transaction"
    data-account-id="${transaction-account-id}"
    data-amount="${transaction-amount}"
    data-balance="${current-account-balance}"
  >
    <p>
      Transferred ${{ transaction.amount > 0 ? transaction.amount : -1 * transaction.amount }}
      {{ transaction.amount > 0 ? 'from' : 'to' }} account {{ transaction.account_id }}
    </p>
    <p v-if="index===0">
      The current account balance {{ balance }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'TransactionCard',
  props: {
    transaction: {
      type: Object,
      required: true,
      default: () => ({})
    },
    index: {
      type: Number,
      required: true,
      default: 0
    }
  },
  computed: {
    balance () {
      return this.$store.getters['transaction/getBalance']
    }
  }
}
</script>

<style scoped lang="scss">
.card-box {
  border-radius: 8px;
  box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
}
</style>
