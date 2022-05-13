import moment from 'moment';
export default {
    isLoggedIn(state, user) {
        state.loggedIn = true;
        state.username = user.username
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
    },
    //Sets the users profile data
    setFindUser(state, user) {
        state.findUser = user;
        state.loadingImage = false;

    },
    //Gets 5 random users
    setRandomUsers(state, randomUsers) {
        state.otherUsers = randomUsers;
    },
    setLastLogin(state, lastLogin) {
        state.timeLastLogin = moment(lastLogin).fromNow();
    },
    setCreatedAt(state, createdAt) {
        state.timeCreated = moment().format("MMM Do YYYY", createdAt)
    },
    setNoUsername(state, noUsername) {
        state.noUsername = noUsername;
    },
    setIsThereImages(state, isThereImages) {
        state.isThereImages = isThereImages;
    },
    setLoading(state, loading) {
        state.loading = loading;
    }
}