<template>
  <v-card>
      <div class="main-container">Hello World</div>
      <input v-model="comment" type="text" placeholder="Reply.."><v-btn @click="submitComment">Check</v-btn>
  </v-card>
</template>

<script>
export default {
        name: "MoreComments",
        data() {
            return {
                comment: "",
            };
        },
        props: {
            post: {
                type: Object,
            },
        },
        methods: {
            submitComment() {
                console.log(this.comment);
                console.log(this.post)
                this.$store.dispatch("posts/ADD_COMMENT", {
                    post: this.post,
                    comment: this.comment,
                });
            },
        },
}
</script>

<style scoped>

.main-container {
    padding: 100px;
}

</style>