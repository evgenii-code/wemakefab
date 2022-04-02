<template>
  <header class="header">
    <base-container class="header__container">
      <base-logo class="header__logo" />

      <nav class="header__navigation">
        <ul class="header__menu">
          <li class="header__item header__item--spacer">
            <a href="#" class="header__control header__control--active"
              >Catalog</a
            >
          </li>
          <li class="header__item">
            <a href="#" class="header__control">Profile</a>
          </li>
          <li class="header__item">
            <base-button-clear @click="openBacket" :class="basketButtonClasses"
              >Basket{{ itemsInTheBasket }}</base-button-clear
            >
          </li>
        </ul>
      </nav>

      <base-overlay
        v-if="isBasketOpen"
        @click="closeBasket"
        class="header__overlay"
      />

      <the-basket
        v-trap-focus
        v-if="isBasketOpen"
        @close="closeBasket"
        class="header__basket"
      />
    </base-container>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
import BaseContainer from "./BaseContainer.vue";
import BaseLogo from "./UI/BaseLogo.vue";
import BaseOverlay from "./BaseOverlay.vue";
import TheBasket from "./TheBasket.vue";
import BaseButtonClear from "./UI/BaseButtonClear.vue";
import TrapFocus from "@/directives/trap-focus";
import setBodyScroll from "@/utils/setBodyScroll";

export default {
  components: {
    BaseContainer,
    BaseLogo,
    BaseButtonClear,
    TheBasket,
    BaseOverlay,
  },

  name: "TheHeader",

  directives: {
    TrapFocus,
  },

  data() {
    return {
      isBasketOpen: false,
    };
  },

  watch: {
    $route() {
      this.closeMobileMenu();
    },

    isBasketOpen(isBasketOpen) {
      setBodyScroll(isBasketOpen);
    },
  },

  computed: {
    ...mapGetters({
      basketCount: "basket/basketCount",
    }),

    itemsInTheBasket() {
      return `(${this.basketCount})`;
    },

    basketButtonClasses() {
      return {
        header__control: true,
        "header__control--active": this.isBasketOpen,
      };
    },
  },

  methods: {
    openBacket() {
      this.isBasketOpen = true;
    },

    closeBasket() {
      this.isBasketOpen = false;
    },

    toggleBasket() {
      this.isBasketOpen = !this.isBasketOpen;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/config";
@import "@/scss/utils/toRem";

.header {
  background-color: var(--color-background);

  &__container {
    $padding: toRem(35px);

    position: relative;
    padding-top: $padding;
    padding-bottom: $padding;
    display: flex;
    justify-content: space-between;
    min-height: toRem($header-height);
    font-size: toRem(18px);

    &:after {
      content: "";
      display: block;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      left: toRem($container-gutter);
      right: toRem($container-gutter);
      height: 1px;
      background-color: var(--color-gray-300);
    }
  }

  &__navigation {
    width: 100%;
    max-width: 74.7%;
    display: flex;
    justify-content: space-between;
    font-weight: 500;
  }

  &__menu {
    width: 100%;
    display: flex;
    justify-content: space-between;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  &__item {
    display: flex;

    &:first-of-type {
      .header__control {
        padding-left: 0;
      }
    }

    &:last-of-type {
      .header__control {
        padding-right: 0;
      }
    }

    &--spacer {
      margin-right: auto;
      z-index: 0;
    }
  }

  &__control {
    color: inherit;
    text-decoration: none;
    padding: 0 toRem(22px);
    display: flex;
    align-items: center;
    z-index: 200;

    &--active {
      color: var(--color-warning);
    }
  }

  &__basket {
    position: absolute;
    top: 100%;
    right: toRem(-($basket-right-offset - $container-gutter));
    max-width: toRem(455px);
    z-index: 100;
    max-height: 100vh;
    height: calc(var(--app-height, 100vh) - $header-height);

    transition: height var(--speed-fast) ease-in-out;

    ::v-deep [data-scroll] {
      padding: 0 toRem($basket-right-offset) 0 toRem($container-gutter);
    }

    &:before {
      content: "";
      width: 100%;
      height: toRem($header-height - 1px);
      background-color: var(--color-background);
      position: absolute;
      top: toRem(-$header-height);
      right: 0;
      border-bottom: 1px solid var(--color-gray-300);
    }
  }

  @media screen and (max-width: 580px) {
    &__container {
      $padding: toRem(20px);

      padding-top: $padding;
      padding-bottom: $padding;
      flex-direction: column;
      gap: toRem(12px);
      font-size: toRem(16px);

      &:after {
        bottom: -1px;
      }
    }

    &__navigation {
      max-width: 100%;
    }

    &__item {
      &--spacer {
        margin-right: unset;
      }
    }

    &__overlay {
      background-color: transparent;
    }

    &__basket {
      position: fixed;
      top: toRem($header-height);
      right: 0;
      left: 0;
      max-width: unset;
      border-top: 1px solid var(--color-gray-300);

      ::v-deep [data-scroll] {
        margin: 0;
        padding: 0 toRem($container-gutter) 0 toRem($container-gutter);
      }

      &:before {
        content: unset;
      }
    }
  }

  @media screen and (max-width: 378px) {
    &__control {
      padding: 0;
    }
  }
}
</style>
