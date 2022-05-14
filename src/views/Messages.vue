<template>
<div class="pa-6">
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
      <v-list-item-group active-class="none" >
   
        <div v-for="(username, index) in usernames" :key="username.id" class="lister">

          <v-list-item class="lister-sub">

              <v-list-item-content>
                <router-link :to='"/pm/" + username'>
                <v-list-item-title v-text="username"></v-list-item-title>
                </router-link>

                <!-- <v-list-item-subtitle
                  class="text--primary"
                  v-text="item.headline"
                ></v-list-item-subtitle> -->

                <v-list-item-subtitle
                ></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-list-item-action-text
                ></v-list-item-action-text>

              </v-list-item-action>

                 <v-icon class="report-icon" @click="openMessage(index)"
                  >mdi-chevron-down</v-icon
                >
              
          </v-list-item>
                <!-- <MessageCard :person="username" v-show="selected == index" /> -->
       
        </div>
     
      </v-list-item-group>
    </v-list>
  </v-card>

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
// import MessageCard from "@/components/Messages/MessageCard.vue";
export default {
  name: "Messages",
  components: {
    // MessageCard,
  
  },
  data: () => ({
    selected: [],
  }),
  methods: {
    fetchMessages() {
      this.$store.dispatch("messages/GET_MESSAGES");
    },
    createdAtLog(times) {
      return moment(times).fromNow();
    },
    openMessage(index) {
      this.selected = index;

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

.v-icon:active {
  background: #E5E5E5;
}
.v-list,.theme--light{
    background: rgb(196, 232, 172) !important;
    transition: all .3s ease-in-out;
}
.lister-sub {
  background: rgb(133, 122, 122);
}
.lister {
  z-index: 99 !important;
  background: none !important;
  background : none !important;
}

.main-card {
  width: 100% !important;
}

.fade-enter-active, .fade-leave-active {
  transition: all .5s;
  opacity: 0;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {

  opacity: 0;
  /* transform: skewX(85deg); */
}

</style>
