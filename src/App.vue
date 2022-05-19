<template>
  <div class="container w-screen flex lg:flex-row flex-col">
    <TransactionForm @newTransaction="addNewTransaction" />
    <TransactionHistory v-if="transactions !== []" :items="transactions" />
    <div class="err" v-else>
      sorry transaction history is not available right now
    </div>
  </div>
</template>

<script>
import TransactionForm from "./components/TransactionForm.vue";
import TransactionHistory from "./components/history/TransactionHistory.vue";
import store from "./store";
export default {
  components: { TransactionForm, TransactionHistory },
  data() {
    return {
      transactions: [],
      err: false,
    };
  },
  mounted() {
    store
      .dispatch("loadTransaction")
      .then((data) => (this.transactions = data))
      .catch((err) => {
        console.log(err);
        this.err = true;
      });
  },
  methods: {
    addNewTransaction(data) {
      store.dispatch("addNewTransaction", data);
    },
  },
};
</script>
