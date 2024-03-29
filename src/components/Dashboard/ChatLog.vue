<template>
  <div>
    <v-card class="mx-auto main-card">
      <v-list three-line>
        <template>
          <div v-for="(post, index) in visiblePages" :key="post._id" class="chat-log-item">
            <v-list-item :class="index === selected ? 'openCard' : 'closeCard'">
              <div v-if="post.author.profilePic">
                <v-list-item-avatar rounded>
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
                      @<i>{{ post.author.username }}</i></span
                    ><span>
                      <v-icon class="like-icon" @click="likePost"
                        >mdi-star-shooting</v-icon
                      >
                    </span
                    >
                  </h3>
                  <v-list-item-subtitle class="minutes-ago">{{
                    createdAtLog(post.createdAt)
                  }}</v-list-item-subtitle>
                  
                </v-list-item-title>

                <p class="actual-post" v-html="post.post"></p>
              </v-list-item-content>
              <div class="replies">{{ getRepliesEvaluation(post.replies) }}</div>
              
              <v-icon @click="toggleComments(index)" class="down-icon"
                >mdi-chevron-down</v-icon
              >
                    <v-icon class="report-icon" @click="reportUser"
                        >mdi-alert-octagon</v-icon
                      >
            </v-list-item>
            
            <v-divider></v-divider>
            <MoreComments
              :post="post"
              v-if="selected === index"
              :key="rerenderComments"
            />
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
import { createdAtLog } from "../../public/utils.js";
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
  }),
  components: {
    NNKoala,
    MoreComments,
  },
  methods: {
    tester() {
      this.testt++;
    },
    getRepliesEvaluation(replies) {
      if (replies === 0) {
        return `No Replies 😪`;
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
      return createdAtLog(times);
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

.actual-post {
  color: rgb(3, 3, 3);
     /* -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    display: -webkit-box; */
    font-size: .9rem !important;
    font-weight: bold;
    max-width: 97%;
}

.v-list {
  padding-top: 0px;
  padding-bottom: 0px;
}

.chat-log-item:nth-child(even) {
  background: rgb(176, 170, 179);
}

.chat-log-item:nth-child(odd) {
  background: rgb(163, 159, 165);
}

.theme--light, .v-card {
  background: none !important;
  box-shadow: none !important;
}


@media screen and (max-width: 400px) {

  .username-text {
    font-size: 1rem;
}
 .replies {
   display: none;
}

}

.replies {
  font-size: 0.8rem;
}

.main-card {
  position: relative;
  max-width: 1000px;
  margin-top: 4%
}

.like-icon {
  color: #530e4f !important;
  padding-left: 12px;
  height: 100%;
}

.down-icon {
  color: #704b98 !important;
  padding-left: 12px;
}

.report-icon {
  color: rgba(163, 20, 20, 0.406) !important;
  position: absolute;
  right: 7px;
  top: 2px;
  padding-left: 8px;
}
.minutes-ago {
  font-size: 0.8rem;
  color: #3b423e !important;
}
.username-text {
  background: #17e88a;
  padding: 2px;
  border-radius: 5px;
  cursor: pointer;
  color: rgb(33, 30, 31);
  flex-grow: 1 !important;
}

.theme--light.v-list {
  transition: all 0.3s ease-in-out;
  min-height: 1000px;
}

#cardTitle {
  font-size: 12px !important;
  font-weight: bold;
  line-height: 10px !important;
}
</style>
