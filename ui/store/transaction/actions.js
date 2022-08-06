
export default {
  fetchTransactionsList ({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios.$get('/api/accounting/transactions').then((data) => {
        commit('setTransactionsList', data)
        resolve(data)
      }).catch(reject)
    })
  }
}
