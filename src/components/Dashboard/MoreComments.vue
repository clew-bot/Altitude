<template>
  <v-card>
    <div class="main-container">
      <v-list two-line>
        <v-list-item-group active-class="pink--text" multiple>
          <div>
            <div class="text-container">
              <div
                data-text="Reply..."
                class="text-area"
                contenteditable="true"
                @input="handleInput"
              ></div>
              <span
                ><v-btn class="send-button" @click="submitComment"
                  ><i>Send</i></v-btn
                ></span
              >
              <v-icon
                class="reload-icon"
                @click="reloadComments"
                :class="{ spin: active }"
                >mdi-reload</v-icon
              >
            </div>
            <div v-for="comment in postComments" :key="comment._id">
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-avatar>
                  <v-img
                    :src="'/api/images/' + comment.author.profilePic"
                  ></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <div v-if="comment.author.username">
                    <v-list-item-title
                      ><h4>
                        <span class="comment-user">
                          @<i>{{ comment.author.username }}</i>
                        </span>
                      </h4></v-list-item-title
                    >

                    <v-list-item-subtitle
                      class="text--primary comment-text"
                      v-html="comment.comment"
                    ></v-list-item-subtitle>
                  </div>
                  <div v-else>
                    <h1>N/A</h1>
                  </div>
                </v-list-item-content>

                <v-list-item-action>
                  <p class="created-at">
                    {{ setCreatedAtTimes(comment.createdAt) }}
                  </p>
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
import { mapGetters } from "vuex";
import { createdAtLog } from "../../public/utils.js";
export default {
  name: "MoreComments",
  data() {
    return {
      comment: "",
      content: "",
      active: false,
    };
  },
  props: {
    post: {
      type: Object,
    },
  },
  methods: {
    test() {
      this.$store.dispatch("posts/GET_COMMENTS", this.post);
    },
    reloadComments() {
      this.active = true;
      this.$store.dispatch("posts/RERENDER_POSTCOMMENTS");
      setTimeout(() => {
        this.active = false;
      }, 1000);
      // this.active= false;
    },

    handleInput: function (e) {
      this.content = e.target.innerHTML;
      this.content = this.content.replace(/&nbsp;/g, " ");
    },

    submitComment() {
      this.$store.dispatch("posts/ADD_COMMENT", {
        post: this.post,
        comment: this.content,
      });
      setTimeout(() => {
        this.$store.dispatch("posts/RERENDER_POSTCOMMENTS");
      }, 500);
    },
    setCreatedAtTimes(times) {
      return createdAtLog(times);
    },
  },
  created() {
    this.test();
  },
  computed: {
    ...mapGetters("posts", ["postComments"]),
  },
};
</script>

<style scoped>

.comment-text {
  font-size: .8rem;
  font-weight: 400;
  letter-spacing: -.3px;
  padding-top: 10px;
}
.comment-user {
  background: rgb(255, 251, 0);
  padding: 2px;
  border-radius: 10px 0px 8px 0px !important;
}

@media screen and (max-width: 510px) {
  .reload-icon {
    display: none;
  }
}

.v-list {
  background: inherit !important;
}
.spin {
  animation: rotate 1s infinite;
}
.reload-icon {
  border-radius: 50%;
  color: black !important;
  position: absolute;
  top: 10px;
  right: 10px;
}

.reload-icon:hover {
  color: rgb(212, 204, 204) !important;
  cursor: pointer;
}
.created-at {
  font-size: 0.7rem !important;
  color: #2c3031;
  font-weight: bolder;
}
.send-button {
  margin-left: 10px;
  padding: 1.4rem !important;
  background: rgba(17, 31, 5, 0.866) !important;
  color: rgb(224, 224, 234);
  font-weight: bolder;
}

.text-container {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

[contentEditable="true"]:empty:not(:focus):before {
  content: attr(data-text);
  display: flex;
  align-items: center;
  justify-content: left;
  font-size: 1rem;
  opacity: 0.2;
  padding-left: 10px;
}
div:focus {
  outline: none;
}

.text-area {
  border: solid 2px rgb(77, 74, 74) !important;
  border-radius: 15px;
  padding-left: 5px;
  max-width: 20rem;
  padding: 10px;
  flex-grow: 1;
  background: rgb(241, 241, 241);
}
.main-container {
  padding: 10px;
  overflow-y: scroll;
  max-height: 450px;
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.1);
}

.main-container:nth-child(2) {
  border: solid 2px hotpink;
}
</style>
