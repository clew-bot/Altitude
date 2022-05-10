<template>
  <v-container id="">
    <v-btn @click="checkAuth">CLICK TO TEST!</v-btn>
    <v-row class="text-center">
      

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Altitude
        </h1>
        <p>On a higher level</p>
        <HappyPeople/>
   
      </v-col>

   
    </v-row>
    <h1>Chat with others!</h1>
  </v-container>
</template>

<script>
import HappyPeople from "../assets/svgs/happy_people.svg";
  export default {
    name: 'HelloWorld',

    data: () => ({
     
    }),
    components: {
      HappyPeople
    },
    methods: {
      async checkAuth() {
        // console.log(this.$store.state.user.token)
        try {
        const res = await fetch("/api/auth", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.$store.state.user.token}`
          }
        })
        const data = await res.json()
        console.log(data)
        } catch (e) {
          console.log(e)
        }
      }
    }
  
  }
</script>
