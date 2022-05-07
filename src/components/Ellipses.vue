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
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
             <v-expand-x-transition v-show="expand">
       <v-list >
              <v-list-item
                v-for="(item, i) in items"
                :key="i"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
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
        { title: "Profile", icon: "mdi-help-box", to: "/about" },
        ],
    }),
}
</script>

<style>

</style>