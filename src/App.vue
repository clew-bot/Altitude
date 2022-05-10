<template>
  <v-main >
    <v-app >
      <Navbar />
      <router-view class="grey lighten-2"/>
    </v-app>
  </v-main>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
// import Spacer from "@/components/Spacer.vue";

export default {
  name: 'App',
  beforeRouteUpdate() {
    if (this.$route.name === '#signin') {
      console.log("hi")
    }
  },

    
  components: { Navbar,},

  data: () => ({
    //
  }),
  
};
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

* {
  font-family: 'Poppins', sans-serif;
}
</style>