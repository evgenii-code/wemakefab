<template>
  <footer class="footer">
    <base-container class="footer__container">
      <base-logo class="footer__logo" theme="light" />

      <nav class="footer__navigation">
        <ul class="footer__menu">
          <li class="footer__item">
            <a href="#" class="footer__control">Copyright</a>
          </li>

          <li class="footer__item">
            <a href="#" class="footer__control">Contacts</a>
          </li>
        </ul>
      </nav>
    </base-container>
  </footer>
</template>

<script>
import BaseContainer from "./BaseContainer.vue";
import BaseLogo from "./UI/BaseLogo.vue";

export default {
  components: { BaseContainer, BaseLogo },

  name: "TheFooter",
};
</script>

<style lang="scss" scoped>
@import "@/scss/utils/toRem";

.footer {
  background-color: var(--color-primary);
  color: var(--color-text-light);
  min-height: toRem(110px);
  display: flex;
  font-weight: 500;
  font-size: toRem(18px);
  line-height: toRem(22px);

  &__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__menu {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    gap: toRem(40px);
  }

  &__item {
  }

  &__control {
    font: inherit;
    color: inherit;
    text-decoration: none;
  }
}
</style>
