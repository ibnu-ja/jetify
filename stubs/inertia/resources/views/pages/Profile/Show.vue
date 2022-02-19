<template>
  <!-- eslint-disable vue/multi-word-component-names -->
  <app-layout>
    <template #header>
      <h2>
        Profile
      </h2>
    </template>

    <div>
      <div class="mx-auto py-10 px-sm-6 px-lg-8">
        <div v-if="$page.props.jetstream.canUpdateProfileInformation">
          <update-profile-information-form :user="$page.props.user" />

          <v-divider class="my-8" />
        </div>

        <div v-if="$page.props.jetstream.canUpdatePassword">
          <update-password-form class="mt-10 mt-sm-0" />

          <v-divider class="my-8" />
        </div>

        <div v-if="$page.props.jetstream.canManageTwoFactorAuthentication">
          <two-factor-authentication-form class="mt-10 mt-sm-0" />

          <v-divider class="my-8" />
        </div>

        <logout-other-browser-sessions-form
          :sessions="sessions"
          class="mt-10 mt-sm-0"
        />

        <template v-if="$page.props.jetstream.hasAccountDeletionFeatures">
          <v-divider class="my-8" />

          <delete-user-form class="mt-10 mt-sm-0" />
        </template>
      </div>
    </div>
  </app-layout>
</template>

<script setup>
import AppLayout from '@/views/layouts/AppLayout.vue'
import DeleteUserForm from './Partials/DeleteUserForm.vue'
import LogoutOtherBrowserSessionsForm from './Partials/LogoutOtherBrowserSessionsForm.vue'
import TwoFactorAuthenticationForm from './Partials/TwoFactorAuthenticationForm.vue'
import UpdatePasswordForm from './Partials/UpdatePasswordForm.vue'
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm.vue'

defineProps({
  sessions: {
    type: Array,
    default: () => null
  }
})

</script>
