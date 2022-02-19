<template>
  <v-snackbar
    top
    v-model="show"
    multi-line
    :color="style"
  >
    {{ message }}
    <template #action="{ attrs }">
      <v-btn
        text
        v-bind="attrs"
        @click="show = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  data () {
    return {
      show: !!this.$page.props.jetstream.flash?.banner
    }
  },

  watch: {
    message () {
      this.show = true
    }
  },

  computed: {
    style () {
      return this.$page.props.jetstream.flash?.bannerStyle || 'success'
    },

    message () {
      return this.$page.props.jetstream.flash?.banner || ''
    }
  }
})
</script>
