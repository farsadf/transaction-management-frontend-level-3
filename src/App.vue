<template>
  <div class="container w-screen flex lg:flex-row flex-col">
    <TransactionForm @newTransaction="addNewTransaction" />
    <TransactionHistory
      :key="transactions.length"
      v-if="transactions !== []"
      :items="transactions"
    />
    <div class="err" v-else>
      sorry transaction history is not available right now
    </div>
  </div>
</template>

<script>
import TransactionForm from "./components/TransactionForm.vue";
import TransactionHistory from "./components/history/TransactionHistory.vue";
export default {
  components: { TransactionForm, TransactionHistory },
  data() {
    return {
      transactions: [],
      err: false,
    };
  },
  mounted() {
    fetch("https://infra.devskills.app/api/accounting/transactions")
      .then((res) => res.json())
      .then((data) => {
        this.transactions = data.sort((a, b) => {
          a.created_At - b.created_At;
        });
        fetch(
          "https://infra.devskills.app/api/accounting/accounts/" +
            this.transactions[0].account_id
        )
          .then((res) => res.json())
          .then((data) => (this.transactions[0].balance = data.balance));
      })
      .catch((err) => {
        console.log(err);
        this.err = true;
      });
  },
  methods: {
    addNewTransaction(data) {
      fetch(
        "https://infra.devskills.app/api/accounting/transactions/" +
          data.transaction_id
      )
        .then((res) => res.json())
        .then((data) => {
          this.transactions.unshift(data);
          fetch(
            "https://infra.devskills.app/api/accounting/accounts/" +
              this.transactions[0].account_id
          )
            .then((res) => res.json())
            .then((data) => (this.transactions[0].balance = data.balance));
        });
    },
  },
};
</script>
