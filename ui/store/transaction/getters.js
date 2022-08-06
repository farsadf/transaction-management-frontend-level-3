export default {
  getTransactionsList (state) {
    return state.transactionsList
  },
  getBalance (state) {
    return state.transactionsList.map(item => item.amount).reduce((a, b) => a + b, 0)
  }
}
