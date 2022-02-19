<template>
  <form-section @submitted="updateTeamName">
    <template #title>
      Team Name
    </template>

    <template #description>
      The team's name an owner information.
    </template>

    <template #form>
      Team Owner
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-img
              size="30"
              :src="team.owner.profile_photo_url"
              :alt="team.owner.name"
            />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ team.owner.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ team.owner.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-text-field
        v-model="form.name"
        :disabled="!permissions.canUpdateTeam"
        outlined
        label="Team Name"
      />
    </template>

    <template
      #actions
      v-if="permissions.canUpdateTeam"
    >
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
        color="secondary"
        :class="{ 'opacity-25': form.processing }"
        :disabled="form.processing"
        type="submit"
      >
        Save
      </v-btn>
    </template>
  </form-section>
</template>

<script setup>
import { Inertia } from '@inertiajs/inertia'
import { ref } from '@vue/composition-api'
import FormSection from '@/views/components/FormSection.vue'

// eslint-disable-next-line vue/require-prop-types
const props = defineProps(['team', 'permissions'])

const form = ref(Inertia.form({
  name: props.team.name
}))

// data () {
//   return {
//     form: this.$inertia.form({
//       name: this.team.name
//     })
//   }
// },

// methods: {
function updateTeamName () {
  form.value.put(this.route('teams.update', props.team), {
    errorBag: 'updateTeamName',
    preserveScroll: true
  })
}
</script>
