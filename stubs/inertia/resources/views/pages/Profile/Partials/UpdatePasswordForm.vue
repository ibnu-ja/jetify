<template>
  <app-form-section @submitted="updatePassword">
    <template #title>
      Update Password
    </template>

    <template #description>
      Ensure your account is using a long, random password to stay secure.
    </template>

    <template #form>
      <v-text-field
        ref="currentPassword"
        v-model="form.current_password"
        label="Current Password"
        outlined
        autocomplete="current-password"
        :error-messages="form.errors.current_password"
        :append-icon="showCP ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showCP ? 'text' : 'password'"
        @click:append="showCP = !showCP"
      />

      <v-text-field
        ref="password"
        v-model="form.password"
        outlined
        label="Password"
        required
        autocomplete="new-password"
        :error-messages="form.errors.password"
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
        :error-messages="form.errors.password_confirmation"
        :append-icon="showNP ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showNP ? 'text' : 'password'"
        @click:append="showNP = !showNP"
      />
    </template>

    <template #actions>
      <transition
        leave-active-class="transition ease-in duration-1000"
        leave-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-show="form.recentlySuccessful"
          class="text-sm text-gray-600"
        >
          Saved.
        </div>
      </transition>
      <v-spacer />
      <v-btn
        :class="{ 'opacity-25': form.processing }"
        :disabled="form.processing"
        @click="form.reset()"
      >
        Clear
      </v-btn>
      <v-btn
        :class="{ 'opacity-25': form.processing }"
        :disabled="form.processing"
        type="submit"
        color="secondary"
      >
        Save
      </v-btn>
    </template>
  </app-form-section>
</template>

<script setup>
import AppFormSection from '@/views/components/FormSection.vue'
import { ref } from '@vue/composition-api'
import { Inertia } from '@inertiajs/inertia'

const showCP = ref(false)
const showP = ref(false)
const showNP = ref(false)
const form = ref(Inertia.form({
  current_password: '',
  password: '',
  password_confirmation: ''
}))
const password = ref(null)
const currentPassword = ref(null)
function updatePassword () {
  form.value.put(this.route('user-password.update'), {
    errorBag: 'updatePassword',
    preserveScroll: true,
    onSuccess: () => this.form.reset(),
    onError: () => {
      if (this.form.errors.password) {
        this.form.reset('password', 'password_confirmation')
        password.value.focus()
      }
      if (this.form.errors.current_password) {
        form.value.reset('current_password')
        currentPassword.value.focus()
      }
    }
  })
}
</script>
