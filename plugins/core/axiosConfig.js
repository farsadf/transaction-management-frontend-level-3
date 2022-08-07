export default function ({ $axios, app, store }) {
  $axios.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error.response) {
        if (Array.isArray(error.response.data.errors)) {
          error.response.data.errors.forEach((message) => {
            alert(message)
          })
        }
      }
    })
}
