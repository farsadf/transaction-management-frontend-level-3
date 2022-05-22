<template>
  <div class="card_container">
    <p class="title">Transaction History</p>
    <div :style="{padding: '0 20px'}">
      <Card :item="item" :index="index" v-for="(item, index) in transactions" :key="index" />
    </div>
  </div>
</template>

<script>
import Card from "./Card";

export default {
  name: "TransactionList",
  data: () => {
    return {
      transactions: [],
      transfer: 'from'
    }
  },
  components: {
    Card
  },
  methods: {
    getTransactions() {
      this.$axios.get('/transactions')
          .then(res => {
            this.transactions = res?.data
          })
          .catch(err => console.log(err))
    },
  },
  computed: {
    getAllTransactions() {
      return this.transactions
    }
  },
  watch: {
    transactions: {
      handler(){
      },
      deep: true
    },
  },
  created() {
    this.getTransactions()
    this.transactions.forEach((val) => {
      this.$watch(() => val, this.getTransactions, {deep: true})
    })
  }
}
</script>

<style scoped>

.title{
  font-size: 2.5rem;
  padding: 0 20px;
}

.card_container{
  width: 100%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  border: 1px solid #000;
  border-radius: 10px;
}
.card{
  width: auto;
  border: 1px solid #000;
  border-radius: 10px;
  padding: 20px;
  height: auto;
  margin: 10px 0;
}

.card_desc{
  font-size: 20px;
  font-weight: bold;
  margin: 0 10px;
}
</style>
