<template>
  <div>
    <v-navigation-drawer app v-model="drawer" color="#4d4c4b" class="navDrawer">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6" style="cursor:default; user-select: none;" @click="consoleme">{{time}}
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
      <router-link to="/" style="text-decoration: none; color: inherit;"> <h1 class="altitude" >Altitude</h1></router-link>
 
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
import LoginModal from "@/components/LoginModal.vue";
import SignUpModal from "@/components/SignUpModal.vue";
import Ellipses from "@/components/Ellipses.vue";
import ProfileButton from "@/components/ProfileButton.vue";
import router from "../router";
import moment from "moment";

export default {
  data: () => ({   
    time: moment().format('h:mm:ss a'),
    expand: false,
    drawer: false,
    group: null,
    items: [
      { title: "Home", icon: "mdi-home-outline", to: "/" },
      { title: "Journal", icon: "mdi-notebook", to: "/journal" },
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
    ProfileButton
},
  methods: {
    consoleme() {
      console.log(this.$store.state.user.loggedIn);
      console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));
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
      console.log("The Dialog 2 =", this.dialog2);
      // this.$store.state.modal.dialog = this.dialog;
      this.dialog2 = this.$store.state.modal.dialog2;
    },
    async logout() {
      try {
        const res = await fetch("/api/logout");
        const data = await res.json();
        this.$store.dispatch("user/LOGOUT_USER");
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
    //    time() {
    //      return moment().format('MMMM Do YYYY, h:mm:ss a');
    //  },
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
          setInterval(() => {
            let time = moment().format('h:mm:ss A');
      this.time = time
    }, 1000);
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
</style>
