<template>
  <span class="input">
    <input
      v-model="internalValue"
      v-bind="$attrs"
      class="input__field"
      v-on="events"
    />

    <span v-if="hasPostfix" class="input__postfix">
      <slot name="postfix" />
    </span>
  </span>
</template>

<script>
export default {
  name: "AppInput",

  inheritAttrs: false,

  model: {
    prop: "value",
    event: "input",
  },

  props: {
    value: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      internalValue: this.value,
    };
  },

  computed: {
    events() {
      return {
        ...this.$listeners,
        input: this.onInput,
      };
    },

    hasPostfix() {
      return !!this.$slots.postfix;
    },
  },

  watch: {
    value(value) {
      this.internalValue = value;
    },
  },

  methods: {
    onInput(event) {
      this.internalValue = event.target.value;

      this.$emit("input", this.internalValue);
    },
  },
};
</script>

<style lang="scss">
@import "@/scss/utils/toRem";

.input {
  $padding: toRem(20px);

  font-family: inherit;
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: var(--color-gray-100);

  &[disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &__field {
    position: relative;
    font-family: inherit;
    outline: none;
    font-size: inherit;
    color: inherit;
    width: 100%;
    border: none;
    box-sizing: border-box;
    background-color: transparent;
    resize: none;
    padding: $padding;

    &::placeholder {
      color: var(--color-gray-600);
    }

    // Reset styles for autocomplete
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-internal-autofill-selected {
      color: inherit;
      border: none;
      -webkit-text-fill-color: inherit;
      -webkit-box-shadow: 0 0 0px 1000px transparent inset;
      transition: background-color 5000s ease-in-out 0s;
    }

    &[type="search"] {
      -webkit-appearance: none;
    }

    // Delete X button for search input
    &[type="search"]::-webkit-search-decoration,
    &[type="search"]::-webkit-search-cancel-button,
    &[type="search"]::-webkit-search-results-button,
    &[type="search"]::-webkit-search-results-decoration {
      -webkit-appearance: none;
    }
  }

  &__postfix {
    display: flex;
    margin-right: $padding;
  }
}
</style>
