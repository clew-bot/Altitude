<template>
  <div class="entire-container">
    <div class="main-container" v-if="!noUsername">
      <div class="sub-container">
        <div
          v-if="!loading"
          class="rows1"
          :class="{ show: show, closed: !show }"
        >
          <div class="lastSeen">
            <div class="member-container">
              <div>
                <h3>Member Since: {{ this.createdAt }}</h3>
              </div>
              <div>Last Seen: {{ this.lastLogin }}</div>
            </div>
            <v-col>
              <br />
              <div class="bio">
                <b
                  ><i>{{ bio }}</i></b
                >
              </div>
              <br />
              <br />
              <p>Favorite Book: {{ favoriteBooks }}</p>
              <p>Favorite Hobbies: {{ favoriteHobbies }}</p>
              <p>Favorite Music: {{ favoriteMusic }}</p>
              <p>Favorite Food: {{ favoriteFood }}</p></v-col
            >
          </div>
          <br />

          <div class="image-container" v-if="!loadingImage">
            <div v-if="isThereImages">
              <div>
                <img :src="'/api/images/' + profilePic" alt="" class="image" />
              </div>
            </div>
            <div v-else>
              <img
                src="../assets/nopic.png"
                alt="No Image Found"
                class="questionMark"
              />
            </div>

            <h1 class="username theHeadline" @click="fetchProfileData">
              <span class="">@</span>{{ username }}
            </h1>
            <h2 class="theHeadline">{{ headline }}</h2>
          </div>
          <div v-else>
            <v-progress-circular
              :size="70"
              :width="7"
              color="purple"
              indeterminate
            ></v-progress-circular>
          </div>
        </div>
        <div class="sub-container" v-else>
          <div class="rows1" :class="{ show: show, closed: !show }">
            <v-progress-circular
              :size="70"
              :width="7"
              color="purple"
              indeterminate
            ></v-progress-circular>
          </div>
        </div>
      </div>
      <MoreProfiles :profiles="moreProfiles"/>
    </div>

    <div v-else class="sub-container">
      <div class="rows1" :class="{ show: show, closed: !show }">
        <h1>no username found 🤔</h1>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import MoreProfiles from "@/components/MoreProfiles.vue";

export default {
  data() {
    return {
      show: false,
      loading: true,
      loadingImage: true,
      bio: "",
      username: "",
      favoriteBooks: "",
      favoriteMovies: "",
      favoriteHobbies: "",
      favoriteMusic: "",
      favoriteFood: "",
      headline: "",
      profilePic: "",
      lastLogin: "",
      createdAt: "",
      photos: [],
      isThereImages: false,
      noUsername: false,
      moreProfiles: [],
    };
  },
  components: {
    MoreProfiles,
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

      try {
        const response = await fetch(`/api/profile`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        });

        if (!response) {
          console.log("no username");
          return (this.noUsername = true);
        }
        const {
          findUser: {
            username,
            createdAt,
            lastLogin,
            favoriteBooks,
            favoriteMovies,
            favoriteMusic,
            headline,
            bio,
            profilePic,
            favoriteFood,
            favoriteHobbies,
            photos,
          },
          randomUsers,
        } = await response.json();
        console.log(randomUsers);
        this.lastLogin = moment(lastLogin).fromNow();
        this.createdAt = moment().format("MMM Do YYYY", createdAt);
        if (profilePic) {
          this.isThereImages = true;
        }
        this.moreProfiles = randomUsers;
        this.bio = bio;
        this.username = username;
        this.favoriteBooks = favoriteBooks;
        this.favoriteMovies = favoriteMovies;
        this.favoriteHobbies = favoriteHobbies;
        this.favoriteMusic = favoriteMusic;
        this.headline = headline;
        this.favoriteFood = favoriteFood;
        this.photos = photos;
        this.profilePic = profilePic;
        this.loading = false;
        this.loadingImage = false;
      } catch (error) {
        this.noUsername = true;
        throw "No Username Found";
      }
    },
  },
  created() {
    this.fetchProfileData();
  },
};
</script>

