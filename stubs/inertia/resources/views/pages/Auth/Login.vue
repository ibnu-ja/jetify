<template>
  <web-layout>
    <v-row
      :no-gutters="$vuetify.breakpoint.xs"
      justify="center"
    >
      <v-col
        cols="12"
        sm="8"
        md="6"
      >
        <v-card :tile="$vuetify.breakpoint.xs">
          <v-form @submit.prevent="submit">
            <v-card-title>Sign in to your account</v-card-title>
            <v-card-text>
              <validation-errors class="mb-4" />

              <div
                v-if="status"
                class="mb-4 font-medium text-sm text-green-600"
              >
                {{ status }}
              </div>
              <v-text-field
                v-model="form.email"
                outlined
                label="Email Address"
                required
                autofocus
              />
              <v-text-field
                v-model="form.password"
                outlined
                label="Password"
                required
                autocomplete="current-password"
                :append-icon="showP ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showP ? 'text' : 'password'"
                hint="At least 8 characters"
                @click:append="showP = !showP"
              />
              <v-checkbox
                v-model="form.remember"
                hide-details
                label="Remember me"
              />
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <inertia-link
                v-if="canResetPassword"
                class="mx-4"
                :href="route('password.request')"
              >
                Forgot your password?
              </inertia-link>

              <v-btn
                color="secondary"
                type="submit"
                :disabled="form.processing"
              >
                Sign In
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </web-layout>
</template>

<script setup>
import ValidationErrors from '@/views/components/ValidationErrors.vue'
import WebLayout from '@/views/layouts/WebLayout.vue'
import { Inertia } from '@inertiajs/inertia'
// import SocialstreamProviders from '@/Socialstream/Providers.vue'
import { ref } from '@vue/composition-api'

defineProps({
  canResetPassword: Boolean,
  // eslint-disable-next-line vue/require-default-prop
  status: String
})
const form = ref(Inertia.form({
  email: '',
  password: '',
  remember: false
}))
const showP = ref(false)

function submit () {
  form.value.transform(data => ({
    ...data,
    remember: form.value.remember ? 'on' : ''
  }))
    .post(this.route('login'), {
      onFinish: () => form.value.reset('password')
    })
}
</script>
