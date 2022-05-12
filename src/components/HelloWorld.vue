<template>
  <v-container id="">
    <!-- <v-btn @click="checkAuth">CLICK TO TEST!</v-btn> -->
    <v-row class="text-center">
      <v-col class="mb-4 main-container">
        <h1 class="mb-3 altitude">
          <p class="a">A</p>
          <p class="b">L</p>
          <p class="c">T</p>
          <p class="d">I</p>
          <p class="e">T</p>
          <p class="f">U</p>
          <p class="g">D</p>
          <p class="h">E</p>
          <p class="shadow"></p>
          <p class="shadow-two"></p>
        </h1>
        <p></p>
        <HappyPeople />
      </v-col>
    </v-row>
    <v-card class="v-cardhome">
      <h2 class="text-center whoLine">
        We're here for change <i>(the good kind)</i>
      </h2>
      <div class="whoRwe">
        <Friendship class="balloon" />
        <p>
          Altitude offers a unique wellness experience for men and women, by
          providing the best positive psychology .
        </p>
      </div>
    </v-card>

    <v-card class="v-cardhome2">
      <div class="missionStatement">
        <h2 class="text-center missionLine">Mission Statement</h2>
        <div class="mission-box">
          <p class="">
            Our mission at Altitude is aligning physical and mental well-beings
            with care, thoughtfulness and understanding. <br />Altitude brings
            thoughtfulness and care to men and women delivered with
            thoughtfulness, empathy and trust
          </p>

          <PositiveA />
        </div>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import HappyPeople from "../assets/svgs/happy_people.svg";
// import HappyBalloon from "../assets/svgs/happy_balloon.svg";
import PositiveA from "../assets/svgs/positiveA.svg";
// import Flower from "../assets/svgs/flower.svg";
import Friendship from "../assets/svgs/friendship.svg";

