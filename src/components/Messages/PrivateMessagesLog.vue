<template>
<div >
      <v-list class="main-container2" three-line v-for="message in orderedMessages" :key="message._id">
        <div>
          <v-list-item>
            <v-list-item-avatar v-if="message.from.profilePic">
              <v-img
                @click="goToProfile(message.from.username)"
                :src="'/api/images/' + message.from.profilePic"
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-avatar v-else>
              <NNKoala />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title class="users"
                >@{{ messagesToOrFrom(message) }}</v-list-item-title
              >
              <v-list-item-subtitle class="messages"
                v-html="message.message"
              ></v-list-item-subtitle>
            </v-list-item-content>
            <p class="createdAt">{{ createdAtLog(message.createdAt) }}</p>
          </v-list-item>
        </div>
      </v-list>
      </div>
</template>

<script>
import NNKoala from "../../assets/svgs/NNKoala.svg";
import { createdAtLog } from "../../public/utils";
export default {
    name: "PrivatesMessagesLog",
    components: {
        NNKoala
    },
    props: {
        orderedMessages: {
        },
    },
    data() {
        return {
            perPage: 10,
            page: 1,
        };
    },
    methods: {
            messagesToOrFrom(message) {
      // console.log(message);
      if (!message.from.username) {
        return message.to.username;
      } else {
        return message.from.username;
      }
    },
        createdAtLog(times) {
      return createdAtLog(times);
    },
    
    }

}
</script>

<style scoped>

.messages {
    -webkit-box-orient: horizontal !important;
}

.main-container2{
    background: rgba(246, 239, 241, 0.609) !important;
}

.users {
    font-weight: bold;
    color:#384141
}

.messages {
    font-size: 1rem;
    font-weight: 300;
    color: #111313 !important;
}
.createdAt {
  font-size: 0.7rem !important;
  color: rgb(41, 109, 58);
}

</style>