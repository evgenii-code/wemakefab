<template>
  <button class="button-clear" v-on="$listeners">
    <slot />
  </button>
</template>

<script>
export default {
  name: "BaseButtonClear",
};
</script>

<style lang="scss" scoped>
@import "@/scss/utils/toRem";

.button-clear {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 0;
  border: none;
  cursor: pointer;
  color: inherit;
  font: inherit;
  background-color: transparent;

  &:not([disabled]):focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: toRem(3px);
  }

  &:not([disabled]):hover {
    opacity: 0.7;
  }

  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
