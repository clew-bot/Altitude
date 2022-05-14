import moment from 'moment';
export default {
    setCreatedAtTimes(state, times) {
        const createdAtTimes = times.map(time => moment(time.createdAt).fromNow());
        state.createdAtTimes = createdAtTimes;
    },
    setMessages(state, messages) {
        // state.totalUnreadMessages = messages.filter(message => message.read === false);
         state.totalMessages = messages.reverse();
    },
    setUsernames(state, usernames) {
        let UniqueUsernames = [...new Set(usernames.map(username => username.from.username))];
        state.usernames = UniqueUsernames;
        console.log("Usernames", state.usernames)
    }

}