<template>
  <v-app class="grey lighten-4">
    <v-app-bar
      fixed
      color="#fcb69f"
      dark
      shrink-on-scroll
      fade-img-on-scroll
      src="https://picsum.photos/1920/1080?random"
     
    >
      

      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-app-bar-title>Title</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
    <!-- <v-sheet
      id="scrolling-techniques-3"
      class="overflow-y-auto"
      max-height="600"
    >
      <v-container style="height: 1000px;"></v-container>
    </v-sheet> -->

      <v-main
      id="scrolling-techniques-3"
      class="overflow-y-auto"
      max-height="1100"
    >
      <router-view  class="overflow-y-auto"      max-height="600"/>
       </v-main>

  </v-app>
</template>

<script>
// import Navbar from "@/components/Navbar.vue";

export default {
  name: 'App',
  // components: { Navbar},

  data: () => ({
    //
  }),
};
</script>
