import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading : true,
    notifications : [],
    transactions : [],
    balance : 0,
    validations : {
      accountRules : [
        value => !!value || "Required.",
        value => (value && value.length >= 36) || "Min 36 characters"
      ],
      amountRules : [
        value => !!value || "Required.",
        value => {
          const pattern = /^-?[0-9]\d*(\.\d+)?$/;
          return pattern.test(value) || "Amount should be number.";
        },
      ]
    }
  },
  getters: {
  },
  mutations: {
    getTransactions(state,transactions){
      state.balance = 0;
      transactions.forEach(element => {
        if(transactions[0].account_id == element.account_id) state.balance += element.amount;
      });
      state.transactions = transactions;
      state.loading = false;
    },
    createTransaction(state,transaction){
      let newTransactions = [transaction];
      newTransactions.push(...state.transactions);
      state.transactions = newTransactions;
      state.balance = 0;
      state.transactions.forEach(element => {
        if(transaction.account_id == element.account_id) state.balance += parseInt(element.amount);
      });
      state.loading = false;
    },
    removeItem(state,alert){
      this.state.notifications.splice(this.state.notifications.indexOf(alert), 1)
    },
  },
  actions: {
    async getTransactions({commit}){
      try{
        let transactions = await axios.get('https://infra.devskills.app/api/accounting/transactions');
        commit('getTransactions',transactions.data);
      }catch(err){
        this.state.loading = false;
        const notification = {
          status : "error",
          message : err
        }
        this.state.notifications.push(notification);
      }
    },
    async createTransaction({commit},formData){
      try{
        this.state.loading = true;
        const json = JSON.stringify({
          account_id: formData.id,
          amount: formData.amount
        });
        let transaction = await axios.post('https://infra.devskills.app/api/accounting/transactions',json,{
          headers: {
            'Content-Type': 'application/json'
          }
        });
        commit('createTransaction',transaction.data);
      }catch(err){
        this.state.loading = false;
        const notification = {
          status : "error",
          message : err
        }
        this.state.notifications.push(notification);
      }
    },
  },
  modules: {
  }
})
