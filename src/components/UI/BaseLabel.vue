<template>
  <label class="label">
    <span v-if="isTextVisible" class="label__text">
      <slot name="text">{{ text }}</slot>
    </span>

    <slot />
  </label>
</template>

<script>
export default {
  name: "BaseLabel",

  props: {
    text: {
      type: String,
      default: "",
    },
  },

  computed: {
    isTextVisible() {
      return this.$slots.text || this.text;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/utils/toRem";

.label {
  &__text {
    display: block;
    font-weight: 500;
    margin-bottom: toRem(20px);
  }
}
</style>
