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
            <v-card-title>Forgot password?</v-card-title>
            <v-card-text>
              <p>
                Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.
              </p>

              <div
                v-if="status"
                class="mb-4 success--text"
              >
                {{ status }}
              </div>

              <validation-errors class="mb-4" />
              <v-text-field
                v-model="form.email"
                dense
                outlined
                label="Email Address"
                required
                autofocus
                type="email"
              />
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="secondary"
                type="submit"
                :disabled="form.processing"
              >
                Request Password Reset
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

defineProps({
  // eslint-disable-next-line vue/require-default-prop
  status: String
})
const form = ref(Inertia.form({
  email: ''
}))
function submit () {
  form.value.post(this.route('password.email'))
}
</script>
