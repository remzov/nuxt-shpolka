export const state = () => ({
  loading: true,
});

export const mutations = {
  loaded(state) {
    state.loading = false;
  }
}

export const getters = {
  loading: (state) => state.loading
}
