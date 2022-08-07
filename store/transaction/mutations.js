
export default {
  setTransactionsList (state, payload) {
    state.transactionsList = payload
  },
  addTra (state, payload) {
    state.transactionsList.unshift(payload)
  }
}
