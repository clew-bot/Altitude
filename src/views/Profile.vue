<template>
  <div class="main-container">
    <div class="sub-container">
    <div class="rows1" :class="{show : show, closed : !show }">
      <div>
          <div>Member Since: </div>
          <div>Last Seen: </div>
      </div>
        <br/>

      <div>
 
        <div v-if="isThereImages">
          <div>
            <img
              v-for="image in photos"
              :key="image"
              :src="'/api/images/' + image"
              alt=""
            />
          </div>
          </div>
   
        
        <h1 @click="fetchProfileData">@{{ username }}</h1>
        <h2>{{ headline }}</h2>
               <h4>{{ bio }}</h4>
             </div>
                 <!-- <v-icon class="down-icon" @click="dropDown">mdi-chevron-down</v-icon> -->
    </div>
</div>
    <v-col>
      <h4>Bio: {{ bio }}</h4>
      <p>Favorite Books: {{ favoriteBooks }}</p>
      <p>Favorite Hobbies: {{ favoriteHobbies }}</p>
      <p>Favorite Music: {{ favoriteMusic }}</p>
      <p>Favorite Food: {{ favoriteFood }}</p></v-col
    >

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
    dropDown() {
      this.show = !this.show;
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
          photos,
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
        this.photos = photos;
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
.closed {
  height: 30rem;
    transition: all 0.5s;
}
.show {
  height: 1000px;
  transition: all 0.5s;
}
/* .down-icon {
  position: relative;
  bottom: -90px;
  right: -70px;
} */

.down-icon:hover {
  cursor: pointer;
  box-shadow: 0px 0px 10px #000000;
  border-radius: 50%;
}

.down-icon:active {
  box-shadow: none;
}

.sub-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.main-container {
  height: 100vh;
}
.rows1 {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='1060' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1312%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='url(%23SvgjsLinearGradient1313)'%3e%3c/rect%3e%3cpath d='M0 0L60.07 0L0 61.05z' fill='rgba(255%2c 255%2c 255%2c .1)'%3e%3c/path%3e%3cpath d='M0 61.05L60.07 0L195.35 0L0 190.51999999999998z' fill='rgba(255%2c 255%2c 255%2c .075)'%3e%3c/path%3e%3cpath d='M0 190.51999999999998L195.35 0L307.28999999999996 0L0 213.14999999999998z' fill='rgba(255%2c 255%2c 255%2c .05)'%3e%3c/path%3e%3cpath d='M0 213.14999999999998L307.28999999999996 0L894.91 0L0 287.79999999999995z' fill='rgba(255%2c 255%2c 255%2c .025)'%3e%3c/path%3e%3cpath d='M1440 560L824.25 560L1440 361.72z' fill='rgba(0%2c 0%2c 0%2c .1)'%3e%3c/path%3e%3cpath d='M1440 361.72L824.25 560L504.52 560L1440 235.87000000000003z' fill='rgba(0%2c 0%2c 0%2c .075)'%3e%3c/path%3e%3cpath d='M1440 235.87L504.52 560L381.15999999999997 560L1440 185.54000000000002z' fill='rgba(0%2c 0%2c 0%2c .05)'%3e%3c/path%3e%3cpath d='M1440 185.54000000000002L381.1600000000001 560L304.36000000000007 560L1440 178.44000000000003z' fill='rgba(0%2c 0%2c 0%2c .025)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1312'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3clinearGradient x1='15.28%25' y1='-39.29%25' x2='84.72%25' y2='139.29%25' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1313'%3e%3cstop stop-color='%230e2a47' offset='0'%3e%3c/stop%3e%3cstop stop-color='rgba(175%2c 211%2c 181%2c 1)' offset='1'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e");
  background-repeat: repeat-y;
  margin-top: 10%;
  display: flex;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  justify-content: space-around !important;
  width: 1000px;
  text-align: right;
  align-items: center;
}
img {
  max-height: 150px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px #1b1919;
}
</style>
