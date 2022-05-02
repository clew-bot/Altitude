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
  components: { Navbar,},

  data: () => ({
    //
  }),
};
</script>
