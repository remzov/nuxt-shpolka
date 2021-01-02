export const state = () => ({
  loginModal: false,
  currentUser: null,
  readList: []
})

export const actions = {
  async addBook({state, commit}, payload) {
    let book = await fetch(`${process.env.baseUrl}/data/books/${payload}.json`
    )
    .then(res => res.json());

    if (!state.readList.find(item => item.id === book.id)) {
      commit('addBook', book);
    }
  }
}

export const mutations = {
  toggleModal(state, payload) {
    state[payload.name] = payload.value
  },

  login(state, payload) {
    state.currentUser = payload;
  },

  logout(state) {
    state.currentUser = null;
  },

  addBook(state, payload) {
    state.readList.push(payload);
  },

  removeBook(state, payload) {
    state.readList.splice(
      state.readList.indexOf(
        state.readList.find(item => item.id === payload)
      ), 1);
  }
};

export const getters = {
  currentUser: (state) => state.currentUser,
  readList: (state) => state.readList
}
