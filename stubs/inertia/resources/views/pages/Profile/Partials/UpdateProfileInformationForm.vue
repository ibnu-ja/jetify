<template>
  <app-form-section @submitted="updateProfileInformation">
    <template #title>
      Profile Information
    </template>

    <template #description>
      Update your account's profile information and email address.
    </template>

    <template #form>
      <!-- Profile Photo -->
      <div
        v-if="$page.props.jetstream.managesProfilePhotos"
        class="mb-4"
      >
        <!-- Profile Photo File Input -->
        <input
          type="file"
          class="d-none"
          ref="photo"
          @change="updatePhotoPreview"
        >
        <!-- New Profile Photo Preview -->
        <v-avatar size="80">
          <v-img
            v-if="photoPreview"
            :src="photoPreview"
          />
          <v-img
            v-else
            :src="user.profile_photo_url"
            :alt="user.name"
          />
        </v-avatar>

        <v-btn
          class="ml-3 mt-2 mr-2"
          outlined
          color="info"
          @click.native.prevent="selectNewPhoto"
        >
          Select A New Photo
        </v-btn>
        <v-btn
          v-if="user.profile_photo_path"
          class="mt-2"
          outlined
          color="info"
          @click.native.prevent="deletePhoto"
        >
          Remove Photo
        </v-btn>
      </div>

      <!-- Name -->
      <v-text-field
        v-model="form.name"
        label="Name"
        type="text"
        outlined
        autocomplete="name"
        :error-messages="form.errors.name"
      />

      <!-- Email -->
      <v-text-field
        v-model="form.email"
        label="Email"
        type="email"
        outlined
        :error-messages="form.errors.email"
      />
    </template>

    <template #actions>
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
        :class="{ 'opacity-25': form.processing }"
        :disabled="form.processing"
        @click="form.reset()"
      >
        Reset
      </v-btn>
      <v-btn
        :class="{ 'opacity-25': form.processing }"
        :disabled="form.processing"
        type="submit"
        color="secondary"
      >
        Save
      </v-btn>
    </template>
  </app-form-section>
</template>

<script setup>
import AppFormSection from '@/views/components/FormSection.vue'
import { Inertia } from '@inertiajs/inertia'
import { ref } from '@vue/composition-api'

const props = defineProps({
  user: {
    type: Object,
    default: () => ({})
  }
})
const form = ref(Inertia.form({
  _method: 'PUT',
  name: props.user.name,
  email: props.user.email,
  photo: null
}))
const photoPreview = ref(null)

const photo = ref(null)
function updateProfileInformation () {
  if (photo.value) {
    form.value.photo = photo.value.files[0]
  }
  form.value.post(this.route('user-profile-information.update'), {
    errorBag: 'updateProfileInformation',
    preserveScroll: true,
    onSuccess: () => (clearPhotoFileInput())
  })
}
function selectNewPhoto () {
  // console.log(e)
  photo.value.click()
}
function updatePhotoPreview () {
  const file = photo.value.files[0]
  const reader = new FileReader()
  reader.onload = (e) => {
    photoPreview.value = e.target.result
  }
  reader.readAsDataURL(file)
}
function deletePhoto () {
  Inertia.delete(this.route('current-user-photo.destroy'), {
    preserveScroll: true,
    onSuccess: () => (photoPreview.value = null)
  })
}
function clearPhotoFileInput () {
  photo.value = null
}
</script>
