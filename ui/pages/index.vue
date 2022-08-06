<template>
  <v-container class="form-container">
    <v-row>
      <v-col cols="4" class="pa-3">
        <div class="box pa-3">
          <h2 class="pb-5">
            Submit new transaction
          </h2>
          <form>
            <v-text-field
              v-model="form.account_id"
              data-type="account-id"
              label="Account ID"
              outlined
            />
            <v-text-field
              v-model="form.amount"
              :error-messages="numberError"
              data-type="amount"
              label="Amount"
              outlined
            />
            <v-btn
              width="80%"
              class="text-center d-block mx-auto"
              depressed
              height="50px"
              data-type="transaction-submit"
              color="success"
              :loading="btnLoading"
              @click.prevent="submit "
            >
              submit
            </v-btn>
          </form>
        </div>
      </v-col>
      <v-col cols="8" class="pa-3">
        <div class="box pa-3">
          <TLoading v-if="loading" />
          <div v-else>
            <h2 class="pb-5">
              Transaction history
            </h2>
            <TransactionCard
              v-for="(transaction , index) in transactionsList"
              :key="index"
              :transaction="transaction"
              :index="index"
              :balance="balance"
            />
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import TransactionCard from '~/components/App/TTransactionPage/Card'

export default {
  name: 'IndexPage',
  components: {
    TransactionCard
  },
  data () {
    return {
      balance: 0,
      form: {
        account_id: '',
        amount: ''
      },
      loading: false,
      btnLoading: false
    }
  },
  computed: {
    ...mapGetters({
      transactionsList: 'transaction/getTransactionsList'
    }),
    numberError () {
      return this.form.amount === '' || Number(this.form.amount).toString() === this.form.amount ? '' : 'Enter correct number'
    }
  },

  mounted () {
    this.fetchTransactions()
  },
  methods: {
    ...mapActions({
      fetchTransactionsList: 'transaction/fetchTransactionsList',
      createTransaction: 'transaction/createTransaction'
    }),
    fetchTransactions () {
      this.loading = true
      this.fetchTransactionsList().then(() => {
        this.loading = false
        this.getBalance()
      })
    },
    getBalance () {
      console.log(this.transactionsList)
      if (this.transactionsList.length > 0) {
        this.$axios.$get(`/api/accounting/accounts/${this.transactionsList[0].account_id}`).then(({ balance }) => {
          this.balance = balance
        })
      }
    },
    submit () {
      this.btnLoading = true
      this.createTransaction(this.form).then(() => {
        this.fetchTransactions()
        this.form = {
          account_id: '',
          amount: ''
        }
      }).finally(() => {
        this.btnLoading = false
      })
    }
  }
}
</script>
<style scoped lang="scss">
.form-container {
  .box {
    border: 1px solid #343434;
    border-radius: 8px;
  }
}
</style>
