<template>
  <base-container tag="section" class="shop">
    <shop-filters
      v-bind:filters.sync="filters"
      :fields="fields"
      class="shop__filters"
    />

    <shop-list class="shop__products" :shop-items="filteredProducts" />
  </base-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import BaseContainer from "@/components/BaseContainer.vue";
import ShopFilters from "@/components/ShopFilters.vue";
import ShopList from "@/components/ShopList.vue";
import getFilteredProducts from "@/utils/getFilteredProducts";

export default {
  name: "TheShop",

  components: {
    BaseContainer,
    ShopFilters,
    ShopList,
  },

  data() {
    return {
      filters: {
        search: "",
        category: "Sneakers",
        sale: "All",
        sort: "Price: Low",
      },

      fields: [
        {
          type: "search",
          label: "Search",
          filter: "search",
        },

        {
          type: "select",
          label: "Product category",
          filter: "category",
          options: [
            { id: 1, value: "Sneakers" },
            { id: 3, value: "Dark" },
            { id: 4, value: "Light" },
            { id: 2, value: "Kids" },
          ],
        },

        {
          type: "select",
          label: "Sale",
          filter: "sale",
          options: [
            { id: 1, value: "Best Sales" },
            { id: 2, value: "None" },
            { id: 3, value: "All" },
          ],
        },

        {
          type: "select",
          label: "Sort",
          filter: "sort",
          options: [
            { id: 1, value: "Price: Low" },
            { id: 2, value: "Price: High" },
          ],
        },
      ],
    };
  },

  computed: {
    ...mapGetters({
      productsAll: "products/productsAll",
    }),

    filteredProducts() {
      return getFilteredProducts(this.productsAll, this.filters);
    },
  },

  methods: {
    ...mapActions({
      loadProducts: "products/loadProducts",
    }),

    handleSubmit(event) {
      console.log(event);
    },
  },

  async created() {
    await this.loadProducts();
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/utils/toRem";

.shop {
  &__products {
    margin-top: toRem(120px);
  }
}
</style>
