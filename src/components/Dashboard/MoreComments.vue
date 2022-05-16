<template>
  <v-card>
    <div class="main-container">
      <v-list two-line>
        <v-list-item-group active-class="pink--text" multiple>
          <div>
            <div v-for="comment in post.comments" :key="comment._id">
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-content>
                  <div v-if="comment.author.username">
                    <v-list-item-title
                      ><h4>
                        @{{ comment.author.username }}
                      </h4></v-list-item-title
                    >

                    <v-list-item-subtitle
                      class="text--primary"
                      v-html="comment.comment"
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
            <div
              data-text="Say something..."
              class="text-area"
              contenteditable="true"
              @input="handleInput"
        
            ></div>
            <v-btn @click="submitComment">Test</v-btn>
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
      content: "",
    };
  },
  props: {
    post: {
      type: Object,
    },
  },
  methods: {
    test() {
      console.log(this.post);
    },
    handleInput: function (e) {
      this.content = e.target.innerHTML;
      this.content = this.content.replace(/&nbsp;/g, " ");
      console.log(this.content)
    },

    submitComment() {
      console.log(this.content);
      console.log(this.post);
      this.$store.dispatch("posts/ADD_COMMENT", {
        post: this.post,
        comment: this.content,
      });
    },
  },
};
</script>

<style scoped>

.text-area {
    border: solid 2px red !important;
}
.main-container {
  padding: 10px;
}
</style>
