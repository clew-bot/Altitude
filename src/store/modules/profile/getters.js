export default {
    isLoggedIn(state) {
        return !!state.token;
    },
    findUser(state) {
        let user = state.findUser;
        state.loading = false;
        return user
    },
    getMoreUsers(state) {
        let otherUsers = state.otherUsers;
        return otherUsers
    },
    getLastLoggedin(state) {
        let lastLogin = state.timeLastLogin;
        return lastLogin
    },
    getCreatedAt(state) {
        let createdAt = state.timeCreated;
        return createdAt
    },
    isThereImages(state) {
        let isThereImages = state.isThereImages;
        return isThereImages
    },
    getBackgroundColor(state) {
        let backgroundColor = state.backgroundColor;
        return backgroundColor
    }
}