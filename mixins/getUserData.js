export default {
  mounted() {
    if (!this.$store.state.main.currentUser && window.localStorage.getItem('currentUserId')) {
      this.$store.dispatch('main/getUserData');
    } else {
      this.$store.commit('loading/loaded');
    }
  }
}
