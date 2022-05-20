class CustomErrorReport {
  constructor(toast) {
    this.toast = toast
  }

  build(allErrors) {
    if (allErrors.error) {
      this.toast.error(allErrors.error)
    } else if (allErrors.errors) {
      allErrors.errors.map((errorItem) => {
        this.toast.error(errorItem)
        return errorItem
      })
    }
  }
}

export default ({ app }, inject) => {
  inject('errorReport', new CustomErrorReport(app.$toast))
}
