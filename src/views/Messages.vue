<template>
  <v-card class="main-card" >
    <v-toolbar color="gray" dark>

      <v-toolbar-title>My Messages From Users</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-checkbox-marked-circle</v-icon>
      </v-btn>
    </v-toolbar>

    <v-list two-line>
      <v-list-item-group v-model="selected" active-class="pink--text" multiple>
        <template >
          <v-list-item v-for="(message) in allMessages" :key="message._id">
              <v-list-item-content>
                <v-list-item-title v-text="message.from.username"></v-list-item-title>

                <!-- <v-list-item-subtitle
                  class="text--primary"
                  v-text="item.headline"
                ></v-list-item-subtitle> -->

                <v-list-item-subtitle
                  v-text="message.message"
                ></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-list-item-action-text
                >{{createdAtLog(message.createdAt)}}</v-list-item-action-text>

                <!-- <v-icon v-if="!active" color="grey lighten-1">
                  mdi-star-outline
                </v-icon> -->

                <!-- <v-icon v-else color="yellow darken-3"> mdi-star </v-icon> -->
              </v-list-item-action>
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
export default {
  name: "Messages",
  data: () => ({
    selected: [],
    items: [
      {
        action: "15 min",
        headline: "Brunch this weekend?",
        subtitle: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        title: "Ali Connors",
      },
      {
        action: "2 hr",
        headline: "Summer BBQ",
        subtitle: `Wish I could come, but I'm out of town this weekend.`,
        title: "me, Scrott, Jennifer",
      },
      {
        action: "6 hr",
        headline: "Oui oui",
        subtitle: "Do you have Paris recommendations? Have you ever been?",
        title: "Sandra Adams",
      },
      {
        action: "12 hr",
        headline: "Birthday gift",
        subtitle:
          "Have any ideas about what we should get Heidi for her birthday?",
        title: "Trevor Hansen",
      },
      {
        action: "18hr",
        headline: "Recipe to try",
        subtitle:
          "We should eat this: Grate, Squash, Corn, and tomatillo Tacos.",
        title: "Britta Holt",
      },
    ],
  }),
  methods: {
    fetchMessages() {
      this.$store.dispatch("messages/GET_MESSAGES");
    },
    createdAtLog(times) {
      return moment(times).fromNow();
    },
    
  },
  computed: {
    ...mapGetters("messages", [
      "allMessages", "getCreatedAt","usernames"

    ]),
  },
  created() {
    this.fetchMessages();
  },
};
</script>

<style scoped>

.main-card {
  width: 100% !important;
}

</style>
