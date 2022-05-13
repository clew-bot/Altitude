<template>
  <div>
    <v-dialog
      :value="value"
      @input="$emit('input', $event)"
      max-width="600"
    >
      <v-card>
        <v-toolbar color="primary" dark>Opening from the top</v-toolbar>
        <v-card-text>
          <div class="text-h2 pa-12">Hello world!</div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="dialog.value = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "CreatePost",
  props: {
    value: {
      type: Boolean,
    },
  },
};
</script>

<style></style>
