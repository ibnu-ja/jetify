<template>
  <div>
    <action-section>
      <template #title>
        Delete Team
      </template>

      <template #description>
        Permanently delete this team.
      </template>

      <template #content>
        Once a team is deleted, all of its resources and data will be permanently deleted. Before deleting this team, please download any data or information regarding this team that you wish to retain.
      </template>
      <template #actions>
        <v-btn
          color="error"
          @click="confirmTeamDeletion"
        >
          Delete Team
        </v-btn>
      </template>
    </action-section>

    <!-- Delete Team Confirmation Modal -->
    <v-dialog
      max-width="672"
      v-model="confirmingTeamDeletion"
    >
      <v-card>
        <v-card-title>
          Delete Team
        </v-card-title>

        <v-card-text>
          Are you sure you want to delete this team? Once a team is deleted, all of its resources and data will be permanently deleted.
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn @click="confirmingTeamDeletion = false">
            Cancel
          </v-btn>
          <v-btn
            color="danger"
            @click="deleteTeam"
            :class="{ 'opacity-25': form.processing }"
            :disabled="form.processing"
          >
            Delete Team
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import ActionSection from '@/views/components/ActionSection.vue'
import { Inertia } from '@inertiajs/inertia'
import { ref } from '@vue/composition-api'
// eslint-disable-next-line vue/require-prop-types
const props = defineProps(['team'])

const confirmingTeamDeletion = ref(false)
// const deleting = ref(false)
const form = ref(Inertia.form())

function confirmTeamDeletion () {
  confirmingTeamDeletion.value = true
}
function deleteTeam () {
  form.value.delete(this.route('teams.destroy', props.team), {
    errorBag: 'deleteTeam'
  })
}
// export default defineComponent({
//   // eslint-disable-next-line vue/require-prop-types
//   props: ['team'],

//   data () {
//     return {
//       confirmingTeamDeletion: false,
//       deleting: false,

//       form: this.$inertia.form()
//     }
//   },

//   methods: {
//     confirmTeamDeletion () {
//       this.confirmingTeamDeletion = true
//     },

//     deleteTeam () {
//       this.form.delete(this.route('teams.destroy', this.team), {
//         errorBag: 'deleteTeam'
//       })
//     }
//   }
// })
</script>
