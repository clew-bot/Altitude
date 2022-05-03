<template>
  <div>
    <v-dialog
      width="900"
    >
<div>
      <v-card dark color="#4d4c4b">
              <v-card-title dark >
          Sign In
        </v-card-title>
        <v-divider></v-divider>
          <label for="email" class="signInLabels">Signup</label>
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
          <div class="bottomModalRow">
            <v-checkbox
              v-model="ex4"
              label="Remember me"
              color="orange"
              value="orange"
              hide-details
            ></v-checkbox>
            <p style="margin-bottom: 0 !important">Forgot password?</p>
        </div>
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
        <div class="text-center">
       <p class="font-weight-medium" style="color: orange">Still new here? Cool, let's sign up then</p>
       </div>
      </v-card>
       </div>
    </v-dialog>
  </div>
</template>

<script>
export default {
    props: {

    },
 data() {
     return {
    drawer: false,
    group: null,
    items: [
      { title: "Dashboard", icon: "mdi-view-dashboard" },
      { title: "Photos", icon: "mdi-image" },
      { title: "About", icon: "mdi-help-box" },
    ],
    show1: false,
    password: '',
    rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => (`The email and password you entered don't match`),
    },
     ex4: ['red', 'indigo', 'orange', 'primary', 'secondary', 'success', 'info', 'warning', 'error', 'red darken-3', 'indigo darken-3', 'orange darken-3'],
     }
  },
  
  methods: {
 
  },
  computed: {


  },
}
</script>

<style>
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

.v-application p {
    margin-bottom: 0px !important;
}
</style>