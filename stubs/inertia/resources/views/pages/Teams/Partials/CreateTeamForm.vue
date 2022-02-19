<template>
  <form-section @submitted="createTeam">
    <template #title>
      Team Details
    </template>

    <template #description>
      Create a new team to collaborate with others on projects.
    </template>

    <template #form>
      Team Owner
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-img
              size="30"
              :src="$page.props.user.profile_photo_url"
              :alt="$page.props.user.name"
            />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ $page.props.user.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ $page.props.user.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-text-field
        v-model="form.name"
        outlined
        label="Team name"
      />
    </template>

    <template #actions>
      <v-spacer />
      <v-btn
        color="secondary"
        :class="{ 'opacity-25': form.processing }"
        :disabled="form.processing"
        type="submit"
      >
        Create
      </v-btn>
    </template>
  </form-section>
</template>

<script setup>
import { Inertia } from '@inertiajs/inertia'
import { ref } from '@vue/composition-api'
import FormSection from '@/views/components/FormSection.vue'

const form = ref(Inertia.form({
  name: ''
}))

function createTeam () {
  form.value.post(this.route('teams.store'), {
    errorBag: 'createTeam',
    preserveScroll: true
  })
}
</script>
