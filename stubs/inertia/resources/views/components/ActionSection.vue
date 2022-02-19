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
        <v-card-title v-if="hasStatus">
          <slot name="status" />
        </v-card-title>
        <v-card-text>
          <slot name="content" />
        </v-card-text>
        <v-card-actions v-if="hasActions">
          <slot name="actions" />
        </v-card-actions>
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
