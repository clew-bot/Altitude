<template>
  <div class="pa-6">
    <v-card max-width="800" class="mx-auto">
      <v-toolbar color="black" dark>
        <v-toolbar-title>Chatting with {{ username }}</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon> </v-btn>
      </v-toolbar>
      <div class="text-container">
        <div
          data-text="Reply.."
          class="text-area"
          contenteditable="true"
          @input="handleInput"
        ></div>
        <div class="outer-bg">
          <v-btn
            class="say-something"
            @click="sendMessage"
            :class="{ isCLicked: clicked }"
            ><i>send</i></v-btn
          >
        </div>
      </div>
      <PrivateMessagesLog :orderedMessages="orderedMessages" :key="refreshMessages"/>
    </v-card>
    <v-pagination
      color="#3e99ad"
      circle
      v-model="page"
      :length="Math.ceil(messages.length / perPage)"
    ></v-pagination>
  </div>
</template>

<script>
import PrivateMessagesLog from '@/components/Messages/PrivateMessagesLog.vue'
import { mapGetters } from "vuex";
export default {
  name: "PrivateMessage",
  components: {
    PrivateMessagesLog
  },
  data() {
    return {
      username: "",
      page: 1,
      perPage: 10,
      pages: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      content: "",
      clicked: false,
      myUsername: localStorage.getItem("username"),
    };
  },
  methods: {
    sendMessage() {
      const query = this.$router.currentRoute.params.id;
      this.username = query;
      this.clicked = true;
      setTimeout(() => {
        this.clicked = false;
      }, 350);

      const theMessage = {
        body: this.content,
        to: this.username,
        from: this.myUsername,
      };
      if (this.content === "") {
        this.$toasted.show("message can't be blank 🤔", {
          position: "top-center",
          duration: 1000,
        });
        return;
      }
      this.$store.dispatch("messages/SEND_MESSAGE", theMessage);
      document.querySelector(".text-area").innerHTML = "";
      this.content = "";
        
      setTimeout(() => {
      this.$store.dispatch("messages/GET_PRIVATE_MESSAGE", query);
          this.$store.dispatch("messages/REFRESH_MESSAGES");
      }, 500);
    
    },

    fetchMessagesWithUser() {
      const query = this.$router.currentRoute.params.id;
      this.username = query;
      this.$store.dispatch("messages/GET_PRIVATE_MESSAGE", query);
    },

    goToProfile(username) {
      this.$router.push(`/profile/${username}`);
    },
 
    handleInput: function (e) {
      this.content = e.target.innerHTML;
      //replace &nbsp; with a space
      this.content = this.content.replace(/&nbsp;/g, " ");
    },
  },

  computed: {
    ...mapGetters("messages", ["messages", "refreshMessages"]),
    orderedMessages() {
      let copy = [...this.messages];
      copy.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      return copy.slice(
        (this.page - 1) * this.perPage,
        this.page * this.perPage
      );
    },
  },
  created() {
    this.fetchMessagesWithUser();
  },
};
</script>

<style scoped>
.outer-bg {
  background: rgb(50, 52, 50);
  display: flex;
  justify-content: center;
  align-items: center;
  display: inline-block !important;
  border-radius: 10px;
  transform: translateY(20px);
  height: 30px;
  margin-left: 8px !important;
}

.say-something {
  border-radius: 10px;
  color: rgb(227, 225, 225) !important;
  font-size: 16px;
  margin-top: 5px;
  transform: translateY(-1.225rem);
  text-transform: none;
  letter-spacing: 0px;
  padding: 10px !important;
  font-weight: bold;
  background: linear-gradient(
    90deg,
    rgb(94, 96, 93) 0%,
    rgb(74, 75, 69) 14.06%,
    rgb(76, 80, 71) 83.85%,
    rgb(96, 97, 96) 100%
  );
}
.say-something:hover {
  transform: translateY(-1.425rem);
}

.isCLicked {
  animation: clickDownAndUp 0.3s ease-in-out;
}

@keyframes clickDownAndUp {
  0% {
  }
  30% {
    transform: translateY(-0.8rem);
  }
  60% {
    /* transform: translateY(0.225px); */
  }
  100% {
  }
}

.send-button {
  display: block !important;
  background: orange !important;
}

.text-container {
  padding: 10px;
  display: flex;
}

.text-area {
  margin-top: 4px;
  width: 87%;
  display: inline-block;
  padding: 10px;
  font-size: 14px;
  line-height: 1.5;
  resize: none;
  border-radius: 5px !important;
  outline: none;
  border: solid 2px black;
}

[contentEditable="true"]:empty:not(:focus):before {
  content: attr(data-text);
  display: flex;
  align-items: center;
  justify-content: left;
  font-size: 0.88rem;
  opacity: 0.2;
}

.v-card {
  margin-top: 20px;
}

</style>
