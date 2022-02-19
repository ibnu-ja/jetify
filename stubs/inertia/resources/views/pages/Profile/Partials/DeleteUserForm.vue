<template>
  <app-action-section>
    <template #title>
      Delete Account
    </template>

    <template #description>
      Permanently delete your account.
    </template>

    <template #content>
      <div class="text-sm">
        Once your account is deleted, all of its resources and data will be
        permanently deleted. Before deleting your account, please download any
        data or information that you wish to retain.
      </div>
    </template>
    <template #actions>
      <v-dialog
        v-model="confirmingUserDeletion"
        max-width="672"
      >
        <v-form @submit.prevent="deleteUser">
          <v-card>
            <v-card-title class="headline">
              Delete Account
            </v-card-title>

            <v-card-text>
              Are you sure you want to delete your account? Once your account is
              deleted, all of its resources and data will be permanently deleted.
              Please enter your password to confirm you would like to permanently
              delete your account.

              <div class="mt-4">
                <v-text-field
                  v-model="form.password"
                  type="password"
                  class="mt-1"
                  label="Password"
                  ref="password"
                  outlined
                  :error-messages="Object.values(form.errors)"
                />
              </div>
            </v-card-text>

            <v-card-actions class="px-6 py-4">
              <v-spacer />
              <v-btn
                outlined
                @click.native="closeModal"
              >
                Nevermind
              </v-btn>

              <v-btn
                color="error"
                :class="{ 'opacity-25': form.processing }"
                :disabled="form.processing"
                type="submit"
              >
                Delete Account
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>
      <v-btn
        color="error"
        @click.native="confirmUserDeletion"
      >
        Delete Account
      </v-btn>
    </template>
  </app-action-section>
</template>

<script setup>
import { Inertia } from '@inertiajs/inertia'
import { ref } from '@vue/composition-api'
import AppActionSection from '@/views/components/ActionSection.vue'

defineProps({
  sessions: {
    type: Array,
    default: () => []
  }
})

const confirmingUserDeletion = ref(false)
const form = ref(Inertia.form({
  password: ''
}))
const password = ref(null)
function confirmUserDeletion () {
  confirmingUserDeletion.value = true
  setTimeout(() => password.value.focus(), 250)
}

function deleteUser () {
  form.value.delete(this.route('current-user.destroy'), {
    preserveScroll: true,
    onSuccess: () => closeModal(),
    onError: () => password.value.focus(),
    onFinish: () => form.value.reset()
  })
}

function closeModal () {
  confirmingUserDeletion.value = false
  form.value.reset()
}
</script>
