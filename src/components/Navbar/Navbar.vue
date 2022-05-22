<template>
  <div>
    <v-navigation-drawer app v-model="drawer" color="#4d4c4b" class="navDrawer">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6" style="cursor:default; user-select: none;" @click="consoleme"><h2>Menu</h2>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
           <v-list-item to="/messages" :disabled="isDisabled">
          <v-list-item-icon>
            <v-icon>mdi-email-mark-as-unread</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Messages</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/dashboard" :disabled="isDisabled">
          <v-list-item-icon>
            <v-icon>mdi-desktop-mac-dashboard</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/logout" @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="#4d4c4b" class="navbar">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <router-link to="/" style="text-decoration: none; color: inherit;"> <h1 class="altitude" >      
          <span class="a">A</span>
          <span class="b">l</span>
          <span class="c">t</span>
          <span class="d">i</span>
          <span class="e">t</span>
          <span class="f">u</span>
          <span class="g">d</span>
          <span class="h">e</span></h1></router-link>
      &nbsp;&nbsp;<Koala/>
 
       <!-- <iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/0DDChjnLvpfCfoxXnEN4sw?utm_source=generator" width="100%" height="50" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe> -->
      <v-app-bar-title></v-app-bar-title>
      <v-spacer></v-spacer>
        <LoginModal v-model="dialog" />
        <SignUpModal v-model="dialog2"/>
      <div v-if="showUsername">
      <v-btn color="gray lighten-2" dark @click="showingModal">
        <v-icon>mdi-account-box</v-icon>
        &nbsp;Sign in
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
      { title: "Home", icon: "mdi-home-outline", to: "/" },
      { title: "Journal", icon: "mdi-notebook", to: "/journal" },
      { title: "Reddit", icon: "mdi-reddit", to: "/reddit" },
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
.navDrawer {
  background-color: #c7c6c6 !important;
}.navbar {
  background-color: #c7c6c6 !important;
}
.altitude {
  font-size: 1.5rem;
  font-weight: bold !important;
  cursor: pointer;
 transition: all 0.5s ease;
  border-radius: 5px;
  padding: 5px;
   background: #f3f3f3b2 !important;
}

.altitude:hover {
  background: #f3efef77 !important;
  transition: all 0.5s ease;
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
</style>
