<template>

  <div class="pa-6 entire-dash">
    <div>
      <Header/>
        <v-slide-y-reverse-transition mode="out-in">
                <ChatLog :key="chatRerender"/>
        </v-slide-y-reverse-transition>
    </div>
 
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Header from "@/components/Dashboard/Header.vue";
import ChatLog from "@/components/Dashboard/ChatLog.vue";
export default {
  name: "Dashboard",
  components: {
    Header,
    ChatLog
  },
  data: () => ({
      componentKey: 0,
  }),
  methods: {
    forceRender() {
      this.componentKey++;
    }
  },
  computed: {
    ...mapGetters("posts", ["chatRerender"]),
  },
  watch: {
  },
};
</script>

<style scoped>
.entire-dash {
  padding: 20px !important;
}
</style>
