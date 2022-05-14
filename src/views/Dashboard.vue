<template>
  <div class="pa-12">
    <div>
      <v-card class="mx-auto">
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
                  <v-list-item-avatar> No Profile Pic </v-list-item-avatar>
                </div>

                <v-list-item-content>
                  <router-link
                    style="text-decoration: none; color: inherit"
                    :to="'/profile/' + post.author.username"
                    ><v-list-item-title
                      ><h3>@{{ post.author.username }}</h3></v-list-item-title
                    ></router-link
                  >

                  <v-list-item-subtitle>{{ post.post }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
            </div>
         
          </template>
        </v-list>
      </v-card>
      <v-btn @click="getPosts">CLick</v-btn>
    </div>
       <!-- {{visiblePages}} -->
            <v-pagination
              v-model="page"
              :length="Math.ceil(allPosts.length / perPage)"
            ></v-pagination>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Dashboard",
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
  },
  created() {
    this.getPosts();
  },
  computed: {
    ...mapGetters("posts", ["allPosts"]),
    visiblePages() {
      return this.allPosts.slice((this.page - 1)* this.perPage, this.page * this.perPage).reverse();
    },
  },
};
</script>

<style scoped>
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
