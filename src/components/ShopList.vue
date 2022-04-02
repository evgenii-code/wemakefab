<template>
  <div class="shop">
    <h2 class="shop__title">
      <span class="shop__text">Bestsellers:</span>
      <span class="shop__text">{{ itemsCounter }}</span>
    </h2>

    <ul class="shop__list">
      <li class="shop__item" v-for="shopItem in shopItems" :key="shopItem.id">
        <shop-card class="shop__card" :itemData="shopItem" />
      </li>
    </ul>
  </div>
</template>

<script>
import ShopCard from "./ShopCard.vue";

export default {
  name: "ShopList",

  components: {
    ShopCard,
  },

  props: {
    shopItems: {
      type: Array,
      required: true,
    },
  },

  computed: {
    itemsCounter() {
      return this.shopItems.length;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/utils/toRem";

.shop {
  &__title {
    margin: 0;
    font-weight: 700;
    font-size: toRem(40px);
    line-height: toRem(48px);
    text-transform: uppercase;
  }

  &__text {
    display: block;
  }

  &__list {
    margin: toRem(-96px) 0 0;
    padding: 0;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(toRem(272px), 1fr));
    gap: toRem(60px) toRem(20px);
    align-items: end;
    grid-auto-flow: dense;
  }

  &__item {
    display: flex;

    &:nth-of-type(3) {
      grid-column: span 2;

      ::v-deep picture {
        aspect-ratio: 0.8835;
      }
    }
  }

  &__card {
  }

  @media screen and (max-width: 1200px) {
    &__list {
      margin: toRem(80px) 0 0;
    }

    &__item:nth-of-type(3) {
      grid-column: unset;
    }
  }

  @media screen and (max-width: 580px) {
    &__title {
      font-size: toRem(26px);
      line-height: toRem(30px);
    }
  }
}
</style>
