// import { createApp, h } from 'vue'
// import { createInertiaApp } from '@inertiajs/inertia-vue'
import Vue from 'vue'
import { createInertiaApp, Link } from '@inertiajs/inertia-vue'
import { InertiaProgress } from '@inertiajs/progress'
import VueCompositionApi from '@vue/composition-api'
import { importPageComponent } from './vite/import-page-component'
import PortalVue from 'portal-vue'
// import axios from 'axios'
// import VueAxios from 'vue-axios'
import vuetify from './plugins/vuetify'

// Vue 3
// createInertiaApp({
//   resolve: (name) =>
//     importPageComponent(name, import.meta.glob('../views/pages/**/*.vue')),
//   setup ({ el, app, props, plugin }) {
//     createApp({ render: () => h(app, props) })
//       .use(plugin)
//       .use(VueAxios, axios)
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       .mixin({ methods: { route: (window as any).route } })
//       .mount(el)
//   }
// })

// Vue 2
createInertiaApp({
  resolve: (name) => importPageComponent(name, import.meta.glob('../views/pages/**/*.vue')),
  setup ({ el, app, props, plugin }) {
    Vue.use(plugin)
    // Vue.use(VueAxios, axios)
    Vue.use(VueCompositionApi)
    Vue.use(PortalVue)
    Vue.component('InertiaLink', Link)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Vue.mixin({ methods: { route: (window as any).route } })
    new Vue({
      vuetify,
      render: h => h(app, props)
    }).$mount(el)
  }
})

InertiaProgress.init()
