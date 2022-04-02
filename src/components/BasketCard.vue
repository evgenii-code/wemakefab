<template>
  <div class="card">
    <picture class="card__picture">
      <img
        class="card__image"
        :src="product.images.regular"
        :alt="product.name"
      />
    </picture>

    <div class="card__wrapper">
      <h3 class="card__text card__text--name">{{ product.name }}</h3>

      <p class="card__text card__text--price">{{ newPrice }}</p>

      <base-button-clear class="card__remove" @click="removeHandleClick"
        >Remove</base-button-clear
      >
    </div>
  </div>
</template>

<script>
import getFormattedCurrency from "@/utils/getFormattedCurrency";
import BaseButtonClear from "./UI/BaseButtonClear.vue";

export default {
  components: { BaseButtonClear },
  name: "BasketCard",

  props: {
    product: {
      type: Object,
      required: true,
    },
  },

  computed: {
    newPrice() {
      return getFormattedCurrency({ value: this.product.prices.new });
    },
  },

  methods: {
    removeHandleClick() {
      this.$emit("remove", this.product.id);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/utils/toRem";

.card {
  display: flex;
  font-size: toRem(16px);
  line-height: toRem(19px);

  &__picture {
    width: 100%;
    max-width: toRem(100px);
    display: flex;
    aspect-ratio: 1;
    margin-right: toRem(10px);
  }

  &__image {
    width: 100%;
    object-fit: cover;
  }

  &__wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  &__text {
    margin: 0;
    font: inherit;
    font-weight: 400;

    &--name {
      color: var(--color-gray-600);

      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      -webkit-line-clamp: 2;
    }

    &--price {
      margin-top: toRem(5px);
      font-weight: 500;
    }
  }

  &__remove {
    margin-top: auto;
    align-self: flex-start;
    text-decoration: underline;
  }
}
</style>
