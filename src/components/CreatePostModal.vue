<template>
  <div>
    <v-dialog :value="value" @input="$emit('input', $event)" max-width="600">
      <v-card>
        <v-toolbar dark>Make a Post</v-toolbar>
        <v-card-text>
          
          <div class="text-editor">
            <div class="text-area" contenteditable="true" @input="handleInput">
              Hello
            </div>
          </div>
        </v-card-text>
        <v-card-actions class="justify-end">
                <v-btn text @click="dialog.value = false">Save</v-btn>
          <v-btn text @click="dialog.value = false">Close</v-btn>
        </v-card-actions>
        <button @click="consoleme">Let's see what we got</button>
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
      //replace &nbsp; with a space
      this.content = this.content.replace(/&nbsp;/g, " ");
    },
  },
};
</script>

<style>
.text-area {
  width: 100%;
  height: 100%;
  border: 1px solid rgb(213, 37, 37);
  padding: 10px;
  font-size: 14px;
  line-height: 1.5;
  resize: none;
}

.text-editor {
  height: 100px;
  width: 100%;
  border: 1px solid #ccc;
  padding: 10px;
}
</style>
