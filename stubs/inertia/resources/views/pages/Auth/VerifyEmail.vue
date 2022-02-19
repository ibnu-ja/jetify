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
          <v-card-text>
            <p>Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.</p>
            <div
              class="success--text"
              v-if="verificationLinkSent"
            >
              A new verification link has been sent to the email address you provided during registration.
            </div>
          </v-card-text>
          <v-form @submit.prevent="submit">
            <v-card-actions>
              <v-btn
                color="secondary"
                type="submit"
              >
                Resend Verification Email
              </v-btn>
              <v-spacer />
              <a @click.prevent="logout">
                Logout
              </a>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </web-layout>
</template>

<script setup>
import WebLayout from '@/views/layouts/WebLayout.vue'
import { Inertia } from '@inertiajs/inertia'
import { computed, ref } from '@vue/composition-api'

const form = ref(Inertia.form())

const props = defineProps({
  // eslint-disable-next-line vue/require-default-prop
  status: String
})

function submit () {
  form.value.post(this.route('verification.send'))
}
function logout () {
  Inertia.post(this.route('logout'))
}
const verificationLinkSent = computed(() => {
  return props.status === 'verification-link-sent'
})
</script>
