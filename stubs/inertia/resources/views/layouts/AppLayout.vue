<template>
  <v-app>
    <jetstream-flash />
    <v-app-bar
      id="app-nav"
      app
      fixed
      clipped-left
    >
      <inertia-link href="/">
        <v-avatar
          class="mx-2"
          color="grey darken-1"
          size="32"
        />
      </inertia-link>
      <v-app-bar-nav-icon
        class="d-lg-none"
        @click.stop="drawer = !drawer"
      />

      <v-toolbar-title
        v-if="$slots.header"
        id="pageheader"
      >
        <slot name="header" />
      </v-toolbar-title>

      <v-spacer />
      <!-- Navigation Links -->
      <!-- Teams Dropdown -->
      <v-menu
        v-if="$page.props.jetstream.hasTeamFeatures"
        offset-y
        transition="slide-y-transition"
        min-width="240"
      >
        <template #activator="{ on, attrs }">
          <v-btn
            text
            v-bind="attrs"
            class="text-capitalize d-none d-sm-flex"
            v-on="on"
          >
            {{ $page.props.user.current_team.name }}
            <svg
              style="width: 1rem; height: 1rem;"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </v-btn>
        </template>
        <v-list dense>
          <v-subheader>Manage Team</v-subheader>
          <v-list-item
            :to="route('teams.show', $page.props.user.current_team)"
          >
            Team Settings
          </v-list-item>
          <v-list-item
            v-if="$page.props.jetstream.canCreateTeams"
            :to="route('teams.create')"
          >
            Create New Team
          </v-list-item>

          <v-subheader>Switch Teams</v-subheader>
          <template v-for="team in $page.props.user.all_teams">
            <v-list-item
              :key="team.id"
              @click.prevent="switchToTeam(team)"
            >
              <v-list-item-icon
                v-if="team.id == $page.props.user.current_team_id"
              >
                <v-icon style="color: rgba(52, 211, 153, 1); ">
                  mdi-check-circle-outline
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ team.name }}</v-list-item-title>
            </v-list-item>
          </template>
        </v-list>
      </v-menu>

      <!-- Settings Dropdown -->
      <v-menu
        offset-y
        transition="slide-y-transition"
        min-width="200"
      >
        <template #activator="{ on, attrs }">
          <v-avatar
            v-if="$page.props.jetstream.managesProfilePhotos"
            v-bind="attrs"
            v-on="on"
          >
            <img
              :src="$page.props.user.profile_photo_url"
              :alt="$page.props.user.name"
            >
          </v-avatar>
          <v-btn
            v-else
            text
            v-bind="attrs"
            class="text-capitalize d-none d-sm-flex"
            v-on="on"
          >
            {{ $page.props.user.name }}

            <svg
              class=" -mr-0.5 "
              style="width: 1.rem; height: 1rem; "
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item
            to="/"
          >
            Home
          </v-list-item>
          <v-subheader>Manage Account</v-subheader>
          <v-list-item
            class="v-list-item"
            :to="route('profile.show')"
          >
            Profile
          </v-list-item>
          <v-list-item
            v-if="$page.props.jetstream.hasApiFeatures"
            :to="route('api-tokens.index')"
          >
            API Tokens
          </v-list-item>
          <v-divider />
          <!-- Authentication -->
          <v-list-item @click.prevent="logout">
            Logout
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <!-- Responsive Navigation Menu -->
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list
        nav
        dense
      >
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <img
                :src="$page.props.user.profile_photo_url"
                :alt="$page.props.user.name"
              >
            </v-list-item-avatar>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <div>{{ $page.props.user.name }}</div>
              <div class="text--secondary">
                {{ $page.props.user.email }}
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-list-item-group
          color="primary"
        >
          <v-list-item
            :to="route('dashboard')"
            :class="{'v-item--active v-list-item--active v-list-item--link' : route().current('dashboard')} "
          >
            <v-list-item-icon>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item>

          <!-- API Management -->
          <v-list-item
            v-if="$page.props.jetstream.hasApiFeatures"
            :to="route('api-tokens.index')"
            :class="{'v-item--active v-list-item--active v-list-item--link' : route().current('api-tokens.index')} "
          >
            <v-list-item-icon>
              <v-icon>mdi-api</v-icon>
            </v-list-item-icon>
            <v-list-item-title>API Tokens</v-list-item-title>
          </v-list-item>
          <v-divider />

          <!-- Team Management -->
          <template v-if="$page.props.jetstream.hasTeamFeatures">
            <v-subheader>
              Manage Team
            </v-subheader>

            <v-list-item
              :to="route('teams.show', $page.props.user.current_team)"
              :class="{'v-item--active v-list-item--active v-list-item--link' : route().current('teams.show')} "
            >
              <v-list-item-icon>
                <v-icon>mdi-account-multiple-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Team Settings</v-list-item-title>
            </v-list-item>
            <v-list-item
              v-if="$page.props.jetstream.canCreateTeams"
              :to="route('teams.create')"
              :class="{'v-item--active v-list-item--active v-list-item--link' : route().current('teams.create')} "
            >
              <v-list-item-icon>
                <v-icon>mdi-account-multiple-plus-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Create New Team</v-list-item-title>
            </v-list-item>

            <v-subheader>
              Switch Teams
            </v-subheader>

            <template v-for="team in $page.props.user.all_teams">
              <v-list-item
                :key="team.id"
                @click.prevent="switchToTeam(team)"
              >
                <v-list-item-icon
                  v-if="team.id == $page.props.user.current_team_id"
                >
                  <v-icon style="color: rgba(52, 211, 153, 1); ">
                    mdi-check-circle-outline
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-title>{{ team.name }}</v-list-item-title>
              </v-list-item>
            </template>
            <v-divider />
          </template>
          <v-subheader>
            Account
          </v-subheader>

          <v-list-item
            :to="route('profile.show')"
            :class="{'v-item--active v-list-item--active v-list-item--link' : route().current('profile.show')} "
          >
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>

          <v-list-item @click.prevent="logout">
            <v-list-item-icon>
              <v-icon>mdi-exit-run</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main v-scroll="onScroll">
      <v-container class="pt-7">
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import JetstreamFlash from '@/views/components/JetstreamFlashBanner.vue'
// import JetApplicationMark from '@/Jetstream/ApplicationMark'

export default {
  components: {
    JetstreamFlash
  },

  data () {
    return {
      drawer: true,
      mini: false,
      showingNavigationDropdown: false,
      scrolled: false,
      selectedItem: 0
    }
  },

  methods: {
    switchToTeam (team) {
      this.$inertia.put(
        this.route('current-team.update'),
        {
          team_id: team.id
        },
        {
          preserveState: false
        }
      )
    },

    logout () {
      this.$inertia.post(this.route('logout'))
    },

    onScroll () {
      // console.log('haciendo scroll')
      const currentScrollPosition =
        window.pageYOffset || document.documentElement.scrollTop // Because of momentum scrolling on mobiles, we shouldn't continue if it is less than zero
      if (currentScrollPosition < 0) {
        return
      }
      if (currentScrollPosition > 60) {
        this.scrolled = true
      } else {
        this.scrolled = false
      }
    }
  }
}
</script>
