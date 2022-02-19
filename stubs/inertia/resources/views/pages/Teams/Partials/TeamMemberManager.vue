<template>
  <div>
    <div v-if="userPermissions.canAddTeamMembers">
      <v-divider class="my-8" />
      <form-section @submitted="addTeamMember">
        <template #title>
          Add Team Member
        </template>

        <template #description>
          Add a new team member to your team, allowing them to collaborate with you.
        </template>

        <template #form>
          <p>
            Please provide the email address of the person you would like to add to this team.
          </p>
          <v-text-field
            v-model="addTeamMemberForm.email"
            :error-messages="addTeamMemberForm.errors.email"
            outlined
            label="Email"
          />
          Role
          <v-list shaped>
            <v-list-item-group
              v-model="addTeamMemberForm.role"
              mandatory
            >
              <v-list-item
                v-for="(role) in availableRoles"
                :key="role.key"
                :value="role.key"
              >
                <template #default="{ active }">
                  <v-list-item-content>
                    <v-list-item-title v-text="role.name" />
                    <v-list-item-subtitle v-text="role.description" />
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-checkbox
                      :input-value="active"
                    />
                  </v-list-item-action>
                </template>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </template>

        <template #actions>
          <transition
            leave-active-class="transition ease-in duration-1000"
            leave-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <div
              v-show="addTeamMemberForm.recentlySuccessful"
              class="text-sm text-gray-600"
            >
              Added.
            </div>
          </transition>
          <v-spacer />
          <v-btn
            color="secondary"
            :class="{ 'opacity-25': addTeamMemberForm.processing }"
            :disabled="addTeamMemberForm.processing"
            type="submit"
          >
            Add
          </v-btn>
        </template>
      </form-section>
    </div>
    <div v-if="team.team_invitations.length > 0 && userPermissions.canAddTeamMembers">
      <v-divider class="my-8" />
      <action-section>
        <template #title>
          Pending Team Invitations
        </template>

        <template #description>
          These people have been invited to your team and have been sent an invitation email. They may join the team by accepting the email invitation.
        </template>
        <template #content>
          <v-list>
            <v-list-item
              v-for="invitation in team.team_invitations"
              :key="invitation.id"
            >
              <v-list-item-title v-text="invitation.email" />
              <v-spacer />
              <v-btn
                small
                text
                color="error"
                class="d-none d-sm-flex mx-1 text-capitalize"
                @click="cancelTeamInvitation(invitation)"
                v-if="userPermissions.canRemoveTeamMembers"
              >
                Cancel
              </v-btn>
            </v-list-item>
          </v-list>
        </template>
      </action-section>
    </div>
    <div v-if="team.users.length > 0">
      <v-divider class="my-8" />
      <action-section>
        <template #title>
          Team Members
        </template>

        <template #description>
          All of the people that are part of this team.
        </template>
        <template #content>
          <v-list>
            <v-list-item
              v-for="user in team.users"
              :key="user.id"
            >
              <v-list-item-avatar>
                <v-img
                  :src="user.profile_photo_url"
                  :alt="user.name"
                />
              </v-list-item-avatar>
              <v-list-item-title v-text="user.name" />
              <v-spacer />
              <v-btn
                class="d-none d-sm-flex mx-1 text-capitalize"
                text
                v-if="userPermissions.canAddTeamMembers && availableRoles.length"
                @click="manageRole(user)"
                v-text="displayableRole(user.membership.role) "
              />
              <div v-else-if="availableRoles.length">
                {{ displayableRole(user.membership.role) }}
              </div>
              <v-btn
                class="d-none d-sm-flex mx-1 text-capitalize"
                color="error"
                text
                @click="confirmLeavingTeam"
                v-if="$page.props.user.id === user.id"
              >
                Leave
              </v-btn>
              <v-btn
                class="d-none d-sm-flex mx-1 text-capitalize"
                color="error"
                text
                @click="confirmTeamMemberRemoval(user)"
                v-if="userPermissions.canRemoveTeamMembers"
              >
                Remove
              </v-btn>
            </v-list-item>
          </v-list>
        </template>
      </action-section>
    </div>

    <!-- Role Management Modal -->
    <v-dialog
      max-width="672"
      v-model="currentlyManagingRole"
    >
      <v-card>
        <v-card-title>
          Manage Role
        </v-card-title>

        <v-card-text>
          <v-list shaped>
            <v-list-item-group
              v-model="updateRoleForm.role"
              mandatory
            >
              <v-list-item
                v-for="(role) in availableRoles"
                :key="role.key"
                :value="role.key"
              >
                <template #default="{ active }">
                  <v-list-item-content>
                    <v-list-item-title v-text="role.name" />
                    <v-list-item-subtitle v-text="role.description" />
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-checkbox
                      :input-value="active"
                    />
                  </v-list-item-action>
                </template>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn @click="currentlyManagingRole = false">
            Cancel
          </v-btn>
          <v-btn
            color="secondary"
            @click="updateRole"
            :class="{ 'opacity-25': updateRoleForm.processing }"
            :disabled="updateRoleForm.processing"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Leave Team Confirmation Modal -->
    <v-dialog
      max-width="672"
      v-model="confirmingLeavingTeam"
    >
      <v-card>
        <v-card-title>
          Leave Team
        </v-card-title>

        <v-card-text>
          Are you sure you would like to leave this team?
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn @click="confirmingLeavingTeam = false">
            Cancel
          </v-btn>
          <v-btn
            color="error"
            @click="leaveTeam"
            :class="{ 'opacity-25': leaveTeamForm.processing }"
            :disabled="leaveTeamForm.processing"
          >
            Leave
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Remove Team Member Confirmation Modal -->
    <v-dialog
      max-width="672"
      v-model="confirmingRemovingTeamMember"
    >
      <v-card>
        <v-card-title>
          Remove Team Member
        </v-card-title>

        <v-card-text>
          Are you sure you would like to remove this person from the team?
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn @click="confirmingRemovingTeamMember = false">
            Cancel
          </v-btn>
          <v-btn
            color="error"
            @click="removeTeamMember"
            :class="{ 'opacity-25': removeTeamMemberForm.processing }"
            :disabled="removeTeamMemberForm.processing"
          >
            Remove
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import ActionSection from '@/views/components/ActionSection.vue'
import FormSection from '@/views/components/FormSection.vue'

