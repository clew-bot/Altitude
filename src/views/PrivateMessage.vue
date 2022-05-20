<template>
  <div>
    <v-card max-width="600" class="mx-auto">
      <v-toolbar color="black" dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>Chatting with {{ username }}</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-toolbar>

      <v-list three-line v-for="message in orderedMessages" :key="message._id">
        <div>
          <v-list-item>
            <v-list-item-avatar v-if="message.from.profilePic">
              <v-img
                @click="goToProfile(message.from.username)"
                :src="'/api/images/' + message.from.profilePic"
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-avatar v-else>
             <NNKoala/>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>@{{
                messagesToOrFrom(message)
              }}</v-list-item-title>
              <v-list-item-subtitle
                v-html="message.message"
              ></v-list-item-subtitle>
            </v-list-item-content>
            <p class="createdAt">{{ createdAtLog(message.createdAt) }}</p>
          </v-list-item>
        </div>
      </v-list>
    </v-card>
        <v-pagination
      color="#3e99ad"
      circle
      v-model="page"
      :length="Math.ceil(messages.length / perPage)"
    ></v-pagination>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { createdAtLog } from "../public/utils";
import NNKoala from "../assets/svgs/NNKoala.svg"
export default {
  name: "PrivateMessage",
  components: {
    NNKoala
  },
  data() {
    return {
      username: "",
      page: 1,
      perPage: 10,
      pages: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    };
  },
  methods: {
    fetchMessagesWithUser() {
      const query = this.$router.currentRoute.params.id;
      this.username = query;
      this.$store.dispatch("messages/GET_PRIVATE_MESSAGE", query);
    },
    messagesToOrFrom(message) {
      // console.log(message);
      if (!message.from.username) {
        return message.to.username;
      } else {
        return message.from.username;
      }
    },
    goToProfile(username) {
      this.$router.push(`/profile/${username}`);
    },
    createdAtLog(times) {
      return createdAtLog(times)
    },
  },

  computed: {
    ...mapGetters("messages", ["messages"]),
    orderedMessages() {
      let copy = [...this.messages];
      copy.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      return copy.slice(
        (this.page - 1) * this.perPage,
        this.page * this.perPage
      );
    },
  },
  created() {
    this.fetchMessagesWithUser();
  },
};
</script>

<style scoped>

.v-card {
    margin-top: 20px;
}
.createdAt {
  font-size: 0.7rem !important;
  color: rgb(41, 109, 58);
}
</style>
