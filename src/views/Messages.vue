<template>
  <div>
    <div class="pa-6 main-container">
      <v-card class="main-card" max-width="500px">
        <v-toolbar color="gray" dark>
          <v-toolbar-title>inbox</v-toolbar-title>

          <v-spacer></v-spacer>
        </v-toolbar>

        <v-list two-line>
          <v-list-item-group active-class="none">
            <div v-if="usernames.length !== 0">
              <div
                v-for="username in usernames"
                :key="username.id"
                class="lister"
              >
                <v-list-item class="lister-sub">
                  <v-list-item-content class="text-center list-names">
                    <router-link
                      style="text-decoration: none; color: inherit"
                      :to="'/pm/' + username"
                    >
                      <v-list-item-title
                        v-text="'@' + username"
                      ></v-list-item-title>
                    </router-link>
                    <v-list-item-subtitle></v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-list-item-action-text></v-list-item-action-text>
                  </v-list-item-action>
                </v-list-item>
              </div>
            </div>
            <div v-else>
              <div class="no-messages">
                <h1>no messages 🤔</h1>
                <p class="no-msgs"><i>(you'll see something if someone messages you)</i></p>
                <v-list-item-subtitle></v-list-item-subtitle>
              </div>
            </div>
          </v-list-item-group>
        </v-list>
      </v-card>
    </div>
    <!-- TO BE IMPLEMENTED -->
    <!-- <v-icon>mdi-magnify</v-icon>
       <v-text-field
            label="Outlined"
            outlined
          ></v-text-field> -->
          <div class="bottom-container">
    <LikedFriends />
    <LikedMe/>
    </div>
  </div>

</template>

<script>
import { mapGetters } from "vuex";
import LikedFriends from "@/components/Messages/LikedFriends.vue";
import LikedMe from "@/components/Messages/LikedMe.vue";
export default {
  name: "Messages",
  components: { LikedFriends, LikedMe },
  data: () => ({
    selected: [],
  }),
  methods: {
    fetchMessages() {
      this.$store.dispatch("messages/GET_MESSAGES");
    },
    openMessage(index) {
      this.selected = index;
    },
  },
  computed: {
    ...mapGetters("messages", ["allMessages", "getCreatedAt", "usernames"]),
  },
  created() {
    this.fetchMessages();
  },
};
</script>

<style scoped>

@media screen and (max-width: 600px) {
  .no-msgs {
    font-size: .9rem;
  }
}

.bottom-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
}
.no-messages {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.main-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.list-names {
  font-size: 4rem !important;
  font-weight: bolder;
}

.v-icon:active {
  background: #e5e5e5;
}
.v-list,
.theme--light {
  background: hsl(57, 76%, 75%) !important;
  transition: all 0.3s ease-in-out;
}
.lister-sub {
  background: rgb(133, 122, 122);
}
.lister {
  z-index: 99 !important;
  background: none !important;
  background: none !important;
}

.main-card {
  width: 100% !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
  opacity: 0;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  /* transform: skewX(85deg); */
}
</style>
