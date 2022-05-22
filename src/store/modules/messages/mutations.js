export default {
    setMessages(state, messages) {
         state.totalMessages = messages.reverse();
    },
    setUsernames(state, usernames) {
        let UniqueUsernames = [...new Set(usernames.map(username => username.from.username))];
        state.usernames = UniqueUsernames;
    },
    setLikedUsers(state, likedUsers) {
        state.likedUsers = likedUsers;
    },
    setRefreshMessages(state) {
        state.refreshMessages++;
        console.log("STATTE",state.refreshMessages);
    }

}