<style scoped>
@font-face {
  font-family: "Iceland";
  font-style: normal;
  font-weight: 100;
  src: local("Iceland"), local("Iceland-Regular"),
    url(http://themes.googleusercontent.com/static/fonts/iceland/v3/F6LYTZLHrG9BNYXRjU7RSw.woff)
      format("woff");
}

.theHeadline {
  /* font-family: "Iceland"; */
  color: #252524;
  font-size: 2.2rem;
}
/* .theHeadline:hover {
    -webkit-animation: neon3 1.5s ease-in-out infinite alternate;
    animation: neon3 1.5s ease-in-out infinite alternate; 
} */
@-webkit-keyframes neon3 {
  from {
    text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #ffdd1b,
      0 0 70px #ffdd1b, 0 0 80px #ffdd1b, 0 0 100px #ffdd1b, 0 0 150px #ffdd1b;
  }
  to {
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #ffdd1b,
      0 0 35px #ffdd1b, 0 0 40px #ffdd1b, 0 0 50px #ffdd1b, 0 0 75px #ffdd1b;
  }
}
.entire-container {
  padding: 4rem;
    /* background-color: #f0ecf6;
    background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2309699c' fill-opacity='0.4'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E"); */
    background-repeat: repeat !important;
    border:  1px black;
}
.image {
  animation: fadeIn 5s;
}

@media screen and (max-width: 600px) {
  .entire-container {
    margin-top: -2rem;
    padding: 12px;
  
  }
  .username {
    padding-right: 3rem;
    color: rgb(250, 250, 250);
  }
  .sub-container {
    padding: 10px;
  }
  .image-container {
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  }
  .rows1 {
    display: block !important;
  }
}
.bio {
  overflow-wrap: break-word;
  width: 254px;
}

.member-container {
  display: flex;

  padding: 10px;
  border-radius: 10px;

  flex-direction: column;
}
.lastSeen {
  text-align: left;
  color: rgb(254, 245, 245);
}
.questionMark {
  border-radius: 50%;
}

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
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask5291%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='url(%23SvgjsLinearGradient5292)'%3e%3c/rect%3e%3cpath d='M0 0L60.07 0L0 61.05z' fill='rgba(255%2c 255%2c 255%2c .1)'%3e%3c/path%3e%3cpath d='M0 61.05L60.07 0L195.35 0L0 190.51999999999998z' fill='rgba(255%2c 255%2c 255%2c .075)'%3e%3c/path%3e%3cpath d='M0 190.51999999999998L195.35 0L307.28999999999996 0L0 213.14999999999998z' fill='rgba(255%2c 255%2c 255%2c .05)'%3e%3c/path%3e%3cpath d='M0 213.14999999999998L307.28999999999996 0L894.91 0L0 287.79999999999995z' fill='rgba(255%2c 255%2c 255%2c .025)'%3e%3c/path%3e%3cpath d='M1440 560L824.25 560L1440 361.72z' fill='rgba(0%2c 0%2c 0%2c .1)'%3e%3c/path%3e%3cpath d='M1440 361.72L824.25 560L504.52 560L1440 235.87000000000003z' fill='rgba(0%2c 0%2c 0%2c .075)'%3e%3c/path%3e%3cpath d='M1440 235.87L504.52 560L381.15999999999997 560L1440 185.54000000000002z' fill='rgba(0%2c 0%2c 0%2c .05)'%3e%3c/path%3e%3cpath d='M1440 185.54000000000002L381.1600000000001 560L304.36000000000007 560L1440 178.44000000000003z' fill='rgba(0%2c 0%2c 0%2c .025)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask5291'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3clinearGradient x1='15.28%25' y1='-39.29%25' x2='84.72%25' y2='139.29%25' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient5292'%3e%3cstop stop-color='rgba(34%2c 145%2c 200%2c 0.99)' offset='0.06'%3e%3c/stop%3e%3cstop stop-color='rgba(110%2c 101%2c 216%2c 1)' offset='1'%3e%3c/stop%3e%3cstop stop-color='rgba(110%2c 101%2c 216%2c 1)' offset='1'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e");
  background-repeat: repeat-y;
  margin-top: 5%;
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

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
