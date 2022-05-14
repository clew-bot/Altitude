<template>
  <div>
       <v-card
    max-width="450"
    class="mx-auto"
  >
    <v-toolbar
      color="cyan"
      dark
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Chatting with {{username}}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-toolbar>

    <v-list three-line v-for="message in messages" :key="message._id">
      <div>
        <v-list-item

        >
          <v-list-item-avatar>
            <!-- <v-img :src="></v-img> -->
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="message.message"></v-list-item-title>
            <v-list-item-subtitle>{{messagesToOrFrom(message)}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-list>
  </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    name: "PrivateMessage",
    data() {
        return {
            username: "",
        }
    },
    methods: {
        fetchMessagesWithUser() {
        const query = this.$router.currentRoute.params.id
        this.username = query;
        this.$store.dispatch("messages/GET_PRIVATE_MESSAGE", query);
        },
        messagesToOrFrom(message) {
            console.log(message)
        if (!message.from.username) {
            return message.to.username 
        } else {
            return message.from.username
        }
    },
        
    },


    computed: {
        ...mapGetters("messages", [
            "messages"

        ]),
    },
    created() {
        this.fetchMessagesWithUser();
    },

}
</script>

<style>

</style>