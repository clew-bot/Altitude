<template>
  <v-card>
 
      <div class="main-container">
      <input v-model="comment" type="text" placeholder="Reply.."><v-btn @click="submitComment">Check</v-btn>
      <v-btn @click="test">Test</v-btn>
    <v-list two-line>
      <v-list-item-group
        active-class="pink--text"
        multiple
      >

      <div>
        <div v-for="(comment) in post.comments" :key="comment._id">
                        <v-divider
          ></v-divider>
          <v-list-item>
              <v-list-item-content>
                  <div v-if="comment.author.username">
                <v-list-item-title><h4>{{comment.author.username}}</h4></v-list-item-title>

                <v-list-item-subtitle
                  class="text--primary"
                  v-text="comment.comment"
                ></v-list-item-subtitle>
                </div>
                <div v-else>
                    <h1>HIIHIHIHIHIHIHIIHHIIHIHIh</h1>
                </div>
                <!-- <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle> -->
              </v-list-item-content>

              <v-list-item-action>
                <!-- <v-list-item-action-text v-text="item.action"></v-list-item-action-text> -->




              </v-list-item-action>
              
          </v-list-item>

     
        </div>
        </div>
      </v-list-item-group>
    </v-list>
    </div>
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
            test() {
                console.log(this.post)
            },
            
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
    padding: 10px;
}

</style>