export default {
    isLoggedIn(state) {
        return !!state.token;
    },
    allPosts(state) {
        return state.allPosts;
    },
    createdAtTimes(state){
        return state.createdAtTimes;
    }
}