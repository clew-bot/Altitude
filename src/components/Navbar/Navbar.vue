<template>
  <div>
    <v-navigation-drawer app v-model="drawer" color="#4d4c4b" class="navDrawer">
      <v-list-item class="nav-title">
        <v-list-item-content>
          <v-list-item-title class="" style="cursor:default; user-select: none;" @click="consoleme"><h2>what's up?</h2>
          <!-- <span>1 new notification</span> -->
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- <v-divider></v-divider> -->

      <v-list dense nav>
               <v-list-item to="/" >
          <v-list-item-icon>
            <v-icon class="home-icon">mdi-home</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
       
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" :class="{ 'disabledIcon': isDisabled}" :disabled="isDisabled">
          <v-list-item-icon>
            <v-icon :class="item.class">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
          <v-list-item to="/messages" :disabled="isDisabled" :class="{ 'disabledIcon': isDisabled}">
          <v-list-item-icon>
            <v-icon class="message-icon">mdi-email-mark-as-unread</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Messages</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/dashboard" :disabled="isDisabled" :class="{ 'disabledIcon': isDisabled}">
          <v-list-item-icon>
            <v-icon class="dashboard-icon">mdi-desktop-mac-dashboard</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/logout" @click="logout">
          <v-list-item-icon>
            <v-icon class="logout-icon">mdi-logout</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="#4d4c4b" class="navbar">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <router-link to="/" style="text-decoration: none; color: inherit;"> 
      <h1 class="altitude" >  
        altitude    
          <!-- <span class="a">A</span>
          <span class="b">l</span>
          <span class="c">t</span>
          <span class="d">i</span>
          <span class="e">t</span>
          <span class="f">u</span>
          <span class="g">d</span>
          <span class="h">e</span> -->
          </h1>
          </router-link>
      &nbsp;&nbsp;<Koala class="mains-icon"/>
 
       <!-- <iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/0DDChjnLvpfCfoxXnEN4sw?utm_source=generator" width="100%" height="50" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe> -->
      <v-app-bar-title></v-app-bar-title>
      <v-spacer></v-spacer>
        <LoginModal v-model="dialog" />
        <SignUpModal v-model="dialog2"/>
      <div v-if="showUsername">
      <v-btn class="sign-in-button" dark @click="showingModal">
        <v-icon class="account-icon">mdi-account-box</v-icon>
        <i>&nbsp;sign-in</i>
      </v-btn>
      </div>
      <div v-else>
        <ProfileButton/>
      </div>
      <Ellipses />
    </v-app-bar>
      
  </div>
</template>

<script>
import LoginModal from "@/components/Modals/LoginModal.vue";
import SignUpModal from "@/components/Modals/SignUpModal.vue";
import Ellipses from "@/components/Navbar/Ellipses.vue";
import ProfileButton from "@/components/Navbar/ProfileButton.vue";
import router from "../../router";
import Koala from "../../assets/svgs/koala.svg";

