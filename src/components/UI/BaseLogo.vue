<template>
  <h1 :class="logoClasses">S—Shop</h1>
</template>

<script>
export default {
  name: "BaseLogo",

  props: {
    theme: {
      type: String,
      default: "dark",
      validator: (theme) => ["dark", "light"].includes(theme),
    },
  },

  computed: {
    logoClasses() {
      return {
        logo: true,
        [`logo--theme--${this.theme}`]: true,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/utils/toRem";

.logo {
  margin: 0;
  flex-shrink: 0;
  font-weight: 600;
  font-size: toRem(24px);
  line-height: toRem(29px);
  text-transform: uppercase;

  &--theme {
    &--dark {
      color: var(--color-text-dark);
    }

    &--light {
      color: var(--color-text-light);
    }
  }
}
</style>
