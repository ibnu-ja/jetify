<template>
  <app-layout>
    <template #header>
      <h2>
        Team Settings
      </h2>
    </template>

    <update-team-name-form
      :team="team"
      :permissions="permissions"
    />

    <team-member-manager
      :team="team"
      :available-roles="availableRoles"
      :user-permissions="permissions"
    />

    <template v-if="permissions.canDeleteTeam && ! team.personal_team">
      <v-divider class="my-8" />
      <delete-team-form
        class="mt-10 sm:mt-0"
        :team="team"
      />
    </template>
  </app-layout>
</template>

<script setup>
import AppLayout from '@/views/layouts/AppLayout.vue'
import UpdateTeamNameForm from './Partials/UpdateTeamNameForm.vue'
import DeleteTeamForm from './Partials/DeleteTeamForm.vue'
// import JetSectionBorder from '@/Jetstream/SectionBorder.vue'
import TeamMemberManager from './Partials/TeamMemberManager.vue'

// eslint-disable-next-line vue/require-prop-types
defineProps(['team', 'availableRoles', 'permissions'])
</script>
