export const state = () => ({
  loginModal: false,
})

export const mutations = {
  toggleModal(state, payload) {
    state[payload.name] = payload.value
  }
}
