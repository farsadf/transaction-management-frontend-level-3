
export default {
  fetchTransactionsList ({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios.$get('/api/accounting/transactions').then((data) => {
        commit('setTransactionsList', data)
        resolve(data)
      }).catch(reject)
    })
  },
  createTransaction ({ dispatch }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$post('/api/accounting/transactions', payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(resolve).catch(reject)
    })
  }
}
