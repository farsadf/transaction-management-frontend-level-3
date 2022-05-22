<template>
  <div class="card">
      <router-link
          :to="'/transaction/'+transaction.transaction_id"
          :style="{textDecoration: 'none', color: '#000', fontSize: '18px'}"
      >
        transferred <span class="card_desc">${{transaction.amount}}</span>
        {{amountText}}
        <span class="card_desc">{{transaction.account_id}}</span>
        <p v-if="accountIndex === 0">The current account balance ${{-Math.abs(transaction.amount)}}</p>
      </router-link>
  </div>
</template>

<script>
export default {
  name: "CA",
  props: ["item","index"],
  data(){
    return {
      transaction: {},
      amountText: '',
      accountIndex: ''
    }
  },
  methods: {
    checkAmount() {
       Math.sign(this.transaction.amount) === 1 || Math.sign(this.transaction.amount) === 0
       ? this.amountText = 'to': this.amountText = 'from'
    }
  },
  created(){
    this.transaction = this.item;
    this.accountIndex = this.index;
    this.checkAmount()
    console.log(this.accountIndex);
  }
}
</script>

<style scoped>
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
