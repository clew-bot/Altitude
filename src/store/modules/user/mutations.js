export default {
    isLoggedIn(state, user) {
        state.loggedIn = true;
        state.user = user;
        console.log('user', user);
        console.log("Logged? ",state.loggedIn)
    },
    logOut(state) {
        state.loggedIn = false;
        console.log("User is logged out, state is: ", state.loggedIn);
        state.user = null
    },
    setToken(state, token) {
        state.token = token;
    }
}