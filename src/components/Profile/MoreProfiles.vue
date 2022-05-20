<template>
  <div class="profile-container" >
    <div v-for="profile, index in otherUsers" :key="profile._id">
    
        <v-col class="profilesCol"  outlined  >
          <v-card class="mx-auto theCard" :style="{'background': colors[index], 'box-shadow': boxShadow[index]}" >
          
            <v-list-item three-line>
              <v-list-item-content >
                <div class=" mb-4 username-text"><b>@{{profile.username}}</b></div>
                <v-list-item-title class="h5 mb-1 headline-text">
               {{profile.headline}}
                </v-list-item-title>
                <v-list-item-subtitle
                  >{{profile.bio}}</v-list-item-subtitle
                >
              </v-list-item-content>
        <div v-if="profile.profilePic">
              <v-list-item-avatar
              
                tile
                size="90"
              ><img class="avatarPic" :src="'/api/images/'+profile.profilePic"  alt=""></v-list-item-avatar>
              </div>
              <div v-else>
                <v-list-item-avatar class="no-picture">
                 <NNKoala/>
                </v-list-item-avatar>
              </div>
            </v-list-item>

            <v-card-actions>
              <v-btn class="view-button" :to="'/profile/' + profile.username" @click="getProfile">view</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

    </div>
  </div>
</template>

<script>
import NNKoala from "../../assets/svgs/NNKoala.svg";
export default {
  name: "MoreProfiles",
  components: {
    NNKoala
  },
  props: {
    profiles: {
      type: Array,
    },
  },
  data() {
    return {
      favoriteBooks: "",
      colors: ["#5de4ce", "#b9a6da", "#5de4ce", "#b9a6da", "#5de4ce"],
      boxShadow: ["0px 0px 10px rgba(9, 155, 94, 0.986);","0px 0px 10px rgba(245, 20, 245, 0.986)","0px 0px 10px rgba(224, 177, 8, 0.986)", "0px 0px 10px rgba(230, 176, 202, 0.986)","0px 0px 10px rgba(207, 247, 6, 0.986)"]
    };
  },
  methods: {
    consoleme() {
        console.log(this.otherUsers)
    },
    getProfile() {
      console.log("profiles = ", this.profiles);
    },
  },
  computed: {
    otherUsers() {
      return this.$store.getters["profile/getMoreUsers"];
    },
  }
};
</script>

<style scoped>



.headline-text {
  font-size: 1rem;
  font-weight: 600;
  color: rgba(32, 30, 33, 0.991);
}

.no-picture {
  border-radius: 0px !important;
  width: 4rem !important;
  height: 4rem !important
}

.username-text {
  background: #7821cf;
  cursor: pointer;
  background: repeating-radial-gradient(
    ellipse farthest-corner at top left,
    #7821cf 5%,
    #00011c 90%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;


}

.view-button {
  background: rgb(157, 210, 163) !important;
  text-transform: none;
  border-radius: 3px 20px 3px 20px;
  color: rgb(35, 41, 33);

}

@media screen and (max-width: 600px) {
.profile-container {
  margin-top: 40% !important;
}
}

.avatarPic {
  border-radius: 50%;
  background: none;
  font-family: Poppins;

}

.theCard {
  transform: skew(0deg, -3deg);
  transition: all 0.5s ease;
  min-width: 320px;
  max-width: 400px;
  min-height: 120px;
  /* background: #5de4ce; */
    /* background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask6359%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='url(%23SvgjsLinearGradient6360)'%3e%3c/rect%3e%3cpath d='M0 0L60.07 0L0 61.05z' fill='rgba(255%2c 255%2c 255%2c .1)'%3e%3c/path%3e%3cpath d='M0 61.05L60.07 0L195.35 0L0 190.51999999999998z' fill='rgba(255%2c 255%2c 255%2c .075)'%3e%3c/path%3e%3cpath d='M0 190.51999999999998L195.35 0L307.28999999999996 0L0 213.14999999999998z' fill='rgba(255%2c 255%2c 255%2c .05)'%3e%3c/path%3e%3cpath d='M0 213.14999999999998L307.28999999999996 0L894.91 0L0 287.79999999999995z' fill='rgba(255%2c 255%2c 255%2c .025)'%3e%3c/path%3e%3cpath d='M1440 560L824.25 560L1440 361.72z' fill='rgba(0%2c 0%2c 0%2c .1)'%3e%3c/path%3e%3cpath d='M1440 361.72L824.25 560L504.52 560L1440 235.87000000000003z' fill='rgba(0%2c 0%2c 0%2c .075)'%3e%3c/path%3e%3cpath d='M1440 235.87L504.52 560L381.15999999999997 560L1440 185.54000000000002z' fill='rgba(0%2c 0%2c 0%2c .05)'%3e%3c/path%3e%3cpath d='M1440 185.54000000000002L381.1600000000001 560L304.36000000000007 560L1440 178.44000000000003z' fill='rgba(0%2c 0%2c 0%2c .025)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask6359'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3clinearGradient x1='15.28%25' y1='-39.29%25' x2='84.72%25' y2='139.29%25' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient6360'%3e%3cstop stop-color='rgba(151%2c 188%2c 207%2c 0.99)' offset='0.01'%3e%3c/stop%3e%3cstop stop-color='rgba(118%2c 255%2c 132%2c 1)' offset='1'%3e%3c/stop%3e%3cstop stop-color='rgba(110%2c 101%2c 216%2c 1)' offset='1'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e");
    border: none; */
   box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}

.theCard:hover {
  transition: all 0.5s ease;
  transform: skew(0deg, 0deg);
  box-shadow: 0px 0px 20px rgba(10, 232, 65, 0.986) !important;

}
.profile-container {
  border-radius: 5px;
  margin-top: 60px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
    padding: 20px;
  
}
</style>
