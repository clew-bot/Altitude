<template>
    <v-btn depressed :to='"/profile/" + username'>
            <svg style="border-radius: 10px;" width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" class="full"><path d="M32 0v32h-6v-8a3.5 3.5 0 00-3.5-3.5h-13A3.5 3.5 9 006 24v8H0V0h32zM16.096 3.5H16c-3.84 0-6.956 3.601-7 8.063v.093c0 3.78 3.143 6.844 7 6.844s7-3.062 7-6.844c0-3.635-2.9-6.608-6.56-6.83a7.26 7.26 0 00-.344-.013V3.501z" fill="currentColor" fill-rule="evenodd"></path></svg>
    <div class="profileText">
        <p id="loggedAs">Logged as</p>
        <p id="username"><span>@</span>{{username}}</p>
        </div>
      </v-btn>
</template>

<script>
export default {
    name: 'ProfileButton',
    data() {
        return {
            profileUser: ""
        }
},
methods: {
     autoLogout() {
      console.log("Starting")
      setTimeout(async () => {
      try {
        console.log("Starting SetTimeout")
        const res = await fetch("/api/logout");
        const data = await res.json();
        this.$store.dispatch("user/LOGOUT_USER");
        console.log("data", data);
        window.localStorage.removeItem("vuelo");
        this.$router.push("/");
      } catch (error) {
        throw new Error(error);
      }
      }, 20000);
    },
},

    computed: {
    username() {
      const localStorage = window.localStorage.getItem("username");

      if (this.$store.state.user.username === "") {
        if (localStorage) {
          return localStorage
        } else {
          return
        }
      } else if (this.$store.state.user.loggedIn) {
        return this.$store.state.user.username;
      } else {
        return this.$store.state.user.username;
      }
    },
    }
}
</script>

<style scoped>

.profileText {
  color: black !important;
}
#username {
    font-size: 14px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;    
}
#loggedAs {
    font-size: 12px;
}

span {
    opacity: 0.6;
}
svg {
    color: rgb(21, 19, 19);
}
    .profileText {
        display: flex;
        flex-direction: column;
        color: #CECBC8;
        padding-left: 5px;
    }
    .v-application p {
        margin-bottom: 0px !important;
        max-width: 90px;
    }
    .v-btn {
        background: #f9f9f96f !important;
        text-transform: none !important;
        letter-spacing: 0px !important;
        text-align: left !important;
        padding: 20px !important;
        
    }
</style>