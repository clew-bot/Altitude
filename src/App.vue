<template>
  <v-app class="grey lighten-4">
      <Navbar />
      <Spacer />
      <v-space></v-space>
      <router-view/>


  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Spacer from "@/components/Spacer.vue";

export default {
  name: 'App',
  components: { Navbar, Spacer},

  data: () => ({
    //
  }),
};
</script>
