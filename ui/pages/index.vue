<template>
  <v-container class="form-container">
    <v-row>
      <v-col cols="4" class="pa-3">
        <div class="box pa-3">
          <form>
            <v-text-field
              v-model="form.account_id"
              :error-messages="accountIdError"
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
              type="submit"
              width="80%"
              class="text-center d-block mx-auto"
              depressed
              height="50px"
              data-type="transaction-submit"
              color="success"
              :loading="btnLoading"
              :disabled="!!numberError || !!accountIdError"
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
            <TransactionCard
              v-for="(transaction , index) in transactionsList"
              :key="index"
              :transaction="transaction"
              :index="index"
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
      form: {
        account_id: '',
        amount: 0
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
      return Number(this.form.amount).toString() === this.form.amount.toString() ? '' : 'Enter correct number'
    },
    accountIdError () {
      return this.form.account_id.length === 0 ? 'Invalid Account ID ' : ''
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
      })
    },
    submit () {
      this.btnLoading = true
      this.createTransaction(this.form).then(() => {
        this.fetchTransactionsList()
        this.form = {
          account_id: '',
          amount: 0
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
