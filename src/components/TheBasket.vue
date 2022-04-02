<template>
  <div class="basket">
    <div class="basket__summary">
      <h2 class="basket__title">Total</h2>

      <!-- Subtotal -->
      <div class="basket__row">
        <p class="basket__text">Subtotal:</p>
        <p class="basket__text basket__text--amount">{{ amount.subtotal }}</p>
      </div>

      <!-- Sale -->
      <div class="basket__row">
        <p class="basket__text">Sale:</p>
        <p class="basket__text basket__text--amount">{{ amount.sale }}</p>
      </div>

      <!-- Clear basket -->
      <div class="basket__row">
        <p class="basket__text">Content:</p>
        <base-button-clear @click="clearBasket" class="basket__clear"
          >Remove all</base-button-clear
        >
      </div>

      <!-- Total -->
      <div class="basket__row basket__row--total">
        <p class="basket__text">Order total:</p>
        <p class="basket__text basket__text--amount">{{ amount.total }}</p>
      </div>
    </div>

    <!-- Products list -->
    <ul v-if="productsInTheBasket.length" class="basket__items">
      <li
        class="basket__item"
        v-for="product in productsInTheBasket"
        :key="product.id"
      >
        <basket-card
          @remove="removeFromBasket"
          class="basket__card"
          :product="product"
        />
      </li>
    </ul>

    <p v-else class="basket__items basket__items--empty">Empty</p>

    <!-- Checkout button -->
    <base-button class="basket__checkout">
      Checkout
      <icon-chevron-right class="basket__arrow" />
    </base-button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import BasketCard from "./BasketCard.vue";
import BaseButtonClear from "./UI/BaseButtonClear.vue";
import BaseButton from "./UI/BaseButton.vue";
import IconChevronRight from "@/assets/icons/chevron-right.svg";
import getCheckoutValues from "@/utils/getCheckoutValues";

export default {
  name: "TheBasket",

  components: {
    BasketCard,
    BaseButtonClear,
    BaseButton,
    IconChevronRight,
  },

  data() {
    return {
      getCheckoutValues,
    };
  },

  EVENT_TYPE_NAME: "keyup",

  computed: {
    ...mapGetters({
      productsInTheBasket: "products/productsInTheBasket",
    }),

    amount() {
      return getCheckoutValues(this.productsInTheBasket);
    },
  },

  methods: {
    ...mapActions({
      clearBasket: "basket/clearBasket",
      removeFromBasket: "basket/removeFromBasket",
    }),

    close() {
      this.$emit("close");
    },

    setListeners() {
      document.addEventListener(
        this.$options.EVENT_TYPE_NAME,
        this.handleKeyDown
      );
    },

    removeListeners() {
      document.removeEventListener(
        this.$options.EVENT_TYPE_NAME,
        this.handleKeyDown
      );
    },

    handleKeyDown(event) {
      if (event?.key === "Escape") {
        this.close();
      }
    },
  },

  mounted() {
    this.setListeners();
  },

  beforeDestroy() {
    this.removeListeners();
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/config";
@import "@/scss/utils/toRem";

.basket {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--color-background);
  box-sizing: border-box;

  &__summary {
    position: relative;
    padding: toRem(20px) 0 0;
  }

  &__title {
    margin: 0 0 toRem(30px);
    font-weight: 700;
    font-size: toRem(24px);
    line-height: toRem(29px);
    text-transform: uppercase;
  }

  &__row {
    display: flex;
    justify-content: space-between;
    margin-bottom: toRem(20px);
    font-weight: 400;
    font-size: toRem(16px);
    line-height: toRem(19px);

    &:last-of-type {
      margin-bottom: 0;
    }

    &--total {
      position: relative;
      margin-top: 40px;
      font-weight: 500;
      font-size: toRem(20px);
      line-height: toRem(24px);
      padding: toRem(20px) 0;
      text-transform: capitalize;
    }
  }

  &__summary,
  &__row--total {
    &:before,
    &:after {
      position: absolute;
      left: toRem(-$container-gutter);
      right: toRem(-$basket-right-offset);
      height: 1px;
      background-color: var(--color-gray-300);
    }

    &:before {
      content: "";
      top: -1px;
    }
  }

  &__row--total {
    &:after {
      content: "";
      bottom: 0;
    }
  }

  &__text {
    margin: 0;

    &--amount {
      font-weight: 500;
    }
  }

  &__clear {
    font-weight: 500;
    text-decoration-line: underline;
  }

  &__items {
    margin: 0;
    padding: toRem(40px) 0;
    list-style: none;

    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }

    &--empty {
      text-align: center;
    }
  }

  &__item {
    margin-bottom: toRem(40px);

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  &__checkout {
    width: calc(100% + toRem($basket-right-offset) + toRem($container-gutter));
    min-height: toRem(82px);
    font-weight: 500;
    font-size: toRem(20px);
    line-height: toRem(24px);
    justify-content: space-between;
    padding: toRem(30px) toRem($basket-right-offset) toRem(30px)
      toRem($container-gutter);
    margin: auto toRem(-$basket-right-offset) 0 toRem(-$container-gutter);
  }
}
</style>
