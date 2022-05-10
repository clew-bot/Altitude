<template>
  <v-container id="">
    <!-- <v-btn @click="checkAuth">CLICK TO TEST!</v-btn> -->
    <v-row class="text-center">
      <v-col class="mb-4 main-container">
        <h1 class="mb-3 altitude">
          <div class="a">A</div>
          <div class="b">L</div>
          <div class="c">T</div>
          <div class="d">I</div>
          <div class="e">T</div>
          <div class="f">U</div>
          <div class="g">D</div>
          <div class="h">E</div>
          <div class="shadow"></div>
          <div class="shadow-two"></div>
        </h1>
       <p></p> 
        <HappyPeople />
      </v-col>
    </v-row>

    <h2 class="text-center whoLine">We're here for change <i>(the good kind)</i></h2>
    <div class="whoRwe">
      <Friendship class="balloon" />
      <p>
        Altitude offers a unique wellness experience for men and women, by
        providing the best positive psychology .
      </p>
    </div>



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

.missionLine {
  padding-top: 50px;
    color: rgb(134, 150, 189)
}

.whoLine {
   border-top: solid 2px #cecbc8;
   padding-top: 50px;
   color: rgb(134, 189, 142)
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
.balloon {
}
.whoRwe {
  display: flex;
  border-bottom: solid 2px #cecbc8;
  
  padding: 20px 20px;
  justify-content: center;
  align-items: center;

}



.a {
  color: rgb(233, 176, 176);
  animation: bounce 1s ease-in-out
}

.b {
    color: rgb(199, 212, 149);
  animation: bounce 1s ease  .1s;
}

.c {
    color: rgb(135, 218, 157);
  animation: bounce 1s ease  .2s;
}

.d {
    color: rgb(140, 165, 211);
  animation: bounce 1s ease  .3s;
}

.e {
    color: rgb(176, 160, 222);
  animation: bounce 1s ease  .4s;
}

.f {
    color: rgb(199, 154, 196);
  animation: bounce 1s ease  .5s;
}
.g {
    color: rgb(189, 133, 156);
  animation: bounce 1s ease  .6s;
}
.h {
    color: rgb(226, 127, 127);
  animation: bounce 1s ease  .7s;
}

 @keyframes bounce {
        0%   { transform: scale(1,1) translateY(0);
                color: rgb(162, 48, 48); }
        10%  { transform: scale(1.1,.9) translateY(0); color: rgb(48, 114, 162); }
        30%  { transform: scale(.9,1.1)   translateY(-55px);}
        50%  { transform: scale(1.05,.95) translateY(0); }
        58%  { transform: scale(1,1) translateY(-7px); }
        65%  { transform: scale(1,1) translateY(0);}
        100% { transform: scale(1,1) translateY(0);}
    }
</style>
