<template>
  <div v-if="likedMe" class="outer">
    <v-divider></v-divider>
    <v-card class="liked-me">
    <h3 class="liked"><i>They liked you</i></h3>
    <div class="outer-container">
      <v-card v-for="user in likedMe" :key="user._id" class="user-card">
        <div v-if="user.profilePic">
          <v-menu>
            <template #activator="{ on: onMenu }">
              <v-tooltip top color="#5d3b78">
                <template #activator="{ on: onTooltip }">
                  <img
                    v-on="{ ...onMenu, ...onTooltip }"
                    :src="'/api/images/' + user.profilePic"
                    alt=""
                    style="cursor:pointer"
                  />
                </template>

                <span>{{ user.username }}</span>
              </v-tooltip>
            </template>

            <div class="menu-person">
              <div>
                <b
                  ><i>{{ user.headline }}</i></b
                >
                <br />
                <v-icon @click="showingModal(user.username)"
                  >mdi-fountain-pen</v-icon
                >
                <v-icon @click="goToAccount(user.username)"
                  >mdi-account-search</v-icon
                >
                <v-icon @click="removeLikeModal(user)">mdi-close-thick</v-icon>
              </div>
            </div>
          </v-menu>
        </div>
        <div v-else>
          <v-menu>
            <template #activator="{ on: onMenu }">
              <v-tooltip top color="#5d3b78">
                <template #activator="{ on: onTooltip }">
                  <NNKoala
                    v-on="{ ...onMenu, ...onTooltip }"
                    class="no-profilepic"
                  />
                </template>

                <span>{{ user.username }}</span>
              </v-tooltip>
            </template>

            <div class="menu-person">
              <div>
                <b v-if="user.headline"
                  ><i>{{ user.headline }}</i></b
                >
                <span v-else>😎😎😎😎</span>
                <br />
                <v-icon @click="showingModal(user.username)"
                  >mdi-fountain-pen</v-icon
                >
                <v-icon @click="goToAccount(user.username)"
                  >mdi-account-search</v-icon
                >
                <v-icon @click="removeLikeModal(user)">mdi-close-thick</v-icon>
              </div>
            </div>
          </v-menu>
        </div>
      </v-card>
      <SendMessageModal v-model="dialog" :person="theUsername" />
      <ConfirmDeleteModal v-model="dialog2" :person="removedUser" />
    </div>

    </v-card>
  </div>




  <div v-else>
    <h1 class="no-likes">Looks like no one liked me!...<i>yet</i></h1>
    <p>Try editing your profile!</p>
  </div>



  
</template>

<script>
import { mapGetters } from "vuex";
import NNKoala from "../../assets/svgs/NNKoala.svg";
import SendMessageModal from "@/components/Modals/SendMessageModal.vue";
import ConfirmDeleteModal from "@/components/Modals/ConfirmDeleteModal.vue";

export default {
  name: "LikedFriends",
  components: {
    NNKoala,
    SendMessageModal,
    ConfirmDeleteModal,
  },
  data() {
    return {
      show: false,
      selected: null,
      dialog: false,
      dialog2: false,
      theUsername: "",
      removedUser: undefined,
    };
  },
  methods: {
    async retrieveLikedUsers() {
    },
    showingModal(username) {
      this.theUsername = username;
      this.dialog = !this.dialog;
    },
    goToAccount(username) {
      this.$router.push("/profile/" + username);
    },
    removeLikeModal(user) {
      this.removedUser = user;
      this.dialog2 = !this.dialog2;
    },
  },
  computed: {
    ...mapGetters("messages", ["likedMe"]),
  },
  created() {

  },
};
</script>

<style scoped>
.outer {
  padding: 2rem;

}

.liked-me {
  background: rgb(236, 187, 128);
  padding: 10px;
  border-radius: 10px;  
  max-width: 900px;

}

.v-menu__content {
  box-shadow: none;
}

.menu-person {
  background: rgb(159, 212, 236);
  border-radius: 10px;
  margin-top: 7rem;
  max-width: 300px;
  padding: 1rem;
  border: 1px solid rgb(46, 141, 230);
}
.second-tt {
  border: solid 2px hotpink !important;
  padding: 100px !important;
}
.no-likes {
  color: rgb(210, 206, 206);
  margin-top: 20px;
  
}
.liked {
  color: rgb(24, 16, 16);
  font-size: 2.8rem;
  margin: 20px 20px;
  text-align: left !important;
  text-decoration: underline;


  
}
.no-profilepic {
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(62, 38, 117);
  border-radius: 40%;
  outline: none !important;
  cursor: pointer;
}

.username {
  color: white;
  z-index: 2;
  position: absolute;
  top: 5%;
  left: 5%;
  font-weight: light;
  font-size: 0.9rem;
}
.outer-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
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