export default {
  data: () => ({   
    expand: false,
    drawer: false,
    group: null,
    items: [
      { title: "Journal", icon: "mdi-notebook", to: "/journal", class: "journal-icon" },
      { title: "Reddit", icon: "mdi-reddit", to: "/reddit", class: "reddit-icon" },
    ],
    dialog: false,
    dialog2: false,
    show1: false,
    password: "",

    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
      emailMatch: () => `The email and password you entered don't match`,
    },
    showModal: false,
  }),
  components: {
    LoginModal,
    SignUpModal,
    Ellipses,
    ProfileButton,
    Koala,
},
  methods: {
    consoleme() {
      console.log(this.$store.state.user.loggedIn);
    },
    showingModal() {
      this.dialog = !this.dialog;
    },
    openSignInModal() {
      console.log("openSignInModal");
      this.dialog2 = !this.dialog2;
    },
    checkModal() {
      if (this.$route.hash === "#signin") {
        this.dialog = true;
      }
      if (this.$route.hash === "#signup") {
        this.dialog2 = true;
      }
    },
    watchDialog() {
      this.dialog2 = this.$store.state.modal.dialog2;
    },
    async logout() {
      try {
        const res = await fetch("/api/logout");
        const data = await res.json();
        this.$store.dispatch("user/LOGOUT_USER");
          this.$store.dispatch("profile/RESET_BACKGROUND");
        console.log("data", data);
        window.localStorage.removeItem("vuelo");
        router.push("/");
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  computed: {
    isDisabled() {
      const localStorage = window.localStorage.getItem("vuelo");
      if (this.$store.state.user.loggedIn === null) {
        if (localStorage) {
          return false;
        } else {
          return true;
        }
      } else if (this.$store.state.user.loggedIn) {
        return false;
      } else {
        return true;
      }
    },
    showUsername() {
      const localStorage = window.localStorage.getItem("vuelo");
      if (this.$store.state.user.loggedIn === null) {
        if (localStorage) {
          return false;
        } else {
          return true;
        }
      } else if (this.$store.state.user.loggedIn) {
        return false;
      } else {
        return true;
      }
    }
  },
  watch: {
    group() {
      this.drawer = false;
    },
    $route() {
      this.checkModal();
    },

  },
  mounted() {
  },

  created() {
    this.checkModal();
  },
};
</script>

<style scoped>

.disabledIcon {
  opacity: .3 !important;

}

.account-icon {
  color: rgb(203, 203, 194) !important;
}

.sign-in-button {
  padding: 18px !important;
  text-transform: none;
  letter-spacing: 1px;
  font-weight: bold;
}

.logout-icon {
  color: rgb(68, 65, 65);
}

.dashboard-icon {
  color: #c71a1a !important;
}

.journal-icon {
  color: green !important;
}

.reddit-icon {
  color: #FE4600 !important;
}

.message-icon {
  color: rgb(21, 88, 136) !important;
}

.home-icon {
  color: rgb(74, 5, 127) !important;
}


 .v-list--dense .v-list-item .v-list-item__title {
     line-height: 1.2 !important;
 }


.v-list-item__title {
  font-size: 1.2rem !important;
  color: white;
  font-weight: bolder !important;
}

.v-list-item {
  background-color: #1b1915f8;
  padding: 10px;
  transform: skewY(-7deg);
  line-height: 0 !important;
  color: rgb(29, 31, 29);
    transition: all 0.1s ease-in-out;
}
.v-list-item--active {
  background-color: #17202ee2;
  padding: 10px;
  transform: skewY(-7deg);
}
.nav-title {
  /* background: #ebe649ec !important; */
  background: #12120b !important;

  color: white !important;
  margin-top: 1px;
  border-radius: 5px;
  margin-right: 8px !important;
  margin-left: 8px !important;
}

.v-list-item:not(.nav-title):hover {
  transition: all 0.1s ease-in-out;
  margin-left: 12px;

}


.navDrawer {
  background-color: #37364bf0 !important;
}.navbar {
  background-color: #37364bfc !important;
}
.altitude {
  font-size: 1.5rem;
  font-weight: bold !important;
  cursor: pointer;
 transition: all 0.5s ease;
  border-radius: 3px;
  padding: 5px;
   /* background: #c1c1c0ed !important; */
}

.altitude:hover {
  transform:translateY(-1px);
}


.appSearch {
  padding-top: 25px !important;
  flex-grow: 2;
  text-align: center;
}

.signInLabels {
  margin-top: 100px !important;
  padding: 26px;
  box-sizing: border-box;
}
.v-card__actions {
  justify-content: center !important;
}

.bottomModalRow {
  display: flex;
  justify-content: space-between;
  align-items: center !important;
  padding: 0px 24px 12px 24px;
}

.v-input--selection-controls {
  margin-top: 0 !important;
}


/* LOGO */
.a {
  color: rgb(233, 176, 176);
  animation: bounce 1s ease-in-out;
  
  padding: 1px;
  
  
  -webkit-user-select: none !important; /* Safari */
  -moz-user-select: none !important; /* Firefox */
  -ms-user-select: none !important; /* IE10+/Edge */
  user-select: none !important;
}

.b {
  color: rgb(179, 189, 133);
  animation: bounce 1s ease 0.1s;
  
  padding: 1px;
  
  
  -webkit-user-select: none !important; /* Safari */
  -moz-user-select: none !important; /* Firefox */
  -ms-user-select: none !important; /* IE10+/Edge */
  user-select: none !important;
}

.c {
  color: rgb(135, 218, 157);
  animation: bounce 1s ease 0.2s;
  
  padding: 1px;
  
  
  -webkit-user-select: none !important; /* Safari */
  -moz-user-select: none !important; /* Firefox */
  -ms-user-select: none !important; /* IE10+/Edge */
  user-select: none !important;
}

.d {
  color: rgb(140, 165, 211);
  animation: bounce 1s ease 0.3s;
  
  padding: 1px;
  
  
  -webkit-user-select: none !important; /* Safari */
  -moz-user-select: none !important; /* Firefox */
  -ms-user-select: none !important; /* IE10+/Edge */
  user-select: none !important;
}

.e {
  color: rgb(176, 160, 222);
  animation: bounce 1s ease 0.4s;
  
  padding: 1px;
  
  
  -webkit-user-select: none !important; /* Safari */
  -moz-user-select: none !important; /* Firefox */
  -ms-user-select: none !important; /* IE10+/Edge */
  user-select: none !important;
}

.f {
  color: rgb(199, 154, 196);
  animation: bounce 1s ease 0.5s;
  
  padding: 1px;
  
  
  -webkit-user-select: none !important; /* Safari */
  -moz-user-select: none !important; /* Firefox */
  -ms-user-select: none !important; /* IE10+/Edge */
  user-select: none !important;
}
.g {
  color: rgb(189, 133, 156);
  animation: bounce 1s ease 0.6s;
  
  padding: 1px;
  
  
  -webkit-user-select: none !important; /* Safari */
  -moz-user-select: none !important; /* Firefox */
  -ms-user-select: none !important; /* IE10+/Edge */
  user-select: none !important;
}
.h {
  color: rgb(226, 127, 127);
  animation: bounce 1s ease 0.7s;
  
  padding: 1px;
  
  
  -webkit-user-select: none !important; /* Safari */
  -moz-user-select: none !important; /* Firefox */
  -ms-user-select: none !important; /* IE10+/Edge */
  user-select: none !important;
}

@media screen and (max-width: 600px) {

  .altitude {
    background: none !important;
  }

  .altitude:hover {
    background: none !important;
  }

} 

@media screen and (max-width: 414px) {
   .mains-icon {
    display: none;
  }
} 


</style>
