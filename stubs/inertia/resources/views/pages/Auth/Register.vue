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
            <v-card-title>Sign Up with Email</v-card-title>
            <v-card-text>
              <validation-errors class="mb-4" />
              <v-text-field
                v-model="form.name"
                required
                autofocus
                outlined
                label="Full Name"
              />
              <v-text-field
                v-model="form.email"
                required
                outlined
                label="Email address"
              />
              <v-text-field
                v-model="form.password"
                outlined
                label="Password"
                required
                autocomplete="new-password"
                :append-icon="showP ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showP ? 'text' : 'password'"
                hint="At least 8 characters"
                @click:append="showP = !showP"
              />
              <v-text-field
                v-model="form.password_confirmation"
                outlined
                label="Confirm Password"
                required
                autocomplete="new-password"
                :append-icon="showCP ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showCP ? 'text' : 'password'"
                hint="At least 8 characters"
                @click:append="showCP = !showCP"
              />
              <div v-if="$page.props.jetstream.hasTermsAndPrivacyPolicyFeature">
                <v-checkbox
                  v-model="form.terms"
                  hide-details
                >
                  <template #label>
                    <span @click.stop="">By signing up you agree to the <inertia-link
                      href="terms-of-service"
                      v-text="'Terms of Service'"
                    /> and <inertia-link
                      href="privacy-policy"
                      v-text="'Privacy Policy'"
                    /></span>
                  </template>
                </v-checkbox>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <inertia-link
                :href="route('login')"
                class="mx-4"
              >
                Already registered?
              </inertia-link>
              <v-btn
                color="secondary"
                type="submit"
                :disabled="form.processing"
              >
                Register
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
import { ref } from '@vue/composition-api'
// import SocialstreamProviders from '@/Socialstream/Providers.vue'

const showP = ref(false)
const showCP = ref(false)
const form = ref(Inertia.form({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  terms: false
}))

function submit () {
  form.value.post(this.route('register'), {
    onFinish: () => form.value.reset('password', 'password_confirmation')
  })
}
</script>

<style></style>
