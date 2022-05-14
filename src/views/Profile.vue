<template>
  <div class="entire-container">
    <div class="main-container" v-if="!noUsername">
      <div class="sub-container">
        <div
          v-if="!loading"
          class="rows1 closed"
        >
                     
          <div class="lastSeen">
            <div class="member-container">
              <div>
                <h3>Member Since: {{ getCreatedAt }}</h3>
              </div>
              <div>Last Seen: {{ getLastLoggedin }}</div>
            </div>
            <v-col>
              <br />
              <div class="bio">
                <b
                  ><i>{{ findUser.bio }}</i></b
                >
              </div>
              <br />
              <br />
              <p>Favorite Book: {{ findUser.favoriteBooks }}</p>
              <p>Favorite Hobbies: {{ findUser.favoriteHobbies }}</p>
              <p>Favorite Music: {{ findUser.favoriteMusic }}</p>
              <p>Favorite Food: {{ findUser.favoriteFood }}</p></v-col
            >
          </div>
          <br />

          <div class="image-container" v-if="!loadingImage">
            <div v-if="isThereImages">
              <div>
                <img
                  :src="'/api/images/' + findUser.profilePic"
                  alt=""
                  class="image"
                />
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
              <span class="">@</span>{{ findUser.username }}
            </h1>
            <h2 class="theHeadline">{{ findUser.headline }}</h2>
          </div>
          <div v-else>
            <v-progress-circular
              :size="70"
              :width="7"
              color="orange"
              indeterminate
            ></v-progress-circular>
          </div>
          <div>
            <v-icon @click="showingModal" class="mailbox-icon">mdi-mailbox-open-up</v-icon>
             <v-icon class="downIcon" @click="dropDown">mdi-chevron-down</v-icon>
             </div>
        </div>
      
        <div class="sub-container" v-else>
          <div class="loading" :class="{ show: show, closed: !show }">
            <v-progress-circular
              :size="70"
              :width="7"
              color="orange"
              indeterminate
            ></v-progress-circular>
          </div>
        </div>

      </div>
            <transition name="fade">
          <ExtraInformation v-if="show"/>
          </transition>
      <MoreProfiles />
    </div>

    <div v-else class="sub-container">
      <div class="rows1" :class="{ show: show, closed: !show }">
        <h1>no username found 🤔</h1>
      </div>
    </div>
  <SendMessageModal v-model="dialog" />
  </div>
</template>

<script>
import SendMessageModal from "@/components/Modals/SendMessageModal.vue";
import MoreProfiles from "@/components/Profile/MoreProfiles.vue";
import ExtraInformation from "@/components/Profile/ExtraInformation.vue";
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      show: false,
      dialog: false,
    };
  },
  components: {
    MoreProfiles,
    ExtraInformation,
    SendMessageModal,
  },
  name: "Profile",
  methods: {
    dropDown() {
      console.log("hi")
      this.show = !this.show;
    },
    async fetchProfileData() {
      const query = this.$router.currentRoute.params.id;
      this.$store.dispatch("profile/FETCH_PROFILE_DATA", query);
    },
    showingModal() {
            this.dialog = !this.dialog;
        },
  },
  mounted() {
    this.fetchProfileData();
  },
  computed: {
    ...mapState("profile", ["loading", "loadingImage", "noUsername"]),
    ...mapGetters("profile", [
      "findUser",
      "lastLoggedIn",
      "isThereImages",
      "getCreatedAt",
      "getLastLoggedin",
    ]),
  },
};
</script>

<style scoped>

.mailbox-icon {
     position: absolute;
    top: 20px;
    right: 20px;
    border-radius:50%;
    color: rgba(1, 3, 8, 0.652);
}
.downIcon {
   position: absolute;
    bottom: 20px;
    right: 20px;
    border-radius:50%;
}
.downIcon:hover {
background: rgba(229, 202, 202, 0.343);
border-radius: 50%;
}

.fade-enter-active, .fade-leave-active {
  transition: all .4s;
  height: 230px;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  height: 0;
  transform: skewX(85deg);
}
.theHeadline {
  color: #252524;
  font-size: 2.2rem;
}

.entire-container {
  padding: 4rem;
  background-repeat: repeat !important;
  border: 1px black;
}
.image {
  animation: fadeIn 5s;
}

@media screen and (max-width: 600px) {

  .loading {
    width: 300px !important;
  }
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
    /* margin-bottom: 200px !important;
    position: absolute; */
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
  height: 100%;
}

.loading {
  position: relative;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask5291%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='url(%23SvgjsLinearGradient5292)'%3e%3c/rect%3e%3cpath d='M0 0L60.07 0L0 61.05z' fill='rgba(255%2c 255%2c 255%2c .1)'%3e%3c/path%3e%3cpath d='M0 61.05L60.07 0L195.35 0L0 190.51999999999998z' fill='rgba(255%2c 255%2c 255%2c .075)'%3e%3c/path%3e%3cpath d='M0 190.51999999999998L195.35 0L307.28999999999996 0L0 213.14999999999998z' fill='rgba(255%2c 255%2c 255%2c .05)'%3e%3c/path%3e%3cpath d='M0 213.14999999999998L307.28999999999996 0L894.91 0L0 287.79999999999995z' fill='rgba(255%2c 255%2c 255%2c .025)'%3e%3c/path%3e%3cpath d='M1440 560L824.25 560L1440 361.72z' fill='rgba(0%2c 0%2c 0%2c .1)'%3e%3c/path%3e%3cpath d='M1440 361.72L824.25 560L504.52 560L1440 235.87000000000003z' fill='rgba(0%2c 0%2c 0%2c .075)'%3e%3c/path%3e%3cpath d='M1440 235.87L504.52 560L381.15999999999997 560L1440 185.54000000000002z' fill='rgba(0%2c 0%2c 0%2c .05)'%3e%3c/path%3e%3cpath d='M1440 185.54000000000002L381.1600000000001 560L304.36000000000007 560L1440 178.44000000000003z' fill='rgba(0%2c 0%2c 0%2c .025)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask5291'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3clinearGradient x1='15.28%25' y1='-39.29%25' x2='84.72%25' y2='139.29%25' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient5292'%3e%3cstop stop-color='rgba(34%2c 145%2c 200%2c 0.99)' offset='0.06'%3e%3c/stop%3e%3cstop stop-color='rgba(110%2c 101%2c 216%2c 1)' offset='1'%3e%3c/stop%3e%3cstop stop-color='rgba(110%2c 101%2c 216%2c 1)' offset='1'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e");
  background-repeat: repeat-y;
  margin-top: 5%;
  display: flex-inline;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  justify-content: space-around !important;
  width: 1000px;
  ;
  text-align: right;
  align-items: center;
}
.rows1 {
  position: relative;
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
</style>
