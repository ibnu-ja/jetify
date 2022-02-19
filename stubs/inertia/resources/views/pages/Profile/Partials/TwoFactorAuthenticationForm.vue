<template>
  <app-action-section>
    <template #title>
      Two Factor Authentication
    </template>

    <template #description>
      Add additional security to your account using two factor authentication.
    </template>

    <template
      #status
    >
      <template
        v-if="twoFactorEnabled"
      >
        You have enabled two factor authentication.
      </template>
      <template v-else>
        You have not enabled two factor authentication.
      </template>
    </template>

    <template #content>
      <p>
        When two factor authentication is enabled, you will be prompted for a
        secure, random token during authentication. You may retrieve this
        token from your phone's Google Authenticator application.
      </p>

      <div v-if="twoFactorEnabled">
        <div v-if="qrCode">
          <p>
            Two factor authentication is now enabled. Scan the following QR
            code using your phone's authenticator application.
          </p>

          <div
            class="mt-4"
            v-html="qrCode"
          />
        </div>

        <div v-if="recoveryCodes.length > 0">
          <p class="font-semibold">
            Store these recovery codes in a secure password manager. They can
            be used to recover access to your account if your two factor
            authentication device is lost.
          </p>
          <app-code><pre><code>{{ codes }}</code></pre></app-code>
        </div>
      </div>
    </template>
    <template #actions>
      <div v-if="!twoFactorEnabled">
        <app-confirms-password @confirmed="enableTwoFactorAuthentication">
          <v-btn
            color="secondary"
            :class="{ 'opacity-25': enabling }"
            :disabled="enabling"
          >
            Enable
          </v-btn>
        </app-confirms-password>
      </div>

      <div v-else>
        <app-confirms-password @confirmed="regenerateRecoveryCodes">
          <v-btn
            v-if="recoveryCodes.length > 0"
            outlined
            class="mr-3"
          >
            Regenerate Recovery Codes
          </v-btn>
        </app-confirms-password>

        <app-confirms-password @confirmed="showRecoveryCodes">
          <v-btn
            v-if="recoveryCodes.length === 0"
            outlined
            class="mr-3"
          >
            Show Recovery Codes
          </v-btn>
        </app-confirms-password>

        <app-confirms-password @confirmed="disableTwoFactorAuthentication">
          <v-btn
            color="red"
            :class="{ 'opacity-25': disabling }"
            :disabled="disabling"
          >
            Disable
          </v-btn>
        </app-confirms-password>
      </div>
    </template>
  </app-action-section>
</template>

<script setup>
import { Inertia } from '@inertiajs/inertia'
import AppActionSection from '@/views/components/ActionSection.vue'
import AppConfirmsPassword from '@/views/components/ConfirmsPassword.vue'
import { computed, ref } from '@vue/composition-api'
import axios from 'axios'
import AppCode from '@/views/components/AppCode.vue'

const enabling = ref(false)
const disabling = ref(false)
const qrCode = ref(null)
const recoveryCodes = ref([])

const twoFactorEnabled = computed(function () {
  return !this.enabling && this.$page.props.user.two_factor_enabled
})
function enableTwoFactorAuthentication () {
  enabling.value = true
  Inertia.post('/user/two-factor-authentication', {}, {
    preserveScroll: true,
    onSuccess: () =>
      Promise.all([showQrCode(), showRecoveryCodes()]),
    onFinish: () => (enabling.value = false)
  })
}

const codes = computed(() => {
  return recoveryCodes.value.join('\n')
})

async function showQrCode () {
  const res = await axios.get('/user/two-factor-qr-code')
  qrCode.value = res.data.svg
}

async function showRecoveryCodes () {
  const res = await axios.get('/user/two-factor-recovery-codes')
  recoveryCodes.value = res.data
}

async function regenerateRecoveryCodes () {
  await axios.post('/user/two-factor-recovery-codes')
  showRecoveryCodes()
}

async function disableTwoFactorAuthentication () {
  disabling.value = true

  const res = await Inertia.delete('/user/two-factor-authentication', {
    preserveScroll: true
  })
  if (res) disabling.value = false
}
</script>
