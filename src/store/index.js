import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import basketModule from "./basket";
import productsModule from "./products";

Vue.use(Vuex);

const basketPersistedState = createPersistedState({
  key: "basket",
  paths: ["basket.productIds"],
});

export default new Vuex.Store({
  modules: {
    products: {
      namespaced: true,
      ...productsModule,
    },
    basket: {
      namespaced: true,
      ...basketModule,
    },
  },
  plugins: [basketPersistedState],
});
