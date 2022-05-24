<template>
  <div class="outer">
    <div>
      <div class="text-center main-container">
        <v-icon class="like-icon" @click="reloadChat" :class="{ spin: active }"
          >mdi-reload</v-icon
        >
        <h1 class="global-chat">
          <!-- <span class="first-talk">🗣</span> -->
          <i>&nbsp;worldwide chat&nbsp;</i>

          <!-- <span>🗣</span> -->
        </h1>

        <div class="outer-bg">
          <v-btn
            class="say-something"
            @click="openPostModal"
            :class="{ isCLicked: clicked }"
            ><v-icon>mdi-forum</v-icon></v-btn
          >
        </div>
      </div>
      <CreatePostModal v-model="dialog" />
    </div>
  </div>
</template>

<script>
import CreatePostModal from "@/components/Modals/CreatePostModal.vue";
export default {
  name: "Header",
  data() {
    return {
      dialog: false,
      active: false,
      isDisabled: false,
      clicks: 0,
      timer: 10,
      clicked: false,
    };
  },
  components: {
    CreatePostModal,
  },
  methods: {
    openPostModal() {
      this.clicked = true;
      setTimeout(() => {
        this.clicked = false;
        this.dialog = !this.dialog;
      }, 350);
    },

    reloadChat() {
      this.clicks++;
      if (this.clicks >= 6) {
        console.log("hi");
        this.$toasted.show(`<h4 class="take-break"><i>Take a break</i></h4>`, {
          theme: "bubble",
          position: "top-center",
          duration: 3000,
        });
        return;
      }
      if (this.clicks === 5) {
        console.log("hittttt");
        setTimeout(() => {
          this.clicks = 0;
        }, 10000);

        return;
      } else {
        this.active = true;
        this.$store.dispatch("posts/CHAT_RERENDER");
        document.activeElement.blur();
        setTimeout(() => {
          this.active = false;
        }, 1000);
      }
    },
  },
};
</script>

<style scoped>
@media screen and (max-width: 767px) {
  .global-chat {
    font-size: 1.8rem !important;
  }

  .main-container {
    padding: 10px !important;
    flex-direction: row !important;
    height: 100px;
  }

  .outer-bg {
    margin-bottom: 40px;
      margin-right: 7%;
  }
}

.outer-bg {
  background: rgb(200, 205, 201);
  display: flex;
  justify-content: center;
  align-items: center;
  display: inline-block !important;
  border-radius: 10px;
  transform: translateY(20px);
  height: 30px;
  margin-top: 10px;
}
.isCLicked {
  animation: clickDownAndUp 0.3s ease-in-out;
}

.take-break {
  color: yellow;
}
.spin {
  animation: rotate 1s infinite;
}
.like-icon {
  position: absolute !important;
  bottom: 10px;
  right: 10px;
  border-radius: 50%;
  color: black !important;
}

.like-icon:hover {
  color: rgb(212, 204, 204) !important;
  cursor: pointer;
}




.say-something {
  border-radius: 10px;
  font-size: 16px;
  margin-top: 5px;
  transform: translateY(-1.225rem);
  text-transform: none;
  letter-spacing: 0px;
  padding: 10px !important;
  color: rgb(25, 26, 25);
  font-weight: bold;
  background: linear-gradient(
    90deg,
    rgb(191, 197, 189) 0%,
    rgb(242, 243, 241) 14.06%,
    rgb(247, 247, 247) 83.85%,
    rgb(215, 218, 214) 100%
  );
    /* background: linear-gradient(
    90deg,
    rgb(120, 179, 108) 0%,
    rgb(147, 179, 76) 14.06%,
    rgb(170, 215, 107) 83.85%,
    rgb(120, 179, 108) 100%
  ); */
}

.say-something:hover {
  transform: translateY(-1.425rem);
}

.global-chat {
  font-size: 3rem;
  letter-spacing: -1px;
  color: rgb(242, 241, 232);
  text-shadow: 3px 5px black;
  cursor: default;
  text-align: left !important;
}
.global-chat > i {
  background: rgb(36, 35, 35) !important;
  border-radius: 5px;
  font-size:2.4rem;
}

.main-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100px;
  width: 100%;
  border-radius: 10px;
}

@keyframes rotate {
  from {
    transform: rotate(-360deg);
  }
  to {
    transform: rotate(360deg);
  }
}


@keyframes clickDownAndUp {
  0% {
  }
  30% {
    transform: translateY(-0.8rem);
  }
  60% {
    /* transform: translateY(0.225px); */
  }
  100% {
  }
}
</style>
