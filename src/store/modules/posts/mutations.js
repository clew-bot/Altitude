// import moment from 'moment';
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
    setAllPosts(state, posts) {
        state.allPosts = posts
        // console.log("POSTS",state.allPosts)
    },
    setCreatedAtTimes(state, createdAtTimes) {
        // const createdAtTimes = times.map(time => moment(time.createdAt).fromNow());
        state.createdAtTimes = createdAtTimes;
    },
    setChatRerender(state) {
        state.chatRerender++;
    },
    setComments(state, comments) {
        state.postComments = comments.reverse();
    },
    rerenderComments(state) {
        state.commentsRender++
    }
}