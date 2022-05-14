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
                  <router-link
                    style="text-decoration: none; color: inherit"
                    :to="'/profile/' + post.author.username"
                    ><v-list-item-title
                      ><h3><span class="username-text">@{{ post.author.username }}</span></h3> <v-list-item-subtitle class="minutes-ago">{{createdAtLog(post.createdAt)}}</v-list-item-subtitle></v-list-item-title
                    ></router-link
                  >
     
                  <p>{{ post.post }}</p>
                </v-list-item-content>
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
    }
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
.minutes-ago {
  font-size: 0.8rem;
  color: #3b423e !important;
}
.username-text {
background: #7821CF;
background: repeating-radial-gradient(ellipse farthest-corner at top right, #7821CF 5%, #00011C 90%);
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
