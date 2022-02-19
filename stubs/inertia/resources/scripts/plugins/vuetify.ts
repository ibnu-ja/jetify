// // Vuetify Documentation https://vuetifyjs.com

import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import id from 'vuetify/src/locale/id'
import { Scroll } from 'vuetify/lib/directives'

// import { Ripple } from 'vuetify/lib/directives'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify, {
  directives: {
    Scroll
  }
})

Vue.component('RouterLink', {
  functional: true,
  render (h, context) {
    const data = { ...context.data }
    delete data.nativeOn
    const props = data.props || {}
    props.href = props.to /// v-btn passes `to` prop but inertia-link requires `href`, so we just copy it
    return h('inertia-link', data, context.children)
  }
})

const vuetify = new Vuetify({
  lang: {
    locales: { id },
    current: 'id'
  },
  theme: {
    dark: false,
    themes: {
      light: {
        primary: '#7e2c59',
        secondary: '#314094',
        accent: '#2c7e43'
      },
      dark: {
        primary: '#df76b0',
        secondary: '#2e4e8d',
        accent: '#59bb75'
      }
    },
    options: { customProperties: true }
  }
})

export default vuetify

// import Vue from 'vue'
// import Vuetify from 'vuetify'

// Vue.use(Vuetify)

// export default new Vuetify({
// })
