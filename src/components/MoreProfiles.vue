<template>
  <div class="profile-container">
    <div v-for="profile in profiles" :key="profile._id">
    
        <v-col class="profilesCol">
          <v-card class="mx-auto" max-width="344" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="text-overline mb-4">@{{profile.username}}</div>
                <v-list-item-title class="text-h5 mb-1">
               {{profile.headline}}
                </v-list-item-title>
                <v-list-item-subtitle
                  >{{profile.bio}}</v-list-item-subtitle
                >
              </v-list-item-content>
        <div v-if="profile.profilePic">
              <v-list-item-avatar
              
                tile
                size="80"
                color="grey"
              ><img :src="'/api/images/'+profile.profilePic"  alt=""></v-list-item-avatar>
              </div>
              <div v-else>
                <v-list-item-avatar>
                  No Pic
                </v-list-item-avatar>
              </div>
            </v-list-item>

            <v-card-actions>
              <v-btn @click="getProfile" outlined rounded text>View</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

    </div>
  </div>
</template>

<script>
export default {
  name: "MoreProfiles",
  props: {
    profiles: {
      type: Array,
    },
  },
  data() {
    return {
      favoriteBooks: "",
    };
  },
  methods: {
    getProfile() {
      console.log("profiles = ", this.profiles);
    },
  },
};
</script>

<style scoped>
.profile-container {

  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
}
</style>
