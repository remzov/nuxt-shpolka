export default function ({store, dispatch}) {
  if (!store.state.currentUser) {
    store.dispatch('getAuthedUser');
  }
}
