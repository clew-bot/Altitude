export default {
    isLoggedIn(state, user) {
        state.loggedIn = true;
        state.user = user;
        console.log('user', user);
        console.log("Logged? ",state.loggedIn)
    },
    setToken(state, token) {
        state.token = token;
    }
}