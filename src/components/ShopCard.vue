<template>
  <article class="card">
    <picture data-picture class="card__picture">
      <source :srcset="itemData.images.large" media="(min-width: 600px)" />
      <img
        class="card__image"
        :src="itemData.images.regular"
        :alt="itemData.name"
      />
    </picture>

    <p v-if="itemData.prices.old" class="card__sale">Sale {{ saleAmount }}</p>

    <h2 class="card__title">{{ itemData.name }}</h2>

    <p class="card__prices">
      <strong class="card__price card__price--new">{{ newPrice }}</strong>

      <del v-if="itemData.prices.old" class="card__price card__price--old">{{
        oldPrice
      }}</del>
    </p>

    <base-button
      :outline="isInTheBasket"
      @click="basketHandleClick(itemData.id)"
      class="card__button"
    >
      {{ buttonText }}
      <component :is="iconComponent" />
    </base-button>
  </article>
</template>

<script>
import BaseButton from "./UI/BaseButton.vue";
import IconPlus from "@/assets/icons/plus.svg";
import IconCheck from "@/assets/icons/check.svg";
import { mapActions } from "vuex";
import getFormattedCurrency from "@/utils/getFormattedCurrency";

export default {
  name: "ShopCard",

  components: {
    BaseButton,
    IconPlus,
    IconCheck,
  },

  data() {
    return {
      getFormattedCurrency,
    };
  },

  props: {
    itemData: {
      type: Object,
      required: true,
    },
  },

  computed: {
    isInTheBasket() {
      return this.itemData?.isInTheBasket;
    },

    buttonText() {
      return this.isInTheBasket ? "Added" : "Add to basket";
    },

    iconComponent() {
      return this.isInTheBasket ? IconCheck : IconPlus;
    },

    newPrice() {
      return getFormattedCurrency({ value: this.itemData.prices.new });
    },

    oldPrice() {
      return getFormattedCurrency({ value: this.itemData.prices.old });
    },

    saleAmount() {
      const { new: newPrice, old: oldPrice } = this.itemData.prices;
      const sale = Math.round(100 - (newPrice * 100) / oldPrice);

      return "-" + sale + "%";
    },
  },

  methods: {
    ...mapActions({
      addToBasket: "basket/addToBasket",
    }),

    basketHandleClick(productId) {
      if (this.isInTheBasket) {
        return;
      }

      this.addToBasket(productId);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/utils/toRem";

.card {
  width: 100%;
  font-size: toRem(16px);
  line-height: toRem(19px);
  position: relative;

  &__picture {
    width: 100%;
    aspect-ratio: 0.8375;
    display: flex;
  }

  &__sale {
    margin: 0;
    min-width: toRem(121px);
    position: absolute;
    top: toRem(25px);
    right: toRem(25px);
    color: var(--color-text-light);
    background-color: var(--color-warning);
    padding: toRem(12px) toRem(20px);
    box-sizing: border-box;
  }

  &__image {
    width: 100%;
    object-fit: cover;
  }

  &__title {
    margin: toRem(15px) 0 0;
    font-size: inherit;
    font-weight: 400;

    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 1;
  }

  &__prices {
    margin: toRem(5px) 0 0;
  }

  &__price {
    &--new {
      font-weight: 600;
    }

    &--old {
      position: relative;
      margin-left: toRem(10px);
      font-weight: 500;
      color: var(--color-gray-400);
      text-decoration: none;

      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: -1px;
        right: -1px;
        height: 1px;
        background-color: var(--color-text-dark);
        transform: translateY(-50%);
      }
    }
  }

  &__button {
    width: 100%;
    max-width: toRem(335px);
    margin-top: toRem(15px);
    justify-content: space-between;
    gap: toRem(20px);
  }
}
</style>
