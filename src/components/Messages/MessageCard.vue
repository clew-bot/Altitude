<template>
  <div>
      <v-card class="message-card">
      <h4>Latest Messages from : {{person}}</h4>
            <v-btn @click="consoleme">Click</v-btn>
      </v-card>

  </div>
</template>

<script>
export default {
    name: "MessagesCard",
    props: {
        person: {
            type: String,
            required: true
        }
    },
    methods: {
        consoleme() {
            console.log(this.person)
        }
    }
}
</script>

<style>
.message-card {
  padding: 10px;
  margin: 10px;
  background: white !important;
}
</style>