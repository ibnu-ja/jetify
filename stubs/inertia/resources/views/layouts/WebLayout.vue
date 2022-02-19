<template>
  <v-app>
    <v-app-bar
      app
      flat
      :color="$vuetify.theme.dark ? '' : 'white'"
      fixed
    >
      <v-spacer />

      <v-btn
        v-if="$page.props.user"
        text
        class="d-none d-sm-flex mr-2 text-capitalize"
        to="/dashboard"
      >
        Dashboard
      </v-btn>

      <template v-else>
        <v-btn
          v-if="!route().current('login') && !route().current('register')"
          :to="route('login')"
          text
          outlined
        >
          Login
        </v-btn>
        <v-btn
          v-if="!route().current('login') && !route().current('register')"
          :href="route('register')"
          color="primary"
          class="ml-2"
        >
          Register
        </v-btn>

        <div v-if="route().current('login') || route().current('register')">
          <transition
            name="slide-fade"
            mode="out-in"
          >
            <div
              v-if="route().current('login')"
              key="registerinertia-link"
            >
              Don't have an account?
              <inertia-link :href="route('register')">
                Sign up
              </inertia-link>
            </div>
            <div
              v-else
              key="logininertia-link"
            >
              Already have an account?
              <inertia-link :href="route('login')">
                Sign in
              </inertia-link>
            </div>
          </transition>
        </div>
      </template>
    </v-app-bar>

    <v-main class="mt-6">
      <v-container class="pa-0 pa-sm-2">
        <slot />
      </v-container>
    </v-main>

    <v-footer padless>
      <v-row
        justify="center"
        no-gutters
      >
        <v-col
          class="py-4 text-center"
          cols="12"
        >
          © IJI
          <!--2021 - -->
          {{ new Date().getFullYear() }}
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>
