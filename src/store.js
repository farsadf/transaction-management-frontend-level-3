import { createStore } from "vuex";
const store = createStore({
  state() {
    return {
      transactions: [],
    };
  },
  mutations: {
    setTransactions(state, transactions) {
      state.transactions = transactions;
    },
    setbalance(state, balance) {
      state.transactions[0].balance = balance;
    },
    setNewTransaction(state, object) {
      state.transactions.unshift(object);
    },
  },
  actions: {
    loadTransaction(context) {
      return fetch("https://infra.devskills.app/api/accounting/transactions")
        .then((res) => res.json())
        .then((data) => {
          let transactions = data.sort((a, b) => {
            a.created_At - b.created_At;
          });
          context.commit("setTransactions", transactions);

          fetch(
            "https://infra.devskills.app/api/accounting/accounts/" +
              context.state.transactions[0].account_id
          )
            .then((res) => res.json())
            .then((data) => context.commit("setbalance", data.balance));
          return context.state.transactions;
        });
    },
    addNewTransaction({ commit }, data) {
      fetch(
        "https://infra.devskills.app/api/accounting/transactions/" +
          data.transaction_id
      )
        .then((res) => res.json())
        .then((data) => {
          commit("setNewTransaction", data);
          fetch(
            "https://infra.devskills.app/api/accounting/accounts/" +
              data.account_id
          )
            .then((res) => res.json())
            .then((data) => commit("setbalance", data.balance));
        });
    },
  },
});

export default store;
