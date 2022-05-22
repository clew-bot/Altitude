<template>
  <div class="pa-4">
    <h1 class="header">Reddit</h1>

    <div class="text-container">
       <input type="password" style="display:none"/>
      <input
        v-model="search"
        class="search-bar"
        type="text"
        placeholder="Enter a subreddit"
      />
      <div class="outer-bg">
        <v-btn
          class="say-something"
          @click="fetchNewSubreddit"
          :class="{ isCLicked: clicked }"
          ><i>GO!</i></v-btn
        >
      </div>
    </div>
    <div class="otherVideos">
      <div v-for="vids in otherVideos" :key="vids.id">
        <iframe
          :src="`${url}${vids}`"
          frameborder="0"
          scrolling="no"
          allowfullscreen
          width="476"
          height="437"
        ></iframe>
      </div>
    </div>
    <div v-if="!loading">
      <v-container fluid>
        <v-row dense>
          <video
            v-for="video in videos"
            :key="video.id"
            width="320"
            height="540"
            controls
          >
            <source :src="video" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <v-col v-for="card in cards" :key="card.id" class="card-outer">
            <v-card class="mx-auto" max-width="344" min-height="100">
              <v-img :src="card.data.url_overridden_by_dest"></v-img>

              <v-card-title id="cardTitle">
                {{ card.data.title }}
              </v-card-title>

              <v-card-subtitle>
                {{ card.data.author }}
                <br />
                {{ card.data.subreddit_name_prefixed }}
              </v-card-subtitle>
              <v-expand-transition>
                <div v-show="show">
                  <v-divider></v-divider>
                </div>
              </v-expand-transition>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div v-else>LOADING</div>
    <div>{{ errorMessage }}</div>
  </div>
</template>

<script>
export default {
  name: "Reddit",
  data: () => ({
    search: "",
    show: false,
    errorMessage: "",
    loading: false,
    clicked: false,
    videos: [],
    otherVideos: [],
    url: process.env.VUE_APP_REDDIT_URL,
    cards: [],
  }),
  methods: {
    async getProgrammingNews() {
      try {
        const res = await fetch("api/n/programming");
        const data = await res.json();
        this.cards = data;
        this.formatImageNames(data);
        this.loading = false;
      } catch (error) {
        this.loading = true;
        this.errorMessage = "Try again later";
        console.log(error);
      }
    },
    formatImageNames(image) {
      this.videos = [];
      this.otherVideos = [];
      let word = "gifv";
      let word2 = process.env.VUE_APP_REDDIT_FORMAT;
      for (let i = 0; i < image.length; i++) {
        setTimeout(() => {
          if (image[i].data.url_overridden_by_dest?.includes(word)) {
            image[i].data.url_overridden_by_dest = image[
              i
            ].data.url_overridden_by_dest.replace("gifv", "mp4");
            this.videos.push(image[i].data.url_overridden_by_dest);
          }
          if (image[i].data.url_overridden_by_dest?.includes(word2)) {
            this.otherVideos.push(
              image[i].data.url_overridden_by_dest.split("/").pop()
            );
          }
        }, 2000);
      }
      setTimeout(() => {
             console.clear();
      }, 10000);

      // console.log("videos", this.otherVideos)
    },

    async fetchNewSubreddit() {
      this.clicked = true;
      this.loading = true;
      const res = await fetch("/api/n/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          search: this.search,
        }),
      });
      const data = await res.json();
      // console.log("DATA", data);
      this.formatImageNames(data);

      this.loading = false;
      this.cards = data;
      this.clicked = false;
    },
  },
  computed: {},
  created() {
    this.loading = true;
    this.getProgrammingNews();
  },
};
</script>

<style scoped>
.otherVideos {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  flex-wrap: wrap !important;
}

.card-outer {
  flex-grow: 0 !important;
  align-content: flex-start !important;
}

.search-bar {
  background: rgba(222, 92, 31, 0.98) !important;
  padding: 7px;
  border-radius: 5px;
  margin-top: 10px;
  margin-right: 5px;
  color: black !important;
}

::placeholder {
  color: black !important;
  font-weight: lighter;
  text-align: center;
}

.v-text-field > .v-input__control > .v-input__slot > .v-text-field__slot {
  background: #fff !important;
}

.v-text-field--outlined > .v-input__control > .v-input__slot {
  background: white !important;
}

.text-container {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
}

#cardTitle {
  font-size: 12px !important;
  font-weight: bold;
  line-height: 10px !important;
}

.header {
  font-size: 4rem;
  font-weight: bold;
  line-height: 20px;
  color: #fe4600;
  text-shadow: 0px 0px 10px #740bac;
  margin: 2rem 2rem;
  text-align: center;
}

.say-something {
  border-radius: 10px;
  font-size: 16px;
  margin-top: 5px;
  transform: translateY(-1.225rem);
  text-transform: none;
  letter-spacing: 0px;
  padding: 10px !important;
  color: rgb(25, 26, 25);
  font-weight: bold;
  background: linear-gradient(
    90deg,
    rgb(224, 160, 11) 0%,
    rgb(224, 175, 29) 14.06%,
    rgb(223, 162, 30) 83.85%,
    rgb(211, 132, 35) 100%
  );
}
.outer-bg {
  background: rgb(231, 130, 42);
  display: flex;
  justify-content: center;
  align-items: center;
  display: inline-block !important;
  border-radius: 10px;
  transform: translateY(20px);
  height: 30px;
  margin-bottom: 20px;
}
.say-something:hover {
  transform: translateY(-1.425rem);
}
.isCLicked {
  animation: clickDownAndUp 0.3s ease-in-out;
}
@keyframes clickDownAndUp {
  0% {
  }
  30% {
    transform: translateY(-0.8rem);
  }
  60% {
    /* transform: translateY(0.225px); */
  }
  100% {
  }
}
</style>
