<template>
<div class="main-container2">
           <div class="rows2">
          Users Latests Posts
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
    },
}
</script>

<style scoped>

.main-container2 {
    display: flex;
    justify-content: center;
    align-items: center;
}
.rows2 {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(46, 141, 230);
  border-radius: 10px;
    width: 1000px;
    padding: 100px;
}
</style>