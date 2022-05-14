<template>
  <div>
    <v-dialog
      :value="value"
      @input="$emit('input', $event)"
      width="500"
    >
      <div>
        <v-card dark color="#4d4c4b">
          <v-card-title dark @click="$emit('events')"> Sign In </v-card-title>
          <v-divider></v-divider>
          <div class="pa-6" >
            <label for="email" class="signInLabels" @click="consoleme"
              >Email</label
            >
            <v-text-field            
              style="padding-top: 0px !important"
              label="masquerena@protonmail.com"
              solo
              dense
              :class="{ shake: animated1 }"
              name="email"
              v-model="email"
            ></v-text-field>

            <label for="email" class="signInLabels">Password</label>
            <v-text-field
              style="padding-top: 0px !important"
              v-model="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Password"
              solo
              dense
              :class="{ shake: animated2 }"
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
              <p style="margin-bottom: 0 !important" @click="openFPModal">Forgot password?</p>
            </div>
          </div>
          <v-divider></v-divider>

          <v-card-actions style="padding-top: 1rem; flex-direction: column">
            <div>{{errorMessage}}</div>
            <v-btn color="orange" @click="login"> Login </v-btn>
          </v-card-actions>
          <div class="text-center">
            <p
              class="font-weight-medium"
              style="color: orange; padding-bottom: 12px"
            >
              Still new here? Cool, let's
              <span class="signUpLink" @click="openSignInModal"
                >sign up then</span
              >
            </p>
          </div>
        </v-card>
      </div>
    </v-dialog>
    <SignUpModal v-model="dialog2" />
    <ForgotPasswordModal v-model="dialog3"/>
  </div>
</template>

<script>
import SignUpModal from "@/components/Modals/SignUpModal.vue";
import ForgotPasswordModal from "@/components/Modals/ForgotPasswordModal.vue";

export default {
  props: {
    showModal: {
      type: Boolean,
    },
    dialog: {
      type: Boolean,
    },
    value: {},
  },
  components: {
    SignUpModal,
    ForgotPasswordModal,
  },

  data() {
    return {
      errorMessage: "",
      animated1: false,
      animated2: false,
      dialog2: false,
      dialog3: false,
      drawer: false,
      group: null,
      signInModal: false,
      email: "",
      show1: false,
      password: "",
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => `The email and password you entered don't match`,
      },
      checkbox1: false,
    };
  },
  methods: {
    consoleme() {
      console.log(this.checkbox1);
    },
    openSignInModal() {
      this.email = "";
      this.password = "";
      this.dialog2 = true;
      this.$emit("input", this.$event);
    },
     openFPModal() {
      this.email = "";
      this.password = "";
      this.dialog3 = true;
      this.$emit("input", this.$event);
    },
    async login() {
      if (this.checkbox1 === "true") {
        localStorage.setItem("email", this.email);
        localStorage.setItem("rememberMe", true);
      }
      if(!this.checkbox1) {
        localStorage.removeItem("rememberMe");
      }
      console.log(this.password)
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password
        }),
      });
      const { message, loggedIn, username } = await res.json();
      console.log(message, loggedIn);
      if (message === "User does not exist") {
        this.errorMessage = message + " 🙅";
        // Add shake to password input
        this.animated1 = true;
        setTimeout(() => {
          this.animated1 = false;
        }, 1000);
        return;
      }
      if (message === "Password is incorrect") {
        this.errorMessage = message + " 🙅";
        this.animated2 = true;
        setTimeout(() => {
          this.animated2 = false;
        }, 1000);
        return;
      }
      if (loggedIn) {
        this.password = "";
        this.$store.dispatch("user/LOGIN_USER", {
          email: this.email,
          username: username
        });
        window.localStorage.setItem("vuelo", true);
        window.localStorage.setItem("username", username);
        this.$emit("input", this.$event);
      } else {
        console.log("hi");
      }
    },
  },

  computed: {},
  mounted() {
    // if (localStorage.getItem("rememberMe") === "true") {
    //   this.email = localStorage.getItem("email");
    //   this.checkbox1 = "true";
  },
  watch: {
    checkbox1: function() {
      console.log(this.checkbox1)
    },
    // value: function (val) {
    //  if(val) {
    //    console.log("first")
    //     this.email = '';
    //     this.password = '';
    //     this.checkbox1 = false;
    //   }
    // },
    email: function () {},
    value: function (val) {
    if (localStorage.getItem("rememberMe") == "true") {
      this.email = localStorage.getItem("email");
      this.checkbox1 = "true";
    }
      else if(!val) {
         this.email = ""
         this.password = ""
      }
    }
  },
};
</script>

<style scoped>
input:-webkit-autofill {
    background-color: transparent !important;
    -webkit-box-shadow: 0 0 0 50px rgb(2, 2, 2) inset;
}
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}
@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }
  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
.appSearch {
  padding-top: 25px !important;
  flex-grow: 2;
  text-align: center;
}

.signInLabels {
  margin-top: 100px !important;
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
