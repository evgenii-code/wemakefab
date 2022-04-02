<template>
  <button :class="buttonClassses" v-on="$listeners">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "BaseButton",

  props: {
    outline: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    buttonClassses() {
      return {
        button: true,
        "button--theme--outline": this.outline,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/utils/toRem";

.button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 0;
  padding: toRem(19px) toRem(20px);
  min-height: toRem(61px);
  border: 1px solid transparent;
  color: var(--color-text-light);
  font: inherit;
  text-decoration: none;
  background-color: var(--color-primary);
  cursor: pointer;
  transition: var(--speed-very-fast) ease-in-out;

  &:not([disabled]):focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: toRem(3px);
  }

  &:not([disabled]):hover {
    opacity: 0.7;
  }

  &--theme {
    &--outline {
      border: 1px solid var(--color-primary);
      background-color: transparent;
      color: var(--color-primary);
    }
  }

  // Disabled button
  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
