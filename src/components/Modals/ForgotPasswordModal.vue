<template>
  <div>
    <v-dialog
      :value="value"
      @input="$emit('input', $event)"
      width="500"
    >
      <div>
        <v-card dark color="#4d4c4b">
          <v-card-title dark @click="$emit('events')">Forgot Password? </v-card-title>
          <v-divider></v-divider>
          <div class="pa-6" >
            <label for="email" class="signInLabels" @click="consoleme"
              >Enter your email</label
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
            <div class="getPWBtn">
                <p style="padding-bottom: 12px;">{{errorMessage}}</p>
                <v-btn @click="getPassword">
              Get Password
          </v-btn>
          </div>
          </div>
          <v-divider></v-divider>

          <v-card-actions style="padding-top: 1rem; flex-direction: column">
          </v-card-actions>
          <div class="text-center">
            <p
              class="font-weight-medium"
              style="color: orange; padding-bottom: 12px"
            >
              Still new here? Cool, let's
              <span class="signUpLink"
                >sign up then</span
              >
            </p>
          </div>
      
        </v-card>
      </div>
    </v-dialog>
    <SignUpModal v-model="dialog2" />
  </div>
</template>

<script>
import SignUpModal from "@/components/Modals/SignUpModal.vue";

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
  },

  data() {
    return {
      errorMessage: "",
      animated1: false,
      animated2: false,
      dialog2: false,
      drawer: false,
      group: null,
      signInModal: false,
      email: "",
      show1: false,
      password: "",
      checkbox1: false,
    };
  },
  methods: {
    consoleme() {
      console.log(this.email);
    },
    async getPassword() {
        const response = await fetch("/api/forgotPassword", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: this.email,
            }),
        });
        const {message} = await response.json();
        this.errorMessage = message;

    }
    
  },

  computed: {},
};
</script>

<style scoped>

.getPWBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

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
