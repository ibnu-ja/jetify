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
          <v-card-title>Confirm Password</v-card-title>
          <v-card-text>
            <div class="mb-4">
              This is a secure area of the application. Please confirm your
              password before continuing.
            </div>

            <validation-errors class="mb-4" />

            <form @submit.prevent="submit">
              <v-text-field
                v-model="form.password"
                dense
                outlined
                label="Password"
                required
                autocomplete="current-password"
                :append-icon="showP ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showP ? 'text' : 'password'"
                hint="At least 8 characters"
                @click:append="showP = !showP"
              />
              <v-btn
                block
                color="primary"
                type="submit"
                :disabled="form.processing"
              >
                Confirm
              </v-btn>
            </form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </web-layout>
</template>

<script setup>
import WebLayout from '@/views/layouts/WebLayout.vue'
import { Inertia } from '@inertiajs/inertia'
import { ref } from '@vue/composition-api'

const form = ref(Inertia.form({
  password: ''
}))
const showP = ref(false)
function submit () {
  form.value.post(this.route('password.confirm'), {
    onFinish: () => form.value.reset()
  })
}
</script>
