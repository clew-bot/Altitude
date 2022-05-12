<template>
  <div>
      <h1>Under Construction</h1>
      <UnderCon />
      <p>We're working hard on this!</p>
  </div>
</template>

<script>

import UnderCon from "../assets/svgs/under_con.svg";
export default {
    name: 'Journal',
    components: {
        UnderCon
    },
}
</script>

<style scoped>

div {
  background-color: #a13331;
background-image: url("data:image/svg+xml,%3Csvg width='42' height='44' viewBox='0 0 42 44' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='Page-1' fill='none' fill-rule='evenodd'%3E%3Cg id='brick-wall' fill='%23959595' fill-opacity='0.4'%3E%3Cpath d='M0 0h42v44H0V0zm1 1h40v20H1V1zM0 23h20v20H0V23zm22 0h20v20H22V23z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
background-repeat: repeat;
height: 100vh;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
}

</style>