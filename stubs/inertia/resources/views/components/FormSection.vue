<template>
  <v-row justify="center">
    <v-col
      cols="11"
      md="3"
    >
      <h3 class="">
        <slot name="title" />
      </h3>

      <p class="mt-1 text--secondary">
        <slot name="description" />
      </p>
    </v-col>
    <v-col
      cols="11"
      md="9"
    >
      <v-card class="elevation-2">
        <form @submit.prevent="$emit('submitted')">
          <v-card-title v-if="hasStatus">
            <slot name="formTitle" />
          </v-card-title>
          <v-card-text>
            <slot name="form" />
          </v-card-text>

          <v-card-actions v-if="hasActions">
            <slot name="actions" />
          </v-card-actions>
        </form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  computed: {
    hasActions () {
      return !!this.$slots.actions
    },
    hasStatus () {
      return !!this.$slots.status
    }
  }
}
</script>

<style scoped>
.v-card__actions {
  background-color: #f3f4f6;
  /* position: relative;
    width: 102%;
    left: -17px; */
}
</style>
