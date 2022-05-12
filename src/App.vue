<template>
  <v-main>
    <v-app>
      <Navbar />
      <router-view class="" :key="$route.path"/>
    </v-app>
  </v-main>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
// import Spacer from "@/components/Spacer.vue";

export default {
  name: "App",

  components: { Navbar },

  data: () => ({
    events: ["click", "mousemove", "scroll", "keypress", "load"],
    logoutTimer: null,
  }),
  // methods: {
  //    setTimers: function () {
  //      this.logoutTimer = setTimeout(this.logoutUser, 10 * 1000);
  //    },
  //   async logoutUser() {
  // try {
  //       const res = await fetch("/api/logout");
  //       const data = await res.json();
  //       this.$store.dispatch("user/LOGOUT_USER");
  //       console.log("data", data);
  //       window.localStorage.removeItem("vuelo");
  //       this.$router.push("/");
  //     } catch (error) {
  //       throw new Error(error);
  //     }
  //   },
  //   resetTimer: function () {
  //     clearTimeout(this.logoutTimer);
  //     this.setTimers();
  //   }

  // },
  //     mounted() {
  //       if(!this.$store.state.user.loggedIn) {
  //         return
  //       }
  //     this.events.forEach(function (event) {
  //       window.addEventListener(event, this.resetTimer);

  //   }, this);
  //     },
  //     destroyed() {
  //     this.events.forEach(function (event) {
  //       window.removeEventListener(event, this.resetTimer);
  //   }, this);
  //     },
};
</script>
<style lang="scss">
@import "../node_modules/@braid/vue-formulate/themes/snow/snow.scss";
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

* {
  font-family: "Poppins", sans-serif;
}

.v-application--wrap {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg clip-path='url(%26quot%3b%23SvgjsClipPath4840%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='%2332325d'%3e%3c/rect%3e%3ccircle r='25.455' cx='1093.36' cy='436.34' fill='url(%23SvgjsLinearGradient4841)'%3e%3c/circle%3e%3ccircle r='24.585' cx='856.6' cy='137.12' fill='url(%23SvgjsLinearGradient4842)'%3e%3c/circle%3e%3ccircle r='20.625' cx='1067.22' cy='413.37' fill='url(%23SvgjsLinearGradient4843)'%3e%3c/circle%3e%3ccircle r='17.215' cx='31.02' cy='294.36' fill='url(%23SvgjsLinearGradient4844)'%3e%3c/circle%3e%3ccircle r='36.255' cx='736.33' cy='459.93' fill='rgba(152%2c 211%2c 141%2c 1)'%3e%3c/circle%3e%3ccircle r='21.88' cx='295.42' cy='288.72' fill='url(%23SvgjsLinearGradient4845)'%3e%3c/circle%3e%3ccircle r='31.49' cx='184.73' cy='55.4' fill='url(%23SvgjsLinearGradient4846)'%3e%3c/circle%3e%3ccircle r='54.39' cx='434.74' cy='74.19' fill='url(%23SvgjsLinearGradient4847)'%3e%3c/circle%3e%3c/g%3e%3cdefs%3e%3cclipPath id='SvgjsClipPath4840'%3e%3crect width='1440' height='560' x='0' y='0'%3e%3c/rect%3e%3c/clipPath%3e%3clinearGradient x1='1093.36' y1='385.42999999999995' x2='1093.36' y2='487.24999999999994' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient4841'%3e%3cstop stop-color='%23e298de' offset='0.1'%3e%3c/stop%3e%3cstop stop-color='rgba(61%2c 89%2c 103%2c 0.7)' offset='0.9'%3e%3c/stop%3e%3c/linearGradient%3e%3clinearGradient x1='807.4300000000001' y1='137.12' x2='905.7700000000001' y2='137.12' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient4842'%3e%3cstop stop-color='%2384b6e0' offset='0.1'%3e%3c/stop%3e%3cstop stop-color='rgba(75%2c 83%2c 48%2c 1)' offset='0.9'%3e%3c/stop%3e%3c/linearGradient%3e%3clinearGradient x1='1067.22' y1='372.12' x2='1067.22' y2='454.62' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient4843'%3e%3cstop stop-color='%23e298de' offset='0.1'%3e%3c/stop%3e%3cstop stop-color='rgba(61%2c 89%2c 103%2c 0.7)' offset='0.9'%3e%3c/stop%3e%3c/linearGradient%3e%3clinearGradient x1='-3.41' y1='294.36' x2='65.45' y2='294.36' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient4844'%3e%3cstop stop-color='rgba(242%2c 204%2c 124%2c 1)' offset='0.51'%3e%3c/stop%3e%3cstop stop-color='rgba(149%2c 116%2c 159%2c 1)' offset='0.9'%3e%3c/stop%3e%3c/linearGradient%3e%3clinearGradient x1='251.66000000000003' y1='288.72' x2='339.18' y2='288.72' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient4845'%3e%3cstop stop-color='%2384b6e0' offset='0.1'%3e%3c/stop%3e%3cstop stop-color='rgba(75%2c 83%2c 48%2c 1)' offset='0.9'%3e%3c/stop%3e%3c/linearGradient%3e%3clinearGradient x1='184.73' y1='-7.579999999999998' x2='184.73' y2='118.38' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient4846'%3e%3cstop stop-color='%23e298de' offset='0.1'%3e%3c/stop%3e%3cstop stop-color='rgba(61%2c 89%2c 103%2c 0.7)' offset='0.9'%3e%3c/stop%3e%3c/linearGradient%3e%3clinearGradient x1='325.96000000000004' y1='74.19' x2='543.52' y2='74.19' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient4847'%3e%3cstop stop-color='rgba(242%2c 204%2c 124%2c 1)' offset='0.51'%3e%3c/stop%3e%3cstop stop-color='rgba(149%2c 116%2c 159%2c 1)' offset='0.9'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e");
  background-repeat: repeat;
}
</style>
