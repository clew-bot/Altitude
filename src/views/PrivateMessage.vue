<template>
  <div>
      Conversation With: 
  </div>
</template>

<script>
export default {
    name: "PrivateMessage",
    data() {
        return {
            username: "",
        }
    },
    methods: {


        fetchMessagesWithUser() {
        const query = this.$router.currentRoute.params.id
        this.username = query;
        this.$store.dispatch("messages/GET_PRIVATE_MESSAGE", query);
        },
        
    },
    created() {

        this.fetchMessagesWithUser();
    },
}
</script>

<style>

</style>