<template>
  <v-dialog :value="value" @input="$emit('input', $event)" max-width="470">
      <v-card class="card">
    <h2 class="text-center">Remove <span class="user">{{person && person.username}}</span>?</h2>
    <v-divider class="divider"></v-divider>
    <div class="button-container">
    <v-btn @click="removeLikedUser">Yes</v-btn>
        <v-btn @click="nevermind">No</v-btn>
        </div>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
  name: "ConfirmDeleteModal",
  props: {
    value: {
      type: Boolean,
    },
    person: {
      type: Object,
    },
  },
  methods: {
    removeLikedUser() {
        console.log(this.person)
      this.$store.dispatch("messages/REMOVE_LIKED_USER", this.person._id);
      this.$emit("input", false);
    },
    nevermind() {
      this.$emit("input", false);
    },
  },

}
</script>R
<style scoped>

.v-btn {
    background: orange !important;
    color: rgb(24, 28, 23);
}

.divider {
    margin: 15px 20px;
}

.user {
    color: rgb(191, 232, 27) !important;
}

.button-container {
    display: flex;
    justify-content: space-around;
}
.v-card {
    padding: 40px !important;
    background: rgb(143, 56, 124) !important;
}

</style>