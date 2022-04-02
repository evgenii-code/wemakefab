<template>
  <component :is="tag" class="container"><slot /></component>
</template>

<script>
export default {
  name: "BaseContainer",

  props: {
    tag: {
      type: String,
      default: "div",
      validator: (tag) => ["div", "section"].includes(tag),
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/config";
@import "@/scss/utils/toRem";

.container {
  $padding: toRem($container-gutter);
  width: 100%;
  max-width: toRem(1400px) + 2 * $padding;
  padding-left: $padding;
  padding-right: $padding;
  margin: 0 auto;
  box-sizing: border-box;
}
</style>
