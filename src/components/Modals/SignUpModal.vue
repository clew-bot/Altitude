<template>
  <div>
    <v-dialog :value="value" @input="$emit('input', $event)" width="600">
      <div>
        <v-card dark color="#4d4c4b">
          <v-card-title dark> Let's Sign Up for an Account! 😃 </v-card-title>
          <v-divider></v-divider>
          <div class="pa-2">
            <label for="email" class="signInLabels">Email Required</label>
            <v-text-field
              style="padding-top: 0px !important"
              label="masquerena@protonmail.com"
              :rules="[rules.required, rules.validEmail]"
              solo
              dense
              :class="{ shake: animated1 }"
              name="email"
              v-model="email"
            ></v-text-field>
            <label for="username" class="signInLabels">Username</label>
            <v-text-field
              style="padding-top: 0px !important"
              label="pikachu27"
              :rules="[rules.required]"
              solo
              dense
              :class="{ shake: animated1 }"
              name="username"
              v-model="username"
            ></v-text-field>

            <label for="email" class="signInLabels"
              >Choose a secure password</label
            >
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
              class=""
              @click:append="show1 = !show1"
              :class="{ shake: animated2 }"
            ></v-text-field>
            <label for="email" class="signInLabels">Confirm password</label>
            <v-text-field
              style="padding-top: 0px !important"
              v-model="passwordConfirm"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.confirmMatch]"
              :type="show2 ? 'text' : 'password'"
              name="input-10-1"
              label="Confirm Password"
              solo
              dense
              :class="{ shake: animated3 }"
              @click:append="show2 = !show2"
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
          </div>
          <v-divider></v-divider>

          <v-card-actions>
            <v-btn color="orange" @click="signUpAccount" class="center">
              Signup
            </v-btn>
          </v-card-actions>
          <div class="text-center">
            <p class="font-weight-medium" style="color: orange">
              Privacy Policy
            </p>
          </div>
        </v-card>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import router from "../../router";
export default {
  props: {
    value: {},
  },
  data() {
    return {
      email: "",
      drawer: false,
      group: null,
      show1: false,
      show2: false,
      username: "",
      password: "",
      passwordConfirm: "",
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        validEmail: (v) =>
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || "Invalid email",
        confirmMatch: (v) =>
          v === this.password || `The passwords you entered don't match`,
      },
      ex4: [
        "red",
        "indigo",
        "orange",
        "primary",
        "secondary",
        "success",
        "info",
        "warning",
        "error",
        "red darken-3",
        "indigo darken-3",
        "orange darken-3",
      ],
      animated1: false,
      animated2: false,
      animated3: false,
    };
  },

  methods: {
    matchEmail(email) {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    },

    async signUpAccount() {
      if (this.matchEmail(this.email) === null) {
        this.animated1 = true;
        setTimeout(() => {
          this.animated1 = false;
        }, 1000);
        return;
      }
      if (!this.password) {
        this.animated2 = true;
        setTimeout(() => {
          this.animated2 = false;
        }, 1000);
        return;
      }
      if (this.password !== this.passwordConfirm) {
        this.animated3 = true;
        setTimeout(() => {
          this.animated3 = false;
        }, 1000);
        return;
      }
      try {
        const response = await fetch("/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
            username: this.username,
          }),
        });
        const { message, token, loggedIn } = await response.json();
        this.$store.commit("user/setToken", token);
        console.log(message, loggedIn);
        if (loggedIn) {
          this.password = "";
          this.$store.dispatch("user/LOGIN_USER", {
            email: this.email,
            username: this.username,
          });
          window.localStorage.setItem("username", this.username);
          window.localStorage.setItem("vuelo", true);
          this.$emit("input", this.$event);
          router.push("/dashboard");
        } else {
          console.log("hi");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {},
  watch: {
    value: function (val) {
      if (localStorage.getItem("rememberMe") == "true") {
        this.email = localStorage.getItem("email");
        this.checkbox1 = "true";
      } else if (!val) {
        this.email = "";
        this.password = "";
        this.passwordConfirm = "";
        this.username = "";
      }
    },
  },
};
</script>

<style scoped>
.signInLabels {
  margin-top: 100px !important;
  padding: 26px;
  box-sizing: border-box;
}
.v-card {
  overflow-x: hidden;
}
.v-dialog {
  width: unset;
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
  box-sizing: border-box;
}

.center {
  text-align: center;
}

.bottomModalRow {
  display: flex;
  justify-content: space-between;
  align-items: center !important;
  padding: 0px 20px 12px 20px;
}
.v-application p {
  margin-bottom: 0px !important;
}

.v-card__actions {
  justify-content: center;
}

.v-input--dense {
  padding: 10px 20px 0px 20px !important;
}

.v-input--selection-controls {
  margin-top: 0 !important;
  padding-top: 0 !important;
}
</style>
