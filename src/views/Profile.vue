<template>
  <div class="entire-container">
    <div class="main-container" v-if="!noUsername">
      <div class="sub-container">
        <div v-if="!loading" class="rows1 closed" :style="[getBackgroundColor && {'background': getBackgroundColor.hexa} ]">
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
              </v-col>
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
            <div v-if="findUser.username !== myUsername">
            <v-icon @click="showingModal" class="mailbox-icon"
              >mdi-mailbox-open-up</v-icon
            >
            <v-icon @click="likeUser" class="thumb-icon"
              >mdi-account-star</v-icon
            >
            </div>
            <div v-if="findUser.isAdmin">
                 <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-icon
        class="admin-icon"
          color="orange"
          dark
          v-bind="attrs"
          v-on="on"
        >
          mdi-crown
        </v-icon>
      </template>
      <span>Admin</span>
    </v-tooltip>
            </div>
            <div>
              <!-- TO BE IMPLEMENTED? -->
             <!-- <v-icon @click="likeUser" class="thumb-icon"
              >mdi-emoticon-happy</v-icon
            > -->
            </div>
            <v-icon class="downIcon" @click.prevent="dropDown"
              >mdi-chevron-down</v-icon
            >
          </div>
        </div>

        <div class="sub-container" v-else>
  <!-- <v-progress-linear
      indeterminate
      color="cyan"
    ></v-progress-linear> -->
        </div>
      </div>
    
      <transition name="fades">
        <ExtraInformation v-show="show" :extraInfo="findUser"/>
      </transition>
        <h3 id="check-out" v-if="!loading">Check out these other profiles 🔥</h3>
        <h3 id="check-out-else" v-else><i>loading..</i></h3>
      <MoreProfiles :loadingProfiles="loadingProfiles" />
    </div>

    <div v-else class="sub-container">
      <div class="no-username-container">
        <h1 class="no-username">no username found 🤔</h1>
      </div>
    </div>
    <SendMessageModal v-model="dialog" :person="findUser.username" />
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
      loading: false,
      loadingProfiles: true,
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
      this.show = !this.show;
    },
    async fetchProfileData() {
      this.loading=true;
      const query = this.$router.currentRoute.params.id;
      this.$store.dispatch("profile/RESET_BACKGROUND");
      this.$store.dispatch("profile/FETCH_PROFILE_DATA", query);
      setTimeout(() => {
        this.loading = false;
        this.loadingProfiles = false;
      }, 1100);
    },
    showingModal() {
      this.dialog = !this.dialog;
    },
    async likeUser() {
      const response = await fetch("/api/likeUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.findUser.username,
        }),
      });
      const { liked } = await response.json();
      if (liked) {
        this.$toasted.show("Liked User!", {
        theme: "bubble",
        position: "top-center",
        duration: 3000,
      });
      } else {
        this.$toasted.show("Already Liked!", {
        theme: "bubble",
        position: "top-center",
        duration: 3000,
      });
      }
    },
  },
  mounted() {
    this.fetchProfileData();
  },
  computed: {
    ...mapState("profile", ["loadingImage", "noUsername"]),
    ...mapGetters("profile", [
      "findUser",
      "lastLoggedIn",
      "isThereImages",
      "getCreatedAt",
      "getLastLoggedin",
      "getBackgroundColor",
    ]),
    myUsername() {
      return localStorage.getItem("username");
    },
  },
};
</script>

<style scoped>

@media screen and (max-width: 600px) {
 #check-out {
  margin-top: 50% !important;
}
 #check-out-else {
  margin-top: 50% !important;
}
  
}

#check-out {
  margin-top: 20%;
  text-align: center;
  color: white;
}

 #check-out-else {
  margin-top: 20%;
  text-align: center;
  color: rgb(241, 235, 235);
}
.thumb-icon {
  position: absolute;
  top: 20px;
  right: 55px;
  border-radius: 50%;
  color: rgba(1, 3, 8, 0.652);
}

.admin-icon {
  position: absolute;
  top: 20px;
  left: 20px;
  border-radius: 50%;
  color: rgba(1, 3, 8, 0.652);
}

.mailbox-icon {
  position: absolute;
  top: 20px;
  right: 20px;
  border-radius: 50%;
  color: rgba(1, 3, 8, 0.652);
}
.downIcon {
  position: absolute;
  bottom: 20px;
  right: 20px;
  border-radius: 50%;
}
.downIcon:hover {
  background: rgba(229, 202, 202, 0.343);
  border-radius: 50%;
}

.fades-enter-active,
.fades-leave-active {
  transition: all 0.4s;
  height: auto;
}
.fades-enter, .fades-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;

  /* transform: skewX(25deg); */
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
  box-shadow: none !important;
  height: 100%;
  object-fit: cover;
}

@media screen and (max-width: 600px) {

  .member-container {
    margin-top: 3rem;
  }

  .theHeadline {
    font-size: 1.5rem;
    text-align: left;
      width:230px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  }
  .no-username {
    padding: 10px;
    font-size: 18px;
    text-align: center;
  }
  .closed {
    height: 100% !important;
    width: 100% !important;
    flex-direction: column;
  }
  .image-container {
    flex-grow: 2;
    text-align: left;
  }
  .no-username-container {
    width: 100% !important;
    flex-direction: column;
    margin-top: 5%;
    display: flex;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    justify-content: space-around !important;
    width: 1000px;
    text-align: right;
    align-items: center;
    background: white;
    margin-top: 25%;
  }
  .sub-container {
    width: 100%;
  }
  .loading {
    width: 300px !important;
  }
  .entire-container {
    margin-top: -2rem;
    padding: 12px;
  }
  .username {
    color: rgb(244, 243, 248);
    font-size: 1.5rem;
  }
  .sub-container {
    padding: 10px;
  }
  .image-container {
    padding: 10px;
    border-radius: 10px;
  }
  .rows1 {
    display: flex !important;
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

.no-username-container {
  width: 100% !important;
  flex-direction: column;
  margin-top: 5%;
  display: flex;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  justify-content: space-around !important;
  width: 1000px;
  text-align: right;
  align-items: center;
  background: white;
  margin-top: 25%;
  padding: 4rem 4rem;
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
