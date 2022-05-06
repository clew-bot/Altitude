<template>
  <div >
    <v-dialog
      :value="value" @input="$emit('input', $event)"
      width="500"
      @click="openSignInModal"
    >
<div>
      <v-card dark color="#4d4c4b">
              <v-card-title dark @click="$emit('events')">
          Sign In
        </v-card-title>
        <v-divider></v-divider>
        <div class="pa-6">
          <label for="email" class="signInLabels" @click="consoleme">Email</label>
            <v-text-field
            style="padding-top: 0px !important;"
            label="masquerena@protonmail.com"
            solo
            dense
            class=""
            name="email"
            v-model="email"
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
             class=""
            @click:append="show1 = !show1"
          ></v-text-field>
          <div class="bottomModalRow">
            <v-checkbox
              v-model="checkbox1"
              label="Remember me"
              color="orange"
              value="true"
              hide-details
            ></v-checkbox>
            <p style="margin-bottom: 0 !important">Forgot password?</p>
        </div>
        </div>
        <v-divider></v-divider>

        <v-card-actions style="padding-top: 1rem;">
          <v-btn
            color="orange"
            @click="login"
    
          >
            Login
          </v-btn>
        </v-card-actions>
        <div class="text-center">
       <p class="font-weight-medium" style="color: orange; padding-bottom: 12px;">Still new here? Cool, let's <span class="signUpLink" @click="openSignInModal">sign up then</span></p>
       </div>
      </v-card>
       </div>
        
    </v-dialog>
    <SignUpModal v-model="dialog2"/>
  </div>
</template>

<script>

import SignUpModal from "@/components/SignUpModal.vue";

export default {
    props: {
        showModal: {
            type: Boolean,
        },
        dialog: {
            type: Boolean,
        },
        value: {}
    },
    components: {
        SignUpModal,
    },

 data() {
     return {
    dialog2: false,
    drawer: false,
    group: null,
    signInModal: false,
    email: "",
    show1: false,
    password: '',
    rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => (`The email and password you entered don't match`),
    },
     checkbox1: false,
     }
  },
  methods: {
    consoleme() {
      console.log(this.checkbox1);
    },

    openSignInModal() {
      this.dialog2 = true;
      this.$emit('input', this.$event);
    },
    async login() {
      if (this.checkbox1 === "true") {
        localStorage.setItem('email', this.email);
        localStorage.setItem('rememberMe', true);
      }
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
          },
          "body": JSON.stringify({
            email: this.email,
            password: this.password
            })
        });
      const {message, loggedIn} = await res.json();
      console.log(message ,loggedIn)
      if (loggedIn) {
        this.password = "";
        this.$store.dispatch("user/LOGIN_USER", {
          email: this.email,
        })
        window.localStorage.setItem("vuelo", true);
        this.$emit('input', this.$event);
      } else {
        console.log("hi")
      }
    }
  },
    
  
  computed: {
    

  },
  mounted() {
    if (localStorage.getItem('rememberMe') === "true") {
      this.email = localStorage.getItem('email');
      this.checkbox1 = "true";
    }
  },
  watch: {
      value: function() {
        if (this.signInModal) {
          !this.value
        } else {
          this.value
        }

      },
      email: function() {
      }
  }
}
</script>

<style scoped>
.appSearch {
  padding-top: 25px !important;
  flex-grow: 2;
  text-align: center;
}

.signInLabels {
  margin-top: 100px!important;
  /* padding: 26px; */
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

}

.v-input--selection-controls {
    margin-top: 0 !important;
}

.v-application p {
    margin-bottom: 0px !important;
}

.signUpLink {
  color: pink;
  cursor: pointer;
}

.v-application p {
  margin-bottom: 0px !important;
}

.v-input--selection-controls {
  margin-top: 0 !important;
  padding-top: 0 !important;
}
</style>