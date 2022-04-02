import getProducts from "@/resources/index";

export default {
  state: () => ({
    products: [],
  }),

  getters: {
    productsAll: (state, _, __, rootGetters) => {
      const productIds = rootGetters["basket/productIds"];

      return state.products.map((product) => ({
        ...product,
        isInTheBasket: productIds.includes(product.id),
      }));
    },

    productsInTheBasket: (state, _, __, rootGetters) => {
      const productIds = rootGetters["basket/productIds"];

      return state.products.filter((product) =>
        productIds.includes(product.id)
      );
    },
  },

  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
  },

  actions: {
    async loadProducts({ commit }) {
      const products = await getProducts();

      commit("setProducts", products);
    },
  },
};
