<template>
           <div class="rows2">
          Users Latests Posts
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

<style>
.rows2 {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  background: rgb(46, 141, 230);
  border-radius: 10px;
}
</style>