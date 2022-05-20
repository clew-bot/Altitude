<template>
  <div>
    <v-card class="v-card">
      <h3 class="text-center">Some cool people</h3>
    <v-card v-for="user in likedUsers" :key="user._id" >
      <div class="inner-card">
        {{user.username}}
      </div>
      <div></div>
    </v-card>
    </v-card>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: "LikedFriends",
    methods: {
      async retrieveLikedUsers() {
        this.$store.dispatch("messages/GET_LIKED_USERS");
      }
    },
    computed: {
        ...mapGetters("messages", [
      "likedUsers",
    ]),
    },
    created() {
      this.retrieveLikedUsers();
    }
}
</script>

<style scoped>

.inner-card {
  display: flex;
  flex-direction: column !important;
  justify-content: center;
  align-items: center;
}
.v-card {
    width: 100%;
    /* display: flex;
    justify-content: center;
    align-items: center; */
}
</style>