<template>
  <v-container class="form-container">
    <v-row>
      <v-col cols="4" class="pa-3">
        <div class="box pa-3">
          <form>
            <v-text-field v-model="form.accountId" data-type="account-id" label="Account ID" outlined />
            <v-text-field v-model="form.accountId" data-type="amount" label="Amount" outlined />
            <v-btn
              type="submit"
              width="80%"
              class="text-center d-block mx-auto"
              depressed
              height="50px"
              data-type="transaction-submit"
              color="success"
              :loading="loading"
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
            ads
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'IndexPage',
  data () {
    return {
      form: {
        accountId: '',
        amount: 0
      },
      loading: false
    }
  },
  mounted () {
    this.fetchTransactionsList()
  },
  methods: {
    ...mapActions({
      fetchTransactionsList: 'transaction/fetchTransactionsList'
    }),
    submit () {
      this.loading = true
      this.fetchTransactionsList(this.form).finally(() => {
        this.loading = false
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
