<template>
  <app-action-section>
    <template #title>
      Browser Sessions
    </template>

    <template #description>
      Manage and logout your active sessions on other browsers and devices.
    </template>

    <template #content>
      <div class="text-sm">
        If necessary, you may logout of all of your other browser sessions
        across all of your devices. Some of your recent sessions are listed
        below; however, this list may not be exhaustive. If you feel your
        account has been compromised, you should also update your password.
      </div>

      <v-dialog
        v-model="confirmingLogout"
        max-width="672"
      >
        <v-form @submit.prevent="logoutOtherBrowserSessions">
          <v-card>
            <v-card-title>
              Logout Other Browser Sessions
            </v-card-title>

            <v-card-text>
              <p>
                Please enter your password to confirm you would like to logout of
                your other browser sessions across all of your devices.
              </p>

              <v-text-field
                ref="password"
                v-model="form.password"
                type="password"
                label="Password"
                outlined
                :error-messages="Object.values(form.errors)"
              />
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <v-btn
                outlined
                @click.native="closeModal"
              >
                Nevermind
              </v-btn>

              <v-btn
                color="secondary"
                :class="{ 'opacity-25': form.processing }"
                :disabled="form.processing"
                type="submit"
              >
                Logout Other Browser Sessions
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>

      <!-- Other Browser Sessions -->
      <v-list v-if="sessions.length > 0">
        <v-list-item
          v-for="(session, i) in sessions"
          :key="i"
          class="flex items-center"
        >
          <v-list-item-icon>
            <v-icon
              v-if="session.agent.is_desktop"
              size="50"
            >
              mdi-desktop-tower-monitor
            </v-icon>
            <v-icon
              v-else
              size="50"
            >
              mdi-cellphone
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{ session.agent.platform }} -
              {{ session.agent.browser }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ session.ip_address }},
              <span
                v-if="session.is_current_device"
                class="green--text accent-4 font-semibold"
              >
                This device
              </span>
              <span v-else>Last active {{ session.last_active }}</span>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <transition
        leave-active-class="transition ease-in duration-1000"
        leave-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-show="form.recentlySuccessful"
          class="text-sm text-gray-600"
        >
          Saved. Done.
        </div>
      </transition>
    </template>

    <template #actions>
      <v-btn
        color="secondary"
        @click.native="confirmLogout"
      >
        Logout Other Browser Sessions
      </v-btn>
    </template>
  </app-action-section>
</template>

<script setup>
import { Inertia } from '@inertiajs/inertia'
import AppActionSection from '@/views/components/ActionSection.vue'
import { ref, nextTick } from '@vue/composition-api'
defineProps({
  sessions: {
    type: Array,
    default: () => []
  }
})
const confirmingLogout = ref(false)
const form = ref(Inertia.form({
  password: ''
}))
function confirmLogout () {
  confirmingLogout.value = true
  nextTick(() => {
    setTimeout(() => {
      password.value.focus()
    })
  })
}
const password = ref(null)

function logoutOtherBrowserSessions () {
  form.value.delete(this.route('other-browser-sessions.destroy'), {
    preserveScroll: true,
    onSuccess: () => closeModal(),
    onError: () => {
      nextTick(() => {
        setTimeout(() => {
          password.value.focus()
        })
      })
    },
    onFinish: () => form.value.reset()
  })
}
function closeModal () {
  confirmingLogout.value = false
  form.value.reset()
}
//   }
// }
</script>
