<template>
    <div>
      <div>

      </div>
  <HelloWorld msg="Welcome to Your Vue.js App"/>
    </div>
  

</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/Home/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
