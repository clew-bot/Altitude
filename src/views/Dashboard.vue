<template>
  <div class="pa-4">
    <h1>Latest News and Headlines</h1>

    <div v-if="!loading">
      <v-container fluid>
        <v-row dense>
          <v-col v-for="card in cards.slice(1)" :key="card.id">
            <v-card class="mx-auto" max-width="344">
              <v-img :src="card.src" height="200px"></v-img>

              <v-card-title id="cardTitle">
                {{ card.title }}
              </v-card-title>

              <v-card-subtitle>
                {{ card.author }}
              </v-card-subtitle>

              <v-card-actions>
                <v-btn color="orange lighten-2" text> Explore </v-btn>

                <v-spacer></v-spacer>

                <v-btn icon @click="show = !show">
                  <v-icon>{{
                    show ? "mdi-chevron-up" : "mdi-chevron-down"
                  }}</v-icon>
                </v-btn>
              </v-card-actions>

              <v-expand-transition>
                <div v-show="show">
                  <v-divider></v-divider>

                  <v-card-text>
                    I'm a thing. But, like most politicians, he promised more
                    than he could deliver. You won't have time for sleeping,
                    soldier, not with all the bed making you'll be doing. Then
                    we'll go with that data file! Hey, you add a one and two
                    zeros to that or we walk! You're going to do his laundry?
                    I've got to find a way to escape.
                  </v-card-text>
                </div>
              </v-expand-transition>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <div v-else>
         <v-card
    max-width="450"
    class="mx-auto"
  >
    <v-list three-line>
      <template >
<div v-for="post in allPosts.slice().reverse()" :key="post._id">
          <v-list-item>
            <div v-if="post.author.profilePic">
          <v-list-item-avatar>
            <v-img :src="'/api/images/'+post.author.profilePic"></v-img>
          </v-list-item-avatar>
          </div>
          <div v-else>
                      <v-list-item-avatar>
            No Profile Pic
          </v-list-item-avatar>
          </div>
        

          <v-list-item-content>
            <router-link :to="'/profile/'+ post.author.username"><v-list-item-title><h3>@{{post.author.username}}</h3></v-list-item-title></router-link>

            <v-list-item-subtitle>{{post.post}}</v-list-item-subtitle>
          </v-list-item-content>
            </v-list-item>
                <v-divider


        ></v-divider>
     </div>
      </template>
    </v-list>
  </v-card>
<v-btn @click="getPosts">CLick</v-btn>

    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "Dashboard",
  data: () => ({
    items: [
        { header: 'Today' },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Brunch this weekend?',
          subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Oui oui',
          subtitle: '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Birthday gift',
          subtitle: '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Recipe to try',
          subtitle: '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        },
      ],
    show: false,
    loading: true,
    cards: [
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
    ],
  }),
  methods: {
    async getProgrammingNews() {
      const res = await fetch("api/n/programming");
      const data = await res.json();
      for (let i = 0; i < data.length; i++) {
        this.cards[i].title = data[i].data.title;
        this.cards[i].src = data[i].data.url_overridden_by_dest;
        this.cards[i].to = data[i].data.url;
        this.cards[i].author = data[i].data.author;
      }

      this.loading = false;
    },
    async getPosts() {
      this.$store.dispatch("posts/GET_POSTS");
    }
  },
  created() {
    this.loading = true;
    // this.getProgrammingNews();
  },
     computed: {
        ...mapState({
        }),
      ...mapGetters("posts", [
      "allPosts",
    ]),
    },
};
</script>

<style scoped>
#cardTitle {
  font-size: 12px !important;
  font-weight: bold;
  line-height: 10px !important;
}
</style>
