<template>
  <v-card>
    <div class="text-center main-container">
      <v-icon class="like-icon" @click="reloadChat" :class="{ spin: active }"
        >mdi-reload</v-icon
      >
      <h1 class="global-chat">
        <span class="first-talk">🗣</span>GLOBAL CHAT<span>🗣</span>
      </h1>


<div class="outer-bg">
      <v-btn class="say-something" @click="openPostModal" :class="{isCLicked: clicked}"><i>say something</i></v-btn>
</div>
    </div>
    <CreatePostModal v-model="dialog" />
  </v-card>
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
        this.clicked =false
      this.dialog = !this.dialog;
      }, 350);

    },
    
    reloadChat() {
      this.clicks++;
      if(this.clicks >= 6) {
          
          console.log("hi")
                this.$toasted.show(
          `<h4 class="take-break"><i>Take a break</i></h4>`,
          {
            theme: "bubble",
            position: "top-center",
            duration: 3000,
          }
        );
          return
      }
      if (this.clicks === 5) {
          console.log("hittttt")
          setTimeout(() => {
              this.clicks = 0;
          }, 10000);
  
        return
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
 .main-container {
   height: 100px;
 }
}

.outer-bg {
  background: rgb(76, 211, 108);
  display: flex; 
  justify-content: center;
  align-items: center;
  display: inline-block !important;
  border-radius:  10px;
  transform: translateY(20px);
  height: 30px;
}
.isCLicked {
  animation: clickDownAndUp 0.3s ease-in-out;
}


@keyframes clickDownAndUp{
  0%{
  }
  30%{
    transform: translateY(-.8rem);
  }
  60%{
    /* transform: translateY(0.225px); */
  }
  100%{
    
  }
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

@keyframes rotate {
  from {
    transform: rotate(-360deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* .like-icon:active {
    animation: rotate 1s infinite;
} */

.say-something {
  border-radius:  10px;
font-size: 16px;
  margin-top: 5px;
     transform: translateY(-1.225rem);
  text-transform: none;
  letter-spacing: 0px;
  padding: 10px !important;
  color: rgb(25, 26, 25);
  font-weight: bold;
  background: linear-gradient(90deg, rgb(120, 179, 108) 0%, rgb(147, 179, 76) 14.06%, rgb(170, 215, 107) 83.85%, rgb(120, 179, 108) 100%);
  
}

.say-something:hover{
  transform: translateY(-1.425rem);
}

@media screen and (max-width: 767px) {
  .global-chat {
    font-size: 1.2rem !important;
  }

  .main-container {
    padding: 10px !important;
  }
}

span {
  mix-blend-mode: screen;
}

.first-talk {
  display: inline-block;
  transform: scale(-1, 1) !important;
}

.global-chat {
  font-size: 3rem;
  letter-spacing: 4px;
  font-weight: bolder;
  color: white;
  text-shadow: 3px 5px black;
  cursor: default;
}
.main-container {
  position: relative !important;
  padding: 50px;
  color: white;
  margin-bottom: 20px;
  font-weight: lighter !important;
  background-size: cover;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask2024%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='url(%23SvgjsLinearGradient2025)'%3e%3c/rect%3e%3cpath d='M1122.84 448.2L1161.79 448.2L1161.79 487.15L1122.84 487.15z' fill='rgba(42%2c 96%2c 155%2c 0.6)'%3e%3c/path%3e%3cpath d='M-35.54 111.86 a49.75 49.75 0 1 0 99.5 0 a49.75 49.75 0 1 0 -99.5 0z' fill='rgba(80%2c 125%2c 94%2c 0.66)'%3e%3c/path%3e%3cpath d='M278.33 352.75L333.81 352.75L333.81 404.03L278.33 404.03z' fill='rgba(80%2c 125%2c 94%2c 0.66)'%3e%3c/path%3e%3cpath d='M1173.36 357.1a50.72 50.72 0 1 0 74.45 68.9z' stroke='rgba(42%2c 96%2c 155%2c 0.6)'%3e%3c/path%3e%3cpath d='M1425.39 476.93L1429.89 476.93L1429.89 481.43L1425.39 481.43z' fill='%23d3b714'%3e%3c/path%3e%3cpath d='M261.08 377.75L269.65 377.75L269.65 402.9L261.08 402.9z' fill='rgba(80%2c 125%2c 94%2c 0.66)'%3e%3c/path%3e%3cpath d='M1035.55 372.9 a39.17 39.17 0 1 0 78.34 0 a39.17 39.17 0 1 0 -78.34 0z' stroke='rgba(42%2c 96%2c 155%2c 0.6)'%3e%3c/path%3e%3cpath d='M145.23 338.27a41.57 41.57 0 1 0-26.37-78.84z' stroke='rgba(80%2c 125%2c 94%2c 0.66)'%3e%3c/path%3e%3cpath d='M3.98 239.3L33.07 239.3L33.07 247.51L3.98 247.51z' fill='rgba(42%2c 96%2c 155%2c 0.6)'%3e%3c/path%3e%3cpath d='M798.58 416.9L836.49 416.9L836.49 425.49L798.58 425.49z' stroke='%23d3b714'%3e%3c/path%3e%3cpath d='M1062.33 279.64 a52.7 52.7 0 1 0 105.4 0 a52.7 52.7 0 1 0 -105.4 0z' fill='%23d3b714'%3e%3c/path%3e%3cpath d='M714.76 201.79a39.89 39.89 0 1 0 15.49-78.27z' stroke='rgba(80%2c 125%2c 94%2c 0.66)'%3e%3c/path%3e%3cpath d='M1244.63 45.97L1293.52 45.97L1293.52 94.86L1244.63 94.86z' fill='rgba(42%2c 96%2c 155%2c 0.6)'%3e%3c/path%3e%3cpath d='M600.26 102.09 a15.64 15.64 0 1 0 31.28 0 a15.64 15.64 0 1 0 -31.28 0z' fill='rgba(42%2c 96%2c 155%2c 0.6)'%3e%3c/path%3e%3cpath d='M813.88 11.25L865.21 11.25L865.21 48.85L813.88 48.85z' fill='%23d3b714'%3e%3c/path%3e%3cpath d='M215.1 373.1 a34.32 34.32 0 1 0 68.64 0 a34.32 34.32 0 1 0 -68.64 0z' stroke='rgba(42%2c 96%2c 155%2c 0.6)'%3e%3c/path%3e%3cpath d='M636.18 236.65L650.08 236.65L650.08 250.55L636.18 250.55z' stroke='rgba(42%2c 96%2c 155%2c 0.6)'%3e%3c/path%3e%3cpath d='M1302.3 212.74L1317.46 212.74L1317.46 227.9L1302.3 227.9z' fill='%23d3b714'%3e%3c/path%3e%3cpath d='M753.62 195.33L771.93 195.33L771.93 228.41L753.62 228.41z' fill='rgba(80%2c 125%2c 94%2c 0.66)'%3e%3c/path%3e%3cpath d='M1094.45 193.22L1137.21 193.22L1137.21 235.98L1094.45 235.98z' stroke='rgba(58%2c 69%2c 187%2c 1)'%3e%3c/path%3e%3cpath d='M1362.72 233.7L1389.21 233.7L1389.21 260.19L1362.72 260.19z' stroke='rgba(58%2c 69%2c 187%2c 1)'%3e%3c/path%3e%3cpath d='M673.5 316.36 a5.74 5.74 0 1 0 11.48 0 a5.74 5.74 0 1 0 -11.48 0z' fill='rgba(80%2c 125%2c 94%2c 0.66)'%3e%3c/path%3e%3cpath d='M34.29 44.25L83.57 44.25L83.57 93.53L34.29 93.53z' stroke='%23d3b714'%3e%3c/path%3e%3cpath d='M393.28 440.31L416.95 440.31L416.95 463.98L393.28 463.98z' stroke='rgba(42%2c 96%2c 155%2c 0.6)'%3e%3c/path%3e%3cpath d='M402.14 266.63 a35.51 35.51 0 1 0 71.02 0 a35.51 35.51 0 1 0 -71.02 0z' stroke='%23d3b714'%3e%3c/path%3e%3cpath d='M454.41 18.18a30.66 30.66 0 1 0 27.52 54.8z' stroke='rgba(80%2c 125%2c 94%2c 0.66)'%3e%3c/path%3e%3cpath d='M448.3 172.25 a16.28 16.28 0 1 0 32.56 0 a16.28 16.28 0 1 0 -32.56 0z' stroke='rgba(80%2c 125%2c 94%2c 0.66)'%3e%3c/path%3e%3cpath d='M670.73 569.84a47.56 47.56 0 1 0 45-83.8z' fill='rgba(42%2c 96%2c 155%2c 0.6)'%3e%3c/path%3e%3cpath d='M1205 393.58L1223.91 393.58L1223.91 412.49L1205 412.49z' stroke='%23d3b714'%3e%3c/path%3e%3cpath d='M451.82 359.78L467.78 359.78L467.78 410.87L451.82 410.87z' stroke='rgba(80%2c 125%2c 94%2c 0.66)'%3e%3c/path%3e%3cpath d='M1197 499.75 a9.05 9.05 0 1 0 18.1 0 a9.05 9.05 0 1 0 -18.1 0z' stroke='rgba(80%2c 125%2c 94%2c 0.66)'%3e%3c/path%3e%3cpath d='M63.82 105.91L107.01 105.91L107.01 149.1L63.82 149.1z' stroke='rgba(58%2c 69%2c 187%2c 1)'%3e%3c/path%3e%3cpath d='M1364.51 99.11L1409.52 99.11L1409.52 150.89L1364.51 150.89z' stroke='rgba(58%2c 69%2c 187%2c 1)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask2024'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3clinearGradient x1='15.28%25' y1='-39.29%25' x2='84.72%25' y2='139.29%25' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient2025'%3e%3cstop stop-color='%230e2a47' offset='0'%3e%3c/stop%3e%3cstop stop-color='rgba(132%2c 101%2c 160%2c 1)' offset='1'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e");
}
</style>
