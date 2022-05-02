<template>
  <v-main class="grey lighten-4">
    <v-app>
      <Navbar />
      <router-view/>
</v-app>
  </v-main>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
// import Spacer from "@/components/Spacer.vue";

export default {
  name: 'App',
  components: { Navbar,},

  data: () => ({
    //
  }),
};
</script>
