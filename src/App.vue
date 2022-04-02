<template>
  <div id="app" class="app">
    <the-header class="app__header" />

    <main class="app__main">
      <the-shop class="app__shop" />
    </main>

    <the-footer class="app__footer" />
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";
import TheShop from "@/pages/TheShop.vue";
import TheFooter from "@/components/TheFooter.vue";

export default {
  name: "App",

  components: {
    TheHeader,
    TheShop,
    TheFooter,
  },
};
</script>

<style lang="scss">
@import "./scss/index";
@import "@/scss/utils/toRem";

.app {
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &__header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }

  &__main {
    flex-grow: 1;
  }

  &__shop {
    padding-top: toRem(calc($header-height + 81px));
    padding-bottom: toRem(118px);
  }

  &__footer {
    margin-top: auto;
  }
}
</style>
