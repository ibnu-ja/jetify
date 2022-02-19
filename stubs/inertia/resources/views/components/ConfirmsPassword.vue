<template>
  <span>
    <span @click="startConfirmingPassword">
      <slot />
    </span>

    <v-dialog
      v-model="confirmingPassword"
      max-width="672"
    >

      <v-form @submit.prevent="confirmPassword">
        <v-card>
          <v-card-title class="headline">
            {{ title }}
          </v-card-title>

          <v-card-text>
            {{ content }}

            <div class="mt-4">
              <v-text-field
                ref="password"
                v-model="form.password"
                type="password"
                class="mt-1"
                label="Password"
                outlined
                :error-messages="error"
              />
            </div>
          </v-card-text>

          <v-card-actions class="px-6 py-4">
            <v-spacer />
            <v-btn
              outlined
              @click="confirmingPassword = false"
            >
              Nevermind
            </v-btn>

            <v-btn
              color="secondary"
              :class="{ 'opacity-25': form.processing }"
              :disabled="form.processing"
              type="submit"
            >
              {{ button }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </span>
</template>

<script>
import axios from 'axios'/* eslint-disable vue/require-prop-types */

export default {
  props: {
    title: {
      type: String,
      default: 'Confirm Password'
    },
    content: {
      type: String,
      default: 'For your security, please confirm your password to continue.'
    },
    button: {
      type: String,
      default: 'Confirm'
    }
  },

  data () {
    return {
      confirmingPassword: false,
      form: {
        password: ''
      },
      error: null
    }
  },

  watch: {
    confirmingPassword () {
      this.form.password = ''
      this.error = ''
    }
  },

  methods: {
    startConfirmingPassword () {
      axios.get(this.route('password.confirmation')).then(response => {
        if (response.data.confirmed) {
          this.$emit('confirmed')
        } else {
          this.confirmingPassword = true

          setTimeout(() => this.$refs.password.focus(), 250)
        }
      })
    },

    confirmPassword () {
      this.form.processing = true

      axios
        .post(this.route('password.confirm'), {
          password: this.form.password
        })
        .then(() => {
          this.confirmingPassword = false
          this.$nextTick(() => this.$emit('confirmed'))
        })
        .catch(error => {
          this.error = error.response.data.errors.password[0]
          // this.errors = Object.values(res.data.errors)
          this.$nextTick(() => {
            setTimeout(() => {
              this.$refs.password.focus()
            })
          })
        })
        .finally(() => {
          this.form.processing = false
        })
    }
  }
}
</script>
