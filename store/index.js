export const state = () => ({
  loading: true,
  loginModal: false,
  currentUser: null,
  readList: []
})

export const actions = {
  async getUserData({commit, dispatch}) {
    dispatch('login', +window.localStorage.getItem('currentUserId'));
  },

  async login({commit, dispatch}, payload) {
    let users = await fetch(
      `${process.env.baseUrl}/data/users.json`
    )
    .then(res => res.json());

    let currentUser = users.find(item => item.id === payload);
    commit('login', currentUser);

    if (window.localStorage.getItem('commonReadList')) {
      dispatch('setReadList');
    } else {
      commit('loaded');
    }
  },

  async setReadList({commit}) {
    let books = await fetch(
      `${process.env.baseUrl}/data/books.json`
    )
    .then(res => res.json());

    let storagedReadList = JSON.parse(
      window.localStorage.getItem('commonReadList')
    )
      .filter(item => item.userId === +window.localStorage.getItem('currentUserId'));

    let readList = [];

    storagedReadList.forEach(item => {
      readList.push(books.find(book => book.id === item.bookId));
    })

    commit('setReadList', readList);
    commit('loaded');
  },

  async addBook({state, commit}, payload) {
    let book = await fetch(
      `${process.env.baseUrl}/data/books/${payload}.json`
    )
    .then(res => res.json());


    if (!state.readList.find(item => item.id === payload)) {
      commit('addBook', book);
    }
  },
}

export const mutations = {
  loaded(state) {
    state.loading = false;
  },

  toggleModal(state, payload) {
    state[payload.name] = payload.value
  },

  login(state, payload) {
    state.currentUser = payload;

    window.localStorage.setItem('currentUserId', payload.id);
  },

  logout(state) {
    state.currentUser = null;
    state.readList = [];

    window.localStorage.removeItem('currentUserId');
  },

  setReadList(state, payload) {
    state.readList = payload;
  },

  addBook(state, payload) {
    state.readList.push(payload);

    if (window.localStorage.getItem('commonReadList')) {
      let commonReadList = JSON.parse(window.localStorage.getItem('commonReadList'));

      commonReadList.push({
        userId: state.currentUser.id,
        bookId: payload.id
      })

      window.localStorage.setItem('commonReadList', JSON.stringify(commonReadList));
    } else {
      let commonReadList = [{
        userId: state.currentUser.id,
        bookId: payload.id
      }];

      window.localStorage.setItem('commonReadList', JSON.stringify(commonReadList));
    }
  },

  removeBook(state, payload) {
    state.readList.splice(
      state.readList.indexOf(
        state.readList.find(item => item.id === payload)
      ), 1);


    let commonReadList = JSON.parse(window.localStorage.getItem('commonReadList'));

    commonReadList.splice(
      commonReadList.indexOf(
        commonReadList.find(item => item.bookid === payload)
      ), 1);

    window.localStorage.setItem('commonReadList', JSON.stringify(commonReadList));
  }
};

export const getters = {
  currentUser: (state) => state.currentUser,
  readList: (state) => state.readList,
  loading: (state) => state.loading
}