export default defineComponent({
  // eslint-disable-next-line vue/no-unused-components
  components: { ActionSection, FormSection },
  // eslint-disable-next-line vue/require-prop-types
  props: ['userPermissions', 'team', 'availableRoles'],
  data () {
    return {
      addTeamMemberForm: this.$inertia.form({
        email: '',
        role: null
      }),

      updateRoleForm: this.$inertia.form({
        role: null
      }),

      confirmingRemovingTeamMember: null,

      leaveTeamForm: this.$inertia.form(),
      removeTeamMemberForm: this.$inertia.form(),

      currentlyManagingRole: false,
      managingRoleFor: null,
      confirmingLeavingTeam: false,
      teamMemberBeingRemoved: null
    }
  },

  methods: {
    addTeamMember () {
      this.addTeamMemberForm.post(this.route('team-members.store', this.team), {
        errorBag: 'addTeamMember',
        preserveScroll: true,
        onSuccess: () => this.addTeamMemberForm.reset()
      })
    },

    cancelTeamInvitation (invitation) {
      this.$inertia.delete(this.route('team-invitations.destroy', invitation), {
        preserveScroll: true
      })
    },

    manageRole (teamMember) {
      // console.log(teamMember)
      this.managingRoleFor = teamMember
      this.updateRoleForm.role = teamMember.membership.role
      this.currentlyManagingRole = true
    },

    updateRole () {
      this.updateRoleForm.put(this.route('team-members.update', [this.team, this.managingRoleFor]), {
        preserveScroll: true,
        onSuccess: () => (this.currentlyManagingRole = false)
      })
    },

    confirmLeavingTeam () {
      this.confirmingLeavingTeam = true
    },

    leaveTeam () {
      this.leaveTeamForm.delete(this.route('team-members.destroy', [this.team, this.$page.props.user]))
    },

    confirmTeamMemberRemoval (teamMember) {
      this.confirmingRemovingTeamMember = true
      this.teamMemberBeingRemoved = teamMember
    },

    removeTeamMember () {
      this.removeTeamMemberForm.delete(this.route('team-members.destroy', [this.team, this.teamMemberBeingRemoved]), {
        errorBag: 'removeTeamMember',
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => {
          this.teamMemberBeingRemoved = null
          this.confirmingRemovingTeamMember = false
        }
      })
    },

    displayableRole (role) {
      return this.availableRoles.find(r => r.key === role).name
    }
  }
})

// since we cant access this.$page on setup script, I disabled this
// TODO update to vue 3 composition

// import ActionSection from '@/views/components/ActionSection.vue'
// import FormSection from '@/views/components/FormSection.vue'
// import { Inertia } from '@inertiajs/inertia'
// import { ref } from '@vue/composition-api'

// // eslint-disable-next-line vue/require-prop-types
// const props = defineProps(['team', 'availableRoles', 'userPermissions'])

// const addTeamMemberForm = ref(Inertia.form({
//   email: '',
//   role: null
// }))

// const updateRoleForm = ref(Inertia.form({
//   role: null
// }))

// const leaveTeamForm = ref(Inertia.form())

// const removeTeamMemberForm = ref(Inertia.form())

// const currentlyManagingRole = ref(false)
// const managingRoleFor = ref(null)
// const confirmingLeavingTeam = ref(false)
// const teamMemberBeingRemoved = ref(false)
// const confirmingRemovingTeamMember = ref(false)

// function addTeamMember () {
//   addTeamMemberForm.value.post(this.route('team-members.store', props.team), {
//     errorBag: 'addTeamMember',
//     preserveScroll: true,
//     onSuccess: () => addTeamMemberForm.value.reset()
//   })
// }

// function cancelTeamInvitation (invitation) {
//   Inertia.delete(this.route('team-invitations.destroy', invitation), {
//     preserveScroll: true
//   })
// }

// function manageRole (teamMember) {
//   managingRoleFor.value = teamMember.value
//   updateRoleForm.value.role = teamMember.membership.role
//   currentlyManagingRole.value = true
// }

// function updateRole () {
//   updateRoleForm.value.put(this.route('team-members.update', [props.team, managingRoleFor.value]), {
//     preserveScroll: true,
//     onSuccess: () => (currentlyManagingRole.value = false)
//   })
// }

// function confirmLeavingTeam () {
//   confirmingLeavingTeam.value = true
// }

// function leaveTeam () {
//   leaveTeamForm.value.delete(this.route('team-members.destroy', [props.team, this.$page.props.user]))
// }

// function confirmTeamMemberRemoval (teamMember) {
//   confirmingRemovingTeamMember.value = true
//   teamMemberBeingRemoved.value = teamMember
// }

// function removeTeamMember () {
//   removeTeamMemberForm.value.delete(this.route('team-members.destroy', [props.team, teamMemberBeingRemoved.value]), {
//     errorBag: 'removeTeamMember',
//     preserveScroll: true,
//     preserveState: true,
//     onSuccess: () => (teamMemberBeingRemoved.value = null)
//   })
// }

// function displayableRole (role) {
//   return props.availableRoles.find(r => r.key === role).name
// }
</script>
