<template>
  <div
    @click="openOptionsList"
    v-click-outside="closeOptionsList"
    :class="selectClasses"
  >
    <span class="select__wrapper">
      <input
        type="text"
        v-bind="$attrs"
        @focus="openOptionsList"
        v-model="value"
        aria-controls="options-list"
        readonly
        class="select__input"
      />

      <icon-chevron-down class="select__icon" />
    </span>

    <ul id="options-list" role="region" v-if="isActive" class="select__options">
      <li
        v-for="(option, index) in options"
        :key="`options-${index}`"
        :class="[
          'select__option',
          { 'select__option--active': isOptionSelected(option) },
        ]"
        tabindex="0"
        @click.stop.prevent="setSelectedOption(option)"
        @keypress.enter="setSelectedOption(option)"
      >
        <p class="select__text">{{ option[valueKey] }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import ClickOutside from "@/directives/click-outside";
import IconChevronDown from "@/assets/icons/chevron-down.svg";

export default {
  name: "BaseSelect",

  inheritAttrs: false,

  directives: {
    ClickOutside,
  },

  components: {
    IconChevronDown,
  },

  model: {
    prop: "modelValue",
    event: "change",
  },

  props: {
    modelValue: {
      type: [Array, String, Number],
      required: true,
    },

    options: {
      type: Array,
      required: true,
    },

    valueKey: {
      type: String,
      default: "value",
    },
  },

  data() {
    return {
      isActive: false,
    };
  },

  computed: {
    selectClasses() {
      return {
        select: true,
        "select--active": this.isActive,
      };
    },

    multiple() {
      return Array.isArray(this.modelValue);
    },

    value: {
      get() {
        return this.modelValue;
      },

      set(value) {
        this.$emit("change", value);
      },
    },
  },

  methods: {
    isOptionSelected(option) {
      if (this.multiple) {
        return this.value?.includes(option);
      }

      return this.value === option[this.valueKey];
    },

    setActiveState(state) {
      this.isActive = state;
    },

    openOptionsList() {
      this.setActiveState(true);
    },

    closeOptionsList() {
      this.setActiveState(false);
    },

    getSelectedMultipleOptions(selectedOption) {
      if (this.isOptionSelected(selectedOption[this.valueKey])) {
        return this.value.filter(
          (option) => option !== selectedOption[this.valueKey]
        );
      }

      return [...this.value, selectedOption[this.valueKey]];
    },

    getValue(selectedOption) {
      if (this.multiple) {
        return this.getSelectedMultipleOptions(selectedOption);
      }

      return (this.value = selectedOption[this.valueKey]);
    },

    setSelectedOption(selectedOption) {
      this.value = this.getValue(selectedOption);

      this.closeOptionsList();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/utils/toRem";

.select {
  $padding: toRem(20px);

  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;

  &--active {
    .select__icon {
      transform: scale(1, -1);
    }
  }

  &__wrapper {
    display: flex;
    justify-content: space-between;
    background-color: var(--color-gray-100);
  }

  &__input {
    width: 100%;
    min-height: toRem(61px);
    font: inherit;
    line-height: inherit;
    color: inherit;
    cursor: pointer;
    padding: $padding;
    border: none;
    outline: none;
    background-color: transparent;
    box-sizing: border-box;
  }

  &__icon {
    min-width: 16px;
    width: 16px;
    height: 9px;
    margin-right: $padding;
    align-self: center;
    transition: transform var(--speed-very-fast) ease-in-out;
  }

  &__options {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin: 0;
    padding: 0;
    list-style: none;
    background-color: var(--color-gray-100);
    border-radius: 4px;
    z-index: 1;
  }

  &__option {
    padding: $padding;
    box-sizing: border-box;

    transition: background-color var(--speed-very-fast) ease-in-out,
      color var(--speed-very-fast) ease-in-out;

    &:hover {
      background-color: var(--color-gray-200);
      color: inherit;
    }

    &--active {
      background-color: var(--color-primary);
      color: var(--color-text-light);
    }
  }

  &__text {
    margin: 0;
  }
}
</style>
