
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
    dashBoardLoading(state) {
        return state.dashboardLoading;
    },
    chatRerender(state) {
        return state.chatRerender;
    }
}