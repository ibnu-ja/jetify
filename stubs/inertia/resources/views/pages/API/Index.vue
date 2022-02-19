<template>
  <app-layout>
    <template #header>
      <h2 class="font-semibold text-xl text-gray-800 leading-tight">
        API Tokens
      </h2>
    </template>

    <div>
      <div class="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
        <api-token-manager
          :tokens="tokens"
          :available-permissions="availablePermissions"
          :default-permissions="defaultPermissions"
        />
      </div>
    </div>
  </app-layout>
</template>

<script>
import ApiTokenManager from './Partials/ApiTokenManager.vue'
import AppLayout from '@/views/layouts/AppLayout.vue'

import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: [
    // eslint-disable-next-line vue/require-prop-types
    'tokens',
    // eslint-disable-next-line vue/require-prop-types
    'availablePermissions',
    // eslint-disable-next-line vue/require-prop-types
    'defaultPermissions'
  ],

  components: {
    ApiTokenManager,
    AppLayout
  }
})
</script>
