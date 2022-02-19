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
          <v-card-title>Two Factor authentication</v-card-title>
          <v-card-text>
            <validation-errors class="mb-4" />

            <template v-if="! recovery">
              Please confirm access to your account by entering the authentication code provided by your authenticator application.
            </template>

            <template v-else>
              Please confirm access to your account by entering one of your emergency recovery codes.
            </template>

            <v-form @submit.prevent="submit">
              <v-text-field
                v-if="!recovery"
                ref="code"
                v-model="form.code"
                type="text"
                inputmode="numeric"
                class="mt-1 block w-full"
                autofocus
                autocomplete="one-time-code"
                outlined
                label="Code"
                required
              />
              <v-text-field
                v-else
                ref="recoveryCode"
                v-model="form.recovery_code"
                type="text"
                inputmode="numeric"
                class="mt-1 block w-full"
                autofocus
                autocomplete="one-time-code"
                outlined
                label="Recovery Code"
                required
              />
              <v-btn
                block
                color="primary"
                type="submit"
                :disabled="form.processing"
              >
                Sign In
              </v-btn>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <a
              href="#"
              @click.prevent="toggleRecovery"
              v-text="
                !recovery ? 'Use recovery code' : 'Use authenticator code'
              "
            />
            <v-spacer />
            <div>
              Don't have an account?
              <inertia-link :href="route('register')">
                Sign up
              </inertia-link>
            </div>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </web-layout>
</template>

<script setup>
import ValidationErrors from '@/views/components/ValidationErrors.vue'
import WebLayout from '@/views/layouts/WebLayout.vue'
import { Inertia } from '@inertiajs/inertia'
import { ref, nextTick } from '@vue/composition-api'

const recovery = ref(false)
const code = ref(null)
const form = ref(Inertia.form({
  code: '',
  recovery_code: ''
}))

const recoveryCode = ref(null)

function toggleRecovery () {
  recovery.value ^= true

  nextTick(() => {
    if (recovery.value) {
      recoveryCode.value.focus()
      form.value.code = ''
    } else {
      code.value.focus()
      form.value.recovery_code = ''
    }
  })
}

function submit () {
  form.value.post(this.route('two-factor.login'))
}
</script>
