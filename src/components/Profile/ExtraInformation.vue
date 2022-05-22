<template>
  <div class="main-container2">
    <div class="rows2">


 <div class="inner-card">
          <h1 id="favorites">My favorites</h1>
      <v-card-text
        ><span class="favorites">Favorite Books:</span> {{ extraInfo.favoriteBooks }}</v-card-text
      >
      <v-card-text
        ><span class="favorites">Favorite Foods 🧀:</span> {{ extraInfo.favoriteFood }}</v-card-text
      >
      <v-card-text
        ><span class="favorites">Favorite Music: </span>{{ extraInfo.favoriteMusic }}</v-card-text
      >
      <v-card-text
        ><span class="favorites">Favorite Hobbies:</span> {{ extraInfo.favoriteHobbies }}</v-card-text
      >
      <v-card-text
        ><span class="favorites">Favorite Movies:</span> {{ extraInfo.favoriteMovies }}</v-card-text
      >
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExtraInformation",
  props: {
    show: {
      type: Boolean,
    },
    extraInfo: {},
  },
  methods: {
    consoleme() {
      console.log(this.extraInfo);
    },
  },
};
</script>

<style scoped>

#favorites {
    text-align: left;
    font-weight: bolder;
}

.inner-card {
    padding: 2rem;
}
.main-container2 {
  display: flex;
  justify-content: center;
  align-items: center;
   
    /* padding-left: 100px;
    padding-right: 100px; */
}
.rows2 {
  margin-top: 10px;
  background: rgb(46, 141, 230);
  border-radius: 10px;
  width: 1000px;
}

.favorites {
    color: rgb(250, 255, 251);
    font-weight: bolder;
}

.v-card__text {
    word-wrap: break-word;
}
</style>
