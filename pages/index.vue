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
                    <input
                      v-model="newTransaction.account_id"
                      data-type="account-id"
                    />
                  </div>
                  <div class="t-input w-100 d-flex">
                    <input v-model="newTransaction.amount" data-type="amount" />
                  </div>

                  <input data-type="transaction-submit" type="submit" />
                </form>
              </div>
            </div>
            <div class="t-transactions-list d-flex">
              <h3 class="t-section-title">Transaction history</h3>
              <div
                v-if="loading.initial"
                class="w-100 d-flex justify-content-center"
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
      newTransaction: {
        account_id: null,
        amount: null,
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
    async addTransaction(e) {
      e.preventDefault()
      if (this.loading.add) return
      this.loading.add = true

      const temp = {}
      if (this.newTransaction.account_id)
        temp.account_id = this.newTransaction.account_id
      if (this.newTransaction.amount) temp.amount = this.newTransaction.amount

      await this.$axios
        .post('https://infra.devskills.app/api/accounting/transactions', temp)
        .then((res) => {
          this.newTransaction = {}
          this.transactions.unshift({ ...res.data, isNew: true })
        })
        .catch((err) => {
          err && err.response && this.$errorReport.build(err.response.data)
        })

      this.loading.add = false
    },
  },
}
</script>
