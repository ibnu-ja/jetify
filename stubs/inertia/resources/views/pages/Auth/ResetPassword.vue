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
            <v-card-title>Reset Password</v-card-title>
            <v-card-text>
              <validation-errors class="mb-4" />
              <v-text-field
                v-model="form.email"
                dense
                outlined
                label="Email Address"
                required
                autofocus
              />
              <v-text-field
                v-model="form.password"
                dense
                outlined
                label="New Password"
                required
                autocomplete="current-password"
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPass ? 'text' : 'password'"
                hint="At least 8 characters"
                @click:append="showPass = !showPass"
              />
              <v-text-field
                v-model="form.password_confirmation"
                dense
                outlined
                label="Comfirn New Password"
                required
                autocomplete="current-password"
                :append-icon="
                  showPassConfirmation ? 'mdi-eye' : 'mdi-eye-off'
                "
                :type="showPassConfirmation ? 'text' : 'password'"
                hint="At least 8 characters"
                @click:append="showPassConfirmation = !showPassConfirmation"
              />
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="primary"
                type="submit"
                :disabled="form.processing"
              >
                Reset Password
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
    <v-sheet
      class=""
      color="gray pulse"
      width="200px"
    />
  </web-layout>
</template>

<script setup>
import ValidationErrors from '@/views/components/ValidationErrors.vue'
import WebLayout from '@/views/layouts/WebLayout.vue'
import { Inertia } from '@inertiajs/inertia'
import { ref } from '@vue/composition-api'

const props = defineProps({
  // eslint-disable-next-line vue/require-default-prop
  email: String,
  // eslint-disable-next-line vue/require-default-prop
  token: String
})

const showPassConfirmation = ref(false)
const showPass = ref(false)
const form = ref(Inertia.form({
  token: props.token,
  email: props.email,
  password: '',
  password_confirmation: ''
}))

function submit () {
  form.value.post(this.route('password.update'), {
    onFinish: () => form.value.reset('password', 'password_confirmation')
  })
}
</script>
