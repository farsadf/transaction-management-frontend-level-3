export default function ({ $axios, app, store }) {
  $axios.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error.response) {
        error.response.data.errors.forEach((message) => {
          alert(message)
        })
      }
    })
}
