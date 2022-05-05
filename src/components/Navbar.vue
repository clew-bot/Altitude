<template>
  <div>
    <v-navigation-drawer app v-model="drawer" color="#4d4c4b" dark>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> Welcome </v-list-item-title>
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
        <v-list-item to="/logout" @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <!-- 
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->
    </v-navigation-drawer>
    <v-app-bar app color="#4d4c4b" dark>
      <!-- Gradient -->

      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title></v-app-bar-title>

      <v-spacer></v-spacer>
      <v-text-field
        class="appSearch"
        center
        dense
        outlined
        placeholder="Search"
        prepend-inner-icon="mdi-magnify"
      ></v-text-field>
      <v-btn color="gray lighten-2" dark @click="showingModal">
        <v-icon>mdi-account-box</v-icon>
        &nbsp;Sign in
      </v-btn>
      <LoginModal v-model="dialog" :openSignInModal="openSignInModal" />
      <SignUpModal v-model="dialog2" />

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import LoginModal from "@/components/LoginModal.vue";
import SignUpModal from "@/components/SignUpModal.vue";

export default {
  data: () => ({
    drawer: false,
    group: null,
    items: [
      { title: "Home", icon: "mdi-home-outline", to: "/" },
      {
        title: "Dashboard",
        icon: "mdi-desktop-mac-dashboard",
        to: "/dashboard",
      },
      { title: "About", icon: "mdi-help-box", to: "/about" },
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
  },
  methods: {
    openDialog() {},
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
    yodee() {
      console.log("yodee");
    },
    watchDialog() {
      console.log("The Dialog 2 =", this.dialog2);
      // this.$store.state.modal.dialog = this.dialog;
      this.dialog2 = this.$store.state.modal.dialog2;
    },
    async logout() {
      const res = await fetch("/api/logout");
      const data = await res.json();
      console.log("data", data);
    },
  },
  computed: {},
  watch: {
    group() {
      this.drawer = false;
    },
    $route() {
      this.checkModal();
    },
    dialog2: function () {
      console.log("RUnning dialog2 watcher");
      this.dialog2 = this.$store.state.modal.dialog2;
    },
  },

  created() {
    this.checkModal();
  },
};
</script>

<style scoped>
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

.center {
  text-align: center;
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
