<template>
<div>
  <div v-if="construction" class="construction">
      <h1>Under Construction</h1>
      <UnderCon />
      <p>We're working hard on this!</p>
  </div>
  <div v-else class="pa-12">
    <div class="postButton-container">
      <v-btn @click="showingModal" class="postButton">
        Start a Post
      </v-btn>
      </div>
      <CreatePostModal v-model="dialog"/>
      <button @click="getPosts">Get Posts</button>
  </div>
  </div>
</template>

<script>

import UnderCon from "../assets/svgs/under_con.svg";
import CreatePostModal from "@/components/CreatePostModal.vue";
export default {
    name: 'Journal',
    data() {
        return {
            construction: false,
            dialog : false
        };
    },
    components: {
        UnderCon,
        CreatePostModal
    },
    methods: {
      async getPosts() {
        const response = await fetch("/api/allPosts") 
        const data = await response.json()
        console.log(data)
      }
      ,
        showingModal() {
            this.dialog = !this.dialog;
        },
    },
}
</script>

<style scoped>

.postButton {
  padding: 102px !important;
}

.postButton-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.construction {
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