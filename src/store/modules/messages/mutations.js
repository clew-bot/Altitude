
export default {
    setMessages(state, messages) {
         state.totalMessages = messages.reverse();
    },
    setUsernames(state, usernames) {
        let UniqueUsernames = [...new Set(usernames.map(username => username.from.username))];
        state.usernames = UniqueUsernames;
        console.log("Usernames", state.usernames)
    },
    setLikedUsers(state, likedUsers) {
        state.likedUsers = likedUsers;
    }

}