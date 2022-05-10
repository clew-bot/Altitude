<template>
  <div>
      <h1 class="text-center">You seem lost</h1>
      <div class="img-container">
      <Lost class="lost-img"/>
      </div>
  </div>
</template>

<script>
import Lost from '../assets/svgs/lost.svg';
export default {
    name: 'PageNotFound',
    components: {
        Lost
    }
}
</script>

<style>
.img-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin-left: 100px;
}
.lost-img {
    width: 100vw;
    height: 100vh;
}

</style>