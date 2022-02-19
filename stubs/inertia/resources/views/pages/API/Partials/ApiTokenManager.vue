<template>
  <div>
    <form-section @submitted="createApiToken">
      <template #title>
        Create API Token
      </template>

      <template #description>
        API tokens allow third-party services to authenticate with our application on your behalf.
      </template>

      <template #form>
        <!-- Token Name -->
        <v-text-field
          v-model="createApiTokenForm.name"
          label="Name"
          type="text"
          outlined
          autocomplete="name"
          :error-messages="createApiTokenForm.errors.name"
        />
        <!-- Token Permissions -->
        <v-row dense>
          <v-col
            v-for="(item, key) in chunked"
            :key="key"
          >
            <v-checkbox
              v-for="permission in item"
              v-model="createApiTokenForm.permissions"
              :label="permission"
              :key="permission"
              :value="permission"
            />
          </v-col>
        </v-row>
      </template>
      <template #actions>
        <transition
          leave-active-class="transition ease-in duration-1000"
          leave-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            v-show="createApiTokenForm.recentlySuccessful"
            class="text-sm text-gray-600"
          >
            Created.
          </div>
        </transition>
        <v-spacer />
        <v-btn
          :class="{ 'opacity-25': createApiTokenForm.processing }"
          :disabled="createApiTokenForm.processing"
          type="submit"
          color="secondary"
        >
          Create
        </v-btn>
      </template>
    </form-section>

    <template v-if="tokens.length > 0">
      <v-divider class="my-8" />

      <action-section>
        <template #title>
          Manage API Tokens
        </template>

        <template #description>
          You may delete any of your existing tokens if they are no longer needed.
        </template>

        <template #content>
          <v-list dense>
            <v-list-item
              v-for="token in tokens"
              :key="token.id"
            >
              <v-list-item-title v-text="token.name" />
              <v-spacer />
              <v-btn
                small
                text
                class="d-none d-sm-flex mx-1 text-capitalize"
                @click.prevent="manageApiTokenPermissions(token)"
                v-if="availablePermissions.length > 0"
              >
                Permissions
              </v-btn>
              <v-btn
                small
                text
                color="error"
                class="d-none d-sm-flex mx-1 text-capitalize"
                @click.prevent="confirmApiTokenDeletion(token)"
                v-if="availablePermissions.length > 0"
              >
                Delete
              </v-btn>
            </v-list-item>
          </v-list>
        </template>
      </action-section>
    </template>

    <!-- Token Value Modal -->
    <v-dialog
      v-model="displayingToken"
      max-width="672"
    >
      <v-card>
        <v-card-title>
          API Token
        </v-card-title>

        <v-card-text>
          <p>
            Please copy your new API token. For your security, it won't be shown again.
          </p>
          <app-code v-if="$page.props.jetstream.flash.token">
            <pre><code v-if="$page.props.jetstream.flash.token">{{ $page.props.jetstream.flash.token }}</code></pre>
          </app-code>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn @click="displayingToken = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- API Token Permissions Modal -->
    <v-dialog
      v-model="showManagingPermissionModal"
      max-width="672"
    >
      <v-card>
        <v-card-title>
          API Token Permissions
        </v-card-title>

        <v-card-text>
          <v-row dense>
            <v-col
              v-for="(item, key) in chunked"
              :key="key"
            >
              <v-checkbox
                v-for="permission in item"
                v-model="updateApiTokenForm.permissions"
                :label="permission"
                :key="permission"
                :value="permission"
              />
            </v-col>
          </v-row>

          <v-card-actions>
            <v-spacer />
            <v-btn @click="showManagingPermissionModal = false">
              Cancel
            </v-btn>
            <v-btn
              color="secondary"
              @click="updateApiToken"
              :class="{ 'opacity-25': updateApiTokenForm.processing }"
              :disabled="updateApiTokenForm.processing"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Delete Token Confirmation Modal -->
    <v-dialog
      v-model="showApiTokenDeletionModal"
      max-width="672"
    >
      <v-card>
        <v-card-title>
          Delete API Token
        </v-card-title>

        <v-card-text>
          Are you sure you would like to delete this API token?

          <v-card-actions>
            <v-spacer />
            <v-btn @click="showApiTokenDeletionModal = false">
              Cancel
            </v-btn>
            <v-btn
              color="error"
              @click="deleteApiToken"
              :class="{ 'opacity-25': deleteApiTokenForm.processing }"
              :disabled="deleteApiTokenForm.processing"
            >
              Delete
            </v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import ActionSection from '@/views/components/ActionSection.vue'
import FormSection from '@/views/components/FormSection.vue'
import { Inertia } from '@inertiajs/inertia'
import { ref } from '@vue/composition-api'
import { chunk } from 'lodash'
import AppCode from '@/views/components/AppCode.vue'

// eslint-disable-next-line vue/require-prop-types
const props = defineProps(['tokens', 'availablePermissions', 'defaultPermissions'])

const createApiTokenForm = ref(Inertia.form({
  name: '',
  permissions: props.defaultPermissions
}))
const chunked = ref(chunk(props.availablePermissions, 2))
const updateApiTokenForm = ref(Inertia.form({
  permissions: []
}))
const deleteApiTokenForm = ref(Inertia.form())

const displayingToken = ref(false)
const managingPermissionsFor = ref(null)
const showManagingPermissionModal = ref(false)
const apiTokenBeingDeleted = ref(null)
const showApiTokenDeletionModal = ref(null)

function createApiToken () {
  createApiTokenForm.value.post(this.route('api-tokens.store'), {
    preserveScroll: true,
    onSuccess: () => {
      displayingToken.value = true
      createApiTokenForm.value.reset()
    }
  })
}

function manageApiTokenPermissions (token) {
  showManagingPermissionModal.value = true
  updateApiTokenForm.value.permissions = token.abilities

  managingPermissionsFor.value = token
}

function updateApiToken () {
  updateApiTokenForm.value.put(this.route('api-tokens.update', managingPermissionsFor.value), {
    preserveScroll: true,
    preserveState: true,
    onSuccess: () => {
      managingPermissionsFor.value = null
      showManagingPermissionModal.value = false
    }
  })
}

function confirmApiTokenDeletion (token) {
  showApiTokenDeletionModal.value = true
  apiTokenBeingDeleted.value = token
}

function deleteApiToken () {
  deleteApiTokenForm.value.delete(this.route('api-tokens.destroy', apiTokenBeingDeleted.value), {
    preserveScroll: true,
    preserveState: true,
    onSuccess: () => {
      apiTokenBeingDeleted.value = null
      showApiTokenDeletionModal.value = false
    }
  })
}
</script>
