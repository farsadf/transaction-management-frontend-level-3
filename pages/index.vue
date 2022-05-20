<template>
  <div class="t-app w-100">
    <b-container>
      <b-row>
        <b-col md="12">
          <div
            class="t-app-wrapper w-100 position-relative d-flex align-items-start"
          >
            <div class="t-form d-flex">
              <h3 class="t-section-title">Submit new transaction</h3>
              <div class="t-form-content w-100 shadow-sm">
                <form class="w-100" @submit="addTransaction">
                  <div class="t-input w-100 d-flex">
                    <input data-type="account-id" />
                  </div>
                  <div class="t-input w-100 d-flex">
                    <input data-type="amount" />
                  </div>

                  <input data-type="transaction-submit" type="submit" />
                </form>
              </div>
            </div>
            <div class="t-transactions-list d-flex">
              <h3 class="t-section-title">Transaction history</h3>
              <div
                class="w-100 d-flex justify-content-center"
                v-if="loading.initial"
              >
                <b-spinner label="Loading..."></b-spinner>
              </div>
              <template v-else>
                <TransactionItem
                  v-for="transaction in transactions"
                  :key="'transaction-' + transaction.transaction_id"
                  :transaction="transaction"
                ></TransactionItem>
              </template>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      loading: {
        initial: true,
      },
      transactions: [],
    }
  },
  mounted() {
    this.getTransactionList()
  },
  methods: {
    async getTransactionList() {
      await this.$axios
        .get('https://infra.devskills.app/api/accounting/transactions')
        .then((res) => {
          this.transactions = res.data
          this.loading.initial = false
        })
    },
    addTransaction(e) {
      e.preventDefault()
    },
  },
}
</script>
