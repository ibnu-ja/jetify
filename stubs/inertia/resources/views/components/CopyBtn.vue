<template>
  <v-btn
    absolute
    class="v-btn--copy"
    icon
    right
    style="background-color: inherit;"
    top
    @click="copy"
  >
    <v-fade-transition hide-on-leave>
      <v-icon
        :key="String(clicked)"
        color="grey"
        v-text="clicked ? '$complete' : 'mdi-content-copy'"
      />
    </v-fade-transition>
  </v-btn>
</template>

<script>
// Utilities
// import { wait } from '@/util/helpers'
// import { IN_BROWSER } from '@/util/globals'

export default {
  props: {
    target: {
      type: Function,
      required: true
    }
  },

  data: () => ({
    clicked: false,
    wait: 2000
  }),

  methods: {
    async copy () {
      const el = this.target()

      el.setAttribute('contenteditable', 'true')
      el.focus()

      document.execCommand('selectAll', false, null)
      document.execCommand('copy')

      el.removeAttribute('contenteditable')

      this.clicked = true
      //   await new Promise(resolve => {
      //     const cb = () => {
      //       window.requestAnimationFrame(resolve)
      //       window.removeEventListener('DOMContentLoaded', cb)
      //     }

      //     window.addEventListener('DOMContentLoaded', cb)
      //   })
      setTimeout(() => (this.clicked = false), this.wait)
    }
  }
}
</script>