export default {
  name: "HelloWorld",

  data: () => ({}),
  components: {
    HappyPeople,
    Friendship,
    PositiveA,
    // Flower
  },
  methods: {
    async checkAuth() {
      // console.log(this.$store.state.user.token)
      try {
        const res = await fetch("/api/auth", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.$store.state.user.token}`,
          },
        });
        const data = await res.json();
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
.v-cardhome2 {
  background-color: #e07b7b !important;
}
.v-cardhome {
  background-color: #60c490 !important;
}

@media screen and (max-width: 600px) {
  .a,
  .b,
  .c,
  .d,
  .e,
  .f,
  .g,
  .h {
    font-size: 4.8rem;
    box-shadow: none !important;
    letter-spacing: 0 !important;
    padding: 0px !important;
    padding-top: 2rem !important;
    background: none !important;
  }
}

.missionLine {
  padding-top: 50px;
  color: rgb(250, 250, 250);
  font-weight: lighter;
  font-size: 2rem;
}

.whoLine {
  /* border-top: solid 2px #cecbc8; */
  padding-top: 50px;
  color: rgb(244, 235, 235);
  font-weight: lighter;
  font-size: 2rem;
}
.altitude {
  font-weight: bold !important;
  letter-spacing: 0.6rem !important;
  font-size: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: skewY(-5deg);
}
.main-container {
  padding-top: 10%;
  height: 100vh;
}
.mission-box {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 1rem;
  padding-right: 1rem;
}
.whoRwe {
  display: flex;
  /* border-bottom: solid 2px #cecbc8; */

  padding: 20px 20px;
  justify-content: center;
  align-items: center;
}

.a {
  color: rgb(233, 176, 176);
  animation: bounce 1s ease-in-out;
  box-shadow: 0 0 0.5rem #fa0bbe;
  padding: 10px;
  cursor: default;
  background: #f4f4f4;
  -webkit-user-select: none !important; /* Safari */
  -moz-user-select: none !important; /* Firefox */
  -ms-user-select: none !important; /* IE10+/Edge */
  user-select: none !important;
}

.b {
  color: rgb(199, 212, 149);
  animation: bounce 1s ease 0.1s;
  box-shadow: 0 0 0.5rem #07a0ff;
  padding: 10px;
  cursor: default;
  background: #f4f4f4;
  -webkit-user-select: none !important; /* Safari */
  -moz-user-select: none !important; /* Firefox */
  -ms-user-select: none !important; /* IE10+/Edge */
  user-select: none !important;
}

.c {
  color: rgb(135, 218, 157);
  animation: bounce 1s ease 0.2s;
  box-shadow: 0 0 0.5rem #dcb68f;
  padding: 10px;
  cursor: default;
  background: #f4f4f4;
  -webkit-user-select: none !important; /* Safari */
  -moz-user-select: none !important; /* Firefox */
  -ms-user-select: none !important; /* IE10+/Edge */
  user-select: none !important;
}

.d {
  color: rgb(140, 165, 211);
  animation: bounce 1s ease 0.3s;
  box-shadow: 0 0 0.5rem #6de4d8;
  padding: 10px;
  cursor: default;
  background: #f4f4f4;
  -webkit-user-select: none !important; /* Safari */
  -moz-user-select: none !important; /* Firefox */
  -ms-user-select: none !important; /* IE10+/Edge */
  user-select: none !important;
}

.e {
  color: rgb(176, 160, 222);
  animation: bounce 1s ease 0.4s;
  box-shadow: 0 0 0.5rem #5da464;
  padding: 10px;
  cursor: default;
  background: #f4f4f4;
  -webkit-user-select: none !important; /* Safari */
  -moz-user-select: none !important; /* Firefox */
  -ms-user-select: none !important; /* IE10+/Edge */
  user-select: none !important;
}

.f {
  color: rgb(199, 154, 196);
  animation: bounce 1s ease 0.5s;
  box-shadow: 0 0 0.5rem #b6ba43;
  padding: 10px;
  cursor: default;
  background: #f4f4f4;
  -webkit-user-select: none !important; /* Safari */
  -moz-user-select: none !important; /* Firefox */
  -ms-user-select: none !important; /* IE10+/Edge */
  user-select: none !important;
}
.g {
  color: rgb(189, 133, 156);
  animation: bounce 1s ease 0.6s;
  box-shadow: 0 0 0.5rem #ec0404;
  padding: 10px;
  cursor: default;
  background: #f4f4f4;
  -webkit-user-select: none !important; /* Safari */
  -moz-user-select: none !important; /* Firefox */
  -ms-user-select: none !important; /* IE10+/Edge */
  user-select: none !important;
}
.h {
  color: rgb(226, 127, 127);
  animation: bounce 1s ease 0.7s;
  box-shadow: 0 0 0.5rem #ea7fdf;
  padding: 10px;
  cursor: default;
  background: #f4f4f4;
  -webkit-user-select: none !important; /* Safari */
  -moz-user-select: none !important; /* Firefox */
  -ms-user-select: none !important; /* IE10+/Edge */
  user-select: none !important;
}

@keyframes bounce {
  0% {
    transform: scale(1, 1) translateY(0);
    color: rgb(16, 13, 13);
  }
  10% {
    transform: scale(1.1, 0.9) translateY(0);
    color: rgb(13, 15, 17);
  }
  30% {
    transform: scale(0.9, 1.1) translateY(-55px);
  }
  50% {
    transform: scale(1.05, 0.95) translateY(0);
  }
  58% {
    transform: scale(1, 1) translateY(-7px);
  }
  65% {
    transform: scale(1, 1) translateY(0);
  }
  100% {
    transform: scale(1, 1) translateY(0);
  }
}

@keyframes bounce1 {
  0% {
    transform: scale(1, 1) translateY(0);
    color: rgb(162, 48, 48);
  }
  10% {
    transform: scale(1.1, 0.9) translateY(0);
    color: rgb(48, 114, 162);
  }
  30% {
    transform: scale(0.9, 1.1) translateY(-55px);
  }
  50% {
    transform: scale(1.05, 0.95) translateY(0);
  }
  58% {
    transform: scale(1, 1) translateY(-7px);
  }
  65% {
    transform: scale(1, 1) translateY(0);
  }
  100% {
    transform: scale(1, 1) translateY(0);
  }
}
</style>
