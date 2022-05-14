

export default {
    isLoggedIn(state) {
        return !!state.token;
    },
    allPosts(state) {
        return state.allPosts;
    },
    createdAtTimes(state){
        return state.createdAtTimes;
    },
    allMessages(state) {
        return state.totalMessages;
    },
    usernames(state) {
        return state.usernames;
    },
    messages(state) {
        return state.totalMessages;
    }
}