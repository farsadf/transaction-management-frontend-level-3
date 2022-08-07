import Vue from 'vue'

import TLoading from '~/components/Core/TLoading'

const components = {
  TLoading

}

Object.keys(components).forEach((key) => {
  Vue.component(key, components[key])
})
