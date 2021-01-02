export default function ({store, redirect}) {
  if (!store.state.currentUser) {
    redirect('/');
  }

  store.watch(() => store.getters.currentUser, () => {
    if (!store.getters.currentUser) {
      redirect('/');
    }
  })
}
