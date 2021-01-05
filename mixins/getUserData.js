export default {
  mounted() {
    if (!this.$store.state.currentUser && window.localStorage.getItem('currentUserId')) {
      this.$store.dispatch('getUserData');
    } else {
      this.$store.commit('loaded');
    }
  }
}
