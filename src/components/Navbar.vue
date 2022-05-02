<template>
  <div>
    <v-navigation-drawer app v-model="drawer" color="#4d4c4b" dark>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> Application </v-list-item-title>
          <v-list-item-subtitle> subtext </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="#4d4c4b" dark >
      <!-- Gradient -->
    

      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title></v-app-bar-title>

      <v-spacer></v-spacer>
            <v-text-field class="appSearch"
            center
        dense
        outlined
        placeholder="Search"
        prepend-inner-icon="mdi-magnify"
      ></v-text-field>
      <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="gray lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
        >
        <v-icon>mdi-account-box</v-icon>
          &nbsp;Sign in
        </v-btn>
      </template>
<div>
      <v-card dark color="#4d4c4b">
              <v-card-title dark >
          Sign In
        </v-card-title>
        <v-divider></v-divider>
          <label for="email" class="signInLabels">Email</label>
            <v-text-field
            style="padding-top: 0px !important;"
            label="masquerena@protonmail.com"
            solo
            dense
             class="pa-6"
             name="email"
          ></v-text-field>
          
        <label for="email" class="signInLabels">Password</label>
        <v-text-field
            style="padding-top: 0px !important;"
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            solo
            dense
             class="pa-6"
            @click:append="show1 = !show1"
          ></v-text-field>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
            color="orange"

            @click="dialog = false"
            class="center"
          >
            Login
          </v-btn>
        </v-card-actions>
       
      </v-card>
       </div>
    </v-dialog>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
   
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
    items: [
      { title: "Dashboard", icon: "mdi-view-dashboard" },
      { title: "Photos", icon: "mdi-image" },
      { title: "About", icon: "mdi-help-box" },
    ],
     dialog: false,
    show1: false,
    password: '',
    rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => (`The email and password you entered don't match`),
    },
  }),

  watch: {
    group() {
      this.drawer = false;
      this.password = "";
    },
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
  margin-top: 100px!important;
  padding: 26px;
  box-sizing: border-box;
}

.center {
    text-align: center;
}

</style>
