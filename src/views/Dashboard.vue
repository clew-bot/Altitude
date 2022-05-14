<template>
  <div class="pa-6">
    <div>
      <v-card class="mx-auto main-card">
        <v-list three-line>
          <template>
            <div v-for="post in visiblePages" :key="post._id">
              <v-list-item>
                <div v-if="post.author.profilePic">
                  <v-list-item-avatar>
                    <v-img
                      :src="'/api/images/' + post.author.profilePic"
                    ></v-img>
                  </v-list-item-avatar>
                </div>
                <div v-else>
                  <v-list-item-avatar><NNKoala /></v-list-item-avatar>
                </div>

                <v-list-item-content>
                 
                    <v-list-item-title>
                   
                      <h3>
                        <span class="username-text" @click="goToProfile(post.author.username)">
                          @{{ post.author.username }}</span
                        >
                      </h3>
                      <v-list-item-subtitle class="minutes-ago">{{
                        createdAtLog(post.createdAt)
                      }}</v-list-item-subtitle>
                      </v-list-item-title
                    >

                  <p>{{ post.post }}</p>
                </v-list-item-content>
                <v-icon class="like-icon" @click="likePost"
                  >mdi-thumb-up</v-icon
                >
                <v-icon class="report-icon" @click="reportUser"
                  >mdi-alert-octagon</v-icon
                >
              </v-list-item>
              <v-divider></v-divider>
            </div>
          </template>
        </v-list>
      </v-card>
      <!-- <v-btn @click="getPosts">CLick</v-btn> -->
    </div>
    <v-pagination
      color="#3e69ad"
      circle
      v-model="page"
      :length="Math.ceil(allPosts.length / perPage)"
    ></v-pagination>
  </div>
</template>

<script>
import NNKoala from "../assets/svgs/NNKoala.svg";
import moment from "moment";
import { mapGetters } from "vuex";
export default {
  name: "Dashboard",
  components: {
    NNKoala,
  },
  data: () => ({
    show: false,
    loading: true,
    page: 1,
    perPage: 10,
    pages: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  }),
  methods: {
    async getPosts() {
      this.$store.dispatch("posts/GET_POSTS");
    },
    createdAtLog(times) {
      return moment(times).fromNow();
    },
    reportUser(e) {
      console.log(e);
    },
    likePost() {
      this.$toasted.show("Liked Post!", {
        // icon:{ name: "check"},
        theme: "bubble",
        position: "top-center",
        duration: 1000,
      });
    },
    goToProfile(username) {
      this.$router.push(`/profile/${username}`);
    },
  },
  created() {
    this.getPosts();
  },
  computed: {
    ...mapGetters("posts", ["allPosts", "createdAtTimes"]),
    visiblePages() {
      return this.allPosts.slice(
        (this.page - 1) * this.perPage,
        this.page * this.perPage
      );
    },
  },
};
</script>

<style scoped>
.main-card {
  position: relative;
}

.like-icon {
  position: absolute;
  right: 0px;
  top: 30px;
  color: #139617 !important;
  padding-left: 12px;
}

.report-icon {
  position: absolute;
  right: 0px;
  top: 30px;
  color: #a92727 !important;
  padding-left: 12px;
}
.minutes-ago {
  font-size: 0.8rem;
  color: #3b423e !important;
}
.username-text {
  background: #7821cf;
  cursor: pointer;
  background: repeating-radial-gradient(
    ellipse farthest-corner at top right,
    #7821cf 5%,
    #00011c 90%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.theme--light.v-list {
  background: rgb(186, 186, 185) !important;
}
.v-list--three-line .v-list-item .v-list-item__subtitle,
.v-list-item--three-line .v-list-item__subtitle {
  /* -webkit-box-orient: horizontal !important; */
  padding-right: 100px;
}

#cardTitle {
  font-size: 12px !important;
  font-weight: bold;
  line-height: 10px !important;
}
</style>
