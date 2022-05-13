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
    <div v-else>LOADING</div>
  </div>
</template>

<script>
export default {
  name: "Reddit",
  data: () => ({
    show: false,
    loading: false,
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
  },
  created() {
    this.loading = true;
    this.getProgrammingNews();
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