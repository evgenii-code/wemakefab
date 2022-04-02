export default {
  state: () => ({
    productIds: [],
  }),

  getters: {
    productIds: (state) => state.productIds,
    basketCount: (state) => state.productIds.length,
  },

  mutations: {
    removeId(state, idToRemove) {
      state.productIds = state.productIds.filter(
        (productId) => productId !== idToRemove
      );
    },

    clearBasket(state) {
      state.productIds = [];
    },

    addId(state, id) {
      state.productIds.push(id);
    },
  },

  actions: {
    removeFromBasket({ commit }, productId) {
      commit("removeId", productId);
    },

    clearBasket({ commit }) {
      commit("clearBasket");
    },

    addToBasket({ state, commit }, productId) {
      if (state.productIds.includes(productId)) {
        return;
      }

      commit("addId", productId);
    },
  },
};
