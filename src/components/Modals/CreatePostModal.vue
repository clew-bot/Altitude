<template>
  <div>
    <v-dialog :value="value" @input="$emit('input', $event)" max-width="600">
      <v-card>
        <v-toolbar dark> Share something 💭 
                
        </v-toolbar>

        <v-card-text>
          <div class="text-editor">
            <div data-text="Say something..." class="text-area" contenteditable="true" @input="handleInput">

            </div>
          </div>
        </v-card-text>
        <v-card-actions class="justify-end">
             <v-btn  @click="savePost">Save</v-btn>
        </v-card-actions>
        <!-- <button @click="consoleme">Let's see what we got</button> -->
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "CreatePost",
  props: {
    value: {
      type: Boolean,
    },
  },
  data() {
    return {
      content: "",
    };
  },
  methods: {
    consoleme() {
      console.log(this.content);
    },
    handleInput: function (e) {
      this.content = e.target.innerHTML;
      this.content = this.content.replace(/&nbsp;/g, " ");
    },
    savePost() {
      this.$store.dispatch("posts/SAVE_POST", this.content);
      this.$store.dispatch("posts/CHAT_RERENDER");
      this.$emit("input", false);
      this.$router.push("/dashboard");
    },
    }
};
</script>

<style scoped>
.v-toolbar__content {
  display: flex;
  flex-direction: column !;
}
.v-card {
    background: rgb(91, 91, 94) !important;
}
.text-area {
  width: 100%;
  display:inline-block;
  padding: 10px;
  font-size: 14px;
  line-height: 1.5;
  resize: none;
  border-radius: 5px !important;

}

.text-editor {
  margin-top: 20px;
  min-height: 90px;
  width: 100%;
  border: 1px solid #ccc;
  padding: 1px;
  color: black;
  background: rgb(233, 233, 233);

    border-radius: 5px !important;
}
[contentEditable=true]:empty:not(:focus):before{
    content:attr(data-text);
    display: flex;
    align-items: center;
    justify-content: left;
    font-size: 1.5rem;
    opacity: 0.2;
}
  div:focus{
        outline: none;
    }
</style>
