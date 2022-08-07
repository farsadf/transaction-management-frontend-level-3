<template>
  <div
    class="card-box pa-3 mb-4"
    data-type="transaction"
    :data-account-id="transaction.account_id"
    :data-amount="transaction.amount"
    :data-balance="balance"
  >
    Transferred ${{ transaction.amount > 0 ? transaction.amount : -1 * transaction.amount }}
    <span :class="[transaction.amount > 0 ? 'from' : 'to']">
      {{ transaction.amount > 0 ? 'from' : 'to' }}
    </span>
    account {{ transaction.account_id }}
    <br>
    {{ index===0 ?'The current account balance $'+ balance :'' }}
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
    },
    balance: {
      type: Number,
      required: true,
      default: 0
    }
  }
}
</script>

<style scoped lang="scss">
.card-box {
  border-radius: 8px;
  box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
  .from{
    color: #3cff4b;
  }
  .to{
    color: #ffa91d;
  }
}
</style>
