<template>
  <div>
    <v-card class="mx-auto main-card">
      <v-list three-line>
        <template>
          <div v-for="(post, index) in visiblePages" :key="post._id">
            <v-list-item :class="index === selected ? 'openCard' : 'closeCard'">
              <div v-if="post.author.profilePic">
                <v-list-item-avatar>
                  <v-img
                    @click="goToProfile(post.author.username)"
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
                    <span
                      class="username-text"
                      @click="goToProfile(post.author.username)"
                    >
                      @{{ post.author.username }}</span
                    ><span>
                      <v-icon class="like-icon" @click="likePost"
                        >mdi-star-shooting</v-icon
                      >
                      <v-icon class="report-icon" @click="reportUser"
                        >mdi-alert-octagon</v-icon
                      ></span
                    >
                  </h3>
                  <v-list-item-subtitle class="minutes-ago">{{
                    createdAtLog(post.createdAt)
                  }}</v-list-item-subtitle>
                </v-list-item-title>

                <p v-html="post.post"></p>
              </v-list-item-content>
              <div>{{ getRepliesEvaluation(post.replies) }}</div>
              <v-icon @click="toggleComments(index)" class="down-icon"
                >mdi-chevron-down</v-icon
              >
            </v-list-item>
            <v-divider></v-divider>
            <!-- <v-slide-x-transition mode="in-out"> -->
            <MoreComments
              :post="post"
              v-if="selected === index"
              :key="rerenderComments"
            />

            <!-- </v-slide-x-transition>  -->
          </div>
        </template>
      </v-list>
    </v-card>
    <v-pagination
      color="#3e69ad"
      circle
      v-model="page"
      :length="Math.ceil(allPosts.length / perPage)"
    ></v-pagination>
  </div>
</template>

<script>
import NNKoala from "../../assets/svgs/NNKoala.svg";
import MoreComments from "@/components/Dashboard/MoreComments.vue";
import moment from "moment";
import { mapGetters } from "vuex";
export default {
  name: "ChatLog",

  data: () => ({
    loadComponent: false,
    show: false,
    loading: true,
    page: 1,
    perPage: 10,
    pages: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    selected: null,
    open: true,
    post: {},
    testt: 0,
  }),
  components: {
    NNKoala,
    MoreComments,
  },
  methods: {
    tester() {
      this.testt++;
      console.log(this.testt);
    },
    getRepliesEvaluation(replies) {
        if(replies === 0) {
            return `No Replies 😪`
        }
      if (replies === 1) {
        return `${replies} reply 💭`;
      }
      if (replies < 5) return `${replies} replies 💭`;
      if (replies >= 5 && replies < 10) {
        return `${replies} replies 👍`;
      }
      if (replies >= 10 && replies < 20) {
        return `${replies} replies 😃`;
      }
      if (replies >= 20) {
        return `${replies} replies 🔥`;
      }
    },
    async getPosts() {
      this.$store.dispatch("posts/GET_POSTS");
    },
    toggleComments(index) {
      document.activeElement.blur();
      if (this.selected === null) {
        this.selected = index;
        this.open = true;
        return;
      }

      if (this.selected === index) {
        this.selected = null;
        this.open = false;
      } else {
        this.selected = index;
        this.open = true;
      }
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
    ...mapGetters("posts", ["allPosts", "createdAtTimes", "rerenderComments"]),
    visiblePages() {
      return this.allPosts.slice(
        (this.page - 1) * this.perPage,
        this.page * this.perPage
      );
    },
  },
  watch: {
    allPosts: function () {},
  },
};
</script>

<style scoped>
/* .openCard {
    height: 100%;
    transition: all 0.5s ease;
}

.closeCard {
    height: 90%;
    transition: all 0.5s ease-in-out;
} */
.main-card {
  position: relative;
}

.like-icon {
  color: #a29309 !important;
  padding-left: 12px;
  height: 100%;
}

.down-icon {
  color: #704b98 !important;
  padding-left: 12px;
}

.report-icon {
  color: red !important;
  padding-left: 8px;
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
  background: rgb(237, 237, 232) !important;
  transition: all 0.3s ease-in-out;
  min-height: 1000px;
}
.v-list--three-line .v-list-item .v-list-item__subtitle,
.v-list-item--three-line .v-list-item__subtitle {
  /* -webkit-box-orient: horizontal !important; */
  /* padding-right: 100px; */
}

#cardTitle {
  font-size: 12px !important;
  font-weight: bold;
  line-height: 10px !important;
}
</style>
