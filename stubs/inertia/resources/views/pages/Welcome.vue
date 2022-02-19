<template>
  <web-layout>
    <v-container>
      <v-row
        justify="center"
        class="py-4 mb-10 pt-0"
        align="center"
      >
        <v-col
          cols="12"
          md="10"
          order="first"
          class="align-center pr-6 "
        >
          <h1 class="text-h4 text-sm-h3 text-lg-h2 mt-xl-4 font-weight-black">
            Material design in Jetstream with <span class="primary--text">JetVuetify</span>
          </h1>
          <h2 class="text-h6 text-sm-h5 secondary--text mt-4 pr-6">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt hic blanditiis enim! Delectus eius facere cum incidunt officiis?
          </h2>
          <v-btn
            x-large
            color="secondary"
            class="mt-6"
            href="https://vuetifyjs.com/en/"
            target="_blank"
          >
            Documentation
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-sheet color="white">
      <v-container
        fluid
        class="py-4 py-lg-8"
      >
        <v-row>
          <v-col
            cols="12"
            md="6"
            class="my-auto"
          >
            <v-img
              max-height="300"
              src="https://picsum.photos/400/300"
            />
          </v-col>
          <v-col
            cols="12"
            md="6"
            class="my-auto"
          >
            <div class="pa-2 rounded">
              <div class="title">
                Feature title
              </div>
              <div class="text-body-1">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error laudantium dolore, quasi similique eveniet id cupiditate unde, qui cumque fugit repudiandae ipsa recusandae delectus, quidem enim suscipit commodi vitae modi.
              </div>
            </div>
            <div class="pa-2 rounded">
              <div class="title">
                Feature title
              </div>
              <div class="text-body-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem ratione tenetur, alias sunt porro, incidunt, atque perspiciatis suscipit distinctio commodi maxime beatae tempore. Quos perspiciatis rem accusamus ad, ipsum veritatis?
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </web-layout>
</template>

<script>
import WebLayout from '@/views/layouts/WebLayout.vue'
export default {
  components: {
    WebLayout
  },
  data () {
    return {
      signUpEmail: false,
      showP: false,
      showCP: false,
      form: this.$inertia.form({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        terms: true
      })
    }
  },
  methods: {
    submit () {
      this.form.password_confirmation = this.form.password
      this.form.post(this.route('register'), {
        onFinish: () => this.form.reset('password', 'password_confirmation')
      })
    }
  }
}
</script>
