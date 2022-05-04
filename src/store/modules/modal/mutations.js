export default {
    changeDialog(state) {
        state.dialog = !state.dialog;
        state.dialog2 = !state.dialog2;
        console.log("Dialog1 =", state.dialog)
        console.log("Dialog2 =", state.dialog)
    }
}