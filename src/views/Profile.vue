<template>
  <div class="text-center">
    <div v-if="isThereImages">
    <img v-for="image in photos" :key="image" :src="'/api/images/' + image" alt="">
    </div>
    <div>Profile</div>
    <h1 @click="fetchProfileData">Name: @{{ username }}</h1>
    <h2>{{ headline }}</h2>
    <h4>Bio {{ bio }}</h4>
    <p>Favorite Books: {{ favoriteBooks }}</p>
    <p>Favorite Hobbies: {{ favoriteHobbies }}</p>
    <p>Favorite Music: {{ favoriteMusic }}</p>
    <p>Favorite Food: {{ favoriteFood }}</p>

    <!-- <iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/7diiW6RSbOz0o1P7BWGmut?utm_source=generator" width="100%" height="380" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe> -->
  </div>
</template>

<script>
//check for param in url
// if param exists, set to that param

//if param exists send request to server to get data for that param
// if param doesn't exist, set to default
export default {
  data() {
    return {
      show: false,
      loading: false,
      bio: "",
      username: "",
      favoriteBooks: "",
      favoriteMovies: "",
      favoriteHobbies: "",
      favoriteMusic: "",
      favoriteFood: "",
      headline: "",
      photos: [],
      isThereImages: false,
    };
  },
  name: "Profile",
  methods: {
    consoleme() {
      console.log(this.$router.currentRoute.params.id);
    },
    async fetchProfileData() {
      const query = this.$router.currentRoute.params.id;
      this.loading = true;
      const response = await fetch(`/api/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      try {
        const {
          bio,
          favoriteBooks,
          favoriteFood,
          favoriteHobbies,
          favoriteMusic,
          favoriteMovies,
          headline,
          username,
          photos
        } = await response.json();
        if (photos.length > 0) {
          this.isThereImages = true;
        }
        console.log(photos);
        this.bio = bio;
        this.username = username;
        this.favoriteBooks = favoriteBooks;
        this.favoriteMovies = favoriteMovies;
        this.favoriteHobbies = favoriteHobbies;
        this.favoriteMusic = favoriteMusic;
        this.headline = headline;
        this.favoriteFood = favoriteFood;
        this.loading = false;
        this.photos = photos
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.fetchProfileData();
  },
};
</script>

<style scoped>
img {
  max-height: 100px;
}
</style>
