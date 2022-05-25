<template>
  <div v-if="likedUsers" class="outer">
    <v-card class="liked-card">
    <h3 class="liked"><i>People I like</i></h3>
    <div class="outer-container">
      <v-card v-for="user in likedUsers" :key="user._id" class="user-card">
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

                <span>@{{ user.username }}</span>
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

                <span>@{{ user.username }}</span>
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
    <h1 class="no-likes">no likes 🧐</h1>
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
      this.$store.dispatch("messages/GET_LIKED_USERS");
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
    ...mapGetters("messages", ["likedUsers"]),
  },
  created() {
    this.retrieveLikedUsers();
  },
};
</script>

<style scoped>
.outer {
  padding: 2rem;
}
.liked-card {
  /* display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; */
  background: rgb(226, 222, 113);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(24, 20, 20, 0.959) !important;
  border: solid 1px rgba(14, 14, 16, 0.699);
  max-width: 500px;
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
  color: white;
}
.liked {
  color: rgb(19, 22, 19);
  font-size: 2.8rem;
  margin: 4px 4px;
  text-align: left;
  text-decoration: underline;
  
}
.no-profilepic {
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background: rgb(246, 246, 246); */
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
