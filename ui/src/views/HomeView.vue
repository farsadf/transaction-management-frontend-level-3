<template>
  <v-card class="myContainer" outlined :loading="$store.state.loading">
    <v-row>
      <v-col cols="4" class="box">
        <h2>Submit new transaction</h2>
        <v-form ref="form" class="mx-2" lazy-validation>
          <v-text-field
              class="input"
              label="Account ID"
              hide-details="auto"
              :rules="$store.state.validations.accountRules"
              v-model="input_account_id"
              data-type="account-id"
          ></v-text-field>
          <v-text-field
              class="input"
              label="Amount in USD"
              hide-details="auto"
              :rules="$store.state.validations.amountRules"
              v-model="input_amount"
              data-type="amount"
          ></v-text-field>
          <v-btn
              class="button"
              block
              color="primary"
              tile
              data-type="transaction-submit"
              @click="submit"
          >Submit transaction</v-btn>
        </v-form>
      </v-col>
      <v-col cols="8" class="box">
        <h2>Transaction history</h2>
        <v-card
          v-for="({amount,account_id},id) in $store.state.transactions"
          class="transaction"
          elevation="2"
          data-type="transaction"
          :data-account-id="account_id"
          :data-amount="amount"
          :data-balance="$store.state.balance">
          <p>Transfered ${{amount}} from account {{account_id}}</p>
          <p v-if="id == 0" >The current account balance is : ${{$store.state.balance}}</p>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
  export default {
    name: 'Home',

    components: {
    },

    data: () => ({
      input_account_id: "",
      input_amount: ""
    }),

    created() {
      this.$watch(
        () => this.$route.params,
        () => {
          this.$store.dispatch('getTransactions');
        },
        { immediate: true }
      )
    },

    methods: {
      reset(){
        this.$refs.form.reset();
      },
      submit(){
        let isValid = this.$refs.form.validate();
        if(!isValid) return false;
        this.$store.dispatch('createTransaction',{id:this.input_account_id,amount:this.input_amount});
        this.reset();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .transaction{
    padding: 20px;
    margin-bottom: 20px;
  }
  .myContainer{
    margin: 20px;
    overflow: hidden;
    margin-top: 100px;
  }
  .box{
    padding: 50px;
    border: none;
    &:last-child{
      height: calc(100vh - 120px);
      overflow-y: scroll;
    }
    h2{
      margin-bottom: 30px;
    }
    .input{
      margin-bottom: 20px;
    }
    .button{
      margin-top: 40px;
    }
  }
</style>
