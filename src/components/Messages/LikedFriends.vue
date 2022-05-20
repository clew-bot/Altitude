<template>

  <div v-if="likedUsers">
    <v-divider></v-divider>
    <h3 class="liked">people i like 🤝</h3>
    <div class="outer-container">
      <v-card v-for="user in likedUsers" :key="user._id" class="user-card">
        <div v-if="user.profilePic">
         <v-tooltip top>
               <template v-slot:activator="{ on, attrs }">
          <img      v-bind="attrs"
          v-on="on" :src="'/api/images/' + user.profilePic" alt="" />
      </template>
      <span>@{{user.username}}</span></v-tooltip></div>
        <div v-else>  
           <v-tooltip top>
               <template v-slot:activator="{ on, attrs }">
          <NNKoala v-bind="attrs"
          v-on="on"  class="no-profilepic"/>
      </template>
      <span>@{{user.username}}</span>
      </v-tooltip>
          </div>
      </v-card>
    </div>
  </div>
  <div v-else>
  <h1 class="no-likes">no likes </h1> 
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import NNKoala from "../../assets/svgs/NNKoala.svg";

export default {
  name: "LikedFriends",
  components: {
    NNKoala,
  },
  methods: {
    async retrieveLikedUsers() {
      this.$store.dispatch("messages/GET_LIKED_USERS");
    },
  },
  computed: {
    ...mapGetters("messages", ["likedUsers"]),
  },
  created() {
    this.retrieveLikedUsers();
  },
};
</script>

<style scoped>

.no-likes {
  color: white;
}
.liked {
  color: white;
  font-size: 3rem;
  margin: 20px 20px;

}
.no-profilepic {
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;  
  align-items: center;
  background: rgb(62, 38, 117);
  border-radius: 40%;
}

.username {
  color: white;
  z-index: 2;
  position: absolute;
  top: 5%;
  left: 5%;
  font-weight: light;
  font-size: .9rem;
}
.outer-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.user-card {
  z-index: 1;
  background: none !important;
  box-shadow: none !important; 
  height: 100px;
  width: 100px;
}

.user-card img {
  z-index: -1 !important;
  position: absolute;
  object-fit: cover !important;
  height: 100px;
  width: 100px;
  mix-blend-mode: soft-light;
  transition: all 0.3s ease-in-out;
  border-radius: 5px;
  border-radius: 50%;
}

.user-card img:hover {
  mix-blend-mode: normal;
  transition: all 0.4s ease;
    border-radius: 5px;
}

.user-card:hover {

  
}
</style>
