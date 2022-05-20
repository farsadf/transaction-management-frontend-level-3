class CustomErrorReport {
  constructor(toast) {
    this.toast = toast
  }

  build(allErrors) {
    if (allErrors.error) {
      this.toast.error(allErrors.error)
    }
  }
}

export default ({ app }, inject) => {
  inject('errorReport', new CustomErrorReport(app.$toast))
}
