export default {
    isLoggedIn(state, user) {
        state.loggedIn = true;
        state.username = user.username
        state.user = user;
    },
    logOut(state) {
        state.loggedIn = false;
        state.user = null
    },
    setToken(state, token) {
        state.token = token;
    }
}