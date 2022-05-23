<template>
    <v-menu
      transition="fab-transition"
      origin="right"
            bottom
            left
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dark
                icon
                v-bind="attrs"
                v-on="on"
                @click="expand = !expand"
              >
                <v-icon class="ellipses-icon">mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
             <v-expand-x-transition v-show="expand">
       <v-list class="elip-items">
              <i><v-list-item
                v-for="(item, i) in items"
                :key="i"
                :to="item.to"
              >
              
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
              </i>
            </v-list>
      </v-expand-x-transition>
          </v-menu>
</template>

<script>
export default {
    name: "Ellipses",
    data: () => ({      
        expand: false,
        items: [
        { title: "Home", icon: "mdi-home-outline", to: "/" },
        { title: "Edit Profile", icon: "mdi-help-box", to: "/edit" },
        ],
    }),
}
</script>

<style scoped>
.elip-items {
  background: rgb(79, 77, 77);
  color: white;
  font-weight: bolder;

}
.ellipses-icon {
  color: rgb(48, 11, 44) !important;
}

</style>