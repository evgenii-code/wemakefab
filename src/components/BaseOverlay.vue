<template>
  <div class="overlay" aria-hidden="true" v-on="$listeners" />
</template>

<script>
export default {
  name: "BaseOverlay",
};
</script>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--color-dark);
  opacity: 0.6;
  z-index: 100;
}
</style>
