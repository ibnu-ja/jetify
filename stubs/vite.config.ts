import { defineConfig } from 'vite'
import laravel from 'vite-plugin-laravel'
import { createVuePlugin as Vue2 } from 'vite-plugin-vue2'
import Components from 'unplugin-vue-components/vite'
import { VuetifyResolver } from 'unplugin-vue-components/resolvers'
import ScriptSetup from 'unplugin-vue2-script-setup/vite'
import AutoImport from 'unplugin-auto-import/vite'
import inertia from './resources/scripts/vite/inertia-layout'

export default defineConfig({
  plugins: [
    Vue2(),
    inertia(),
    ScriptSetup(),
    laravel(),
    Components({
      resolvers: [
        VuetifyResolver()
      ]
    }),
    AutoImport({
      imports: [
        '@vue/composition-api',
        '@vueuse/core'
      ]
      // dts: 'src/auto-imports.d.ts',
    })
  ]
})
