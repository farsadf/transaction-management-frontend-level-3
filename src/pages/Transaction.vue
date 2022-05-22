<template>
  <div class="transaction">
    <div class="transaction_card">
      <p class="transaction_card_text">
        transferred
        <span class="transaction_card_desc">{{transaction.amount}}</span>
        from
        <span class="transaction_card_desc">{{transaction.account_id}}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "TR",
  data(){
    return {
      transactionId: '',
      transaction: {}
    }
  },
  methods: {
    getTransaction() {
        this.$axios.get(`/transactions/${this.transactionId}`)
            .then(res => {
              this.transaction = res?.data
              console.log(res)

            })
            .catch(err => console.log(err))
      }
  },
  watch: {
    $route(to){
      this.transactionId = to.params.id
    },
  },
  created() {
    this.transactionId = this.$route.params.id

    if (this.$route.params.id){
      this.getTransaction()
    }
  }
}
</script>

<style scoped>

.transaction{
  width: 100%;
}

.transaction_card{
  width: 50%;
  height: auto;
  padding: 40px;
  border: 1px solid #000;
  border-radius: 5px;
  margin: 10% auto;
}

.transaction_card_text{
  font-size: 18px;
}

.transaction_card_desc{
  font-size: 20px;
  font-weight: bold;
  margin: 0 10px;
}
</style>
