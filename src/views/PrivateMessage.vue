<template>
  <div>
    <v-card max-width="450" class="mx-auto">
      <v-toolbar color="cyan" dark>
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
            <v-list-item-avatar>
              <v-img
                @click="goToProfile(message.from.username)"
                :src="'/api/images/' + message.from.profilePic"
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
export default {
  name: "PrivateMessage",
  data() {
    return {
      username: "",
    };
  },
  methods: {
    fetchMessagesWithUser() {
      const query = this.$router.currentRoute.params.id;
      this.username = query;
      this.$store.dispatch("messages/GET_PRIVATE_MESSAGE", query);
    },
    messagesToOrFrom(message) {
      console.log(message);
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
      return moment(times).fromNow();
    },
  
  },

  computed: {
    ...mapGetters("messages", ["messages"]),
      orderedMessages() {
          let copy = [...this.messages]
                copy.sort((a, b) => {
                 return new Date(b.createdAt) - new Date(a.createdAt);

            })
           return copy;
        }
  },
  created() {
   
    this.fetchMessagesWithUser();
    this.orderedMessages();
  },
};
</script>

<style scoped>

.createdAt {
    font-size: .7rem !important;
    color: rgb(41, 109, 58);
}

</style>
