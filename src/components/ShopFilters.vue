<template>
  <form @submit.prevent="submitForm" class="filters">
    <template v-for="(field, index) in fields">
      <!-- Search Field -->
      <base-label
        :key="index"
        v-if="field.type === 'search'"
        class="filters__item"
        :text="field.label"
      >
        <base-input
          class="filters__input"
          type="search"
          v-model="filtersInit[field.filter]"
        >
          <template #postfix>
            <base-button-clear
              class="filters__clear"
              @click.prevent="clearField(field)"
            >
              <icon-cross class="filters__cross" />
            </base-button-clear>
          </template>
        </base-input>
      </base-label>

      <!-- Select Field -->
      <base-label
        v-if="field.type === 'select'"
        :key="index"
        class="filters__item"
        :text="field.label"
      >
        <base-select
          class="filters__input"
          :options="field.options"
          v-model="filtersInit[field.filter]"
        />
      </base-label>
    </template>

    <base-button>Apply</base-button>
  </form>
</template>

<script>
import BaseLabel from "./UI/BaseLabel.vue";
import BaseSelect from "./UI/BaseSelect.vue";
import BaseInput from "./UI/BaseInput.vue";
import BaseButton from "./UI/BaseButton.vue";
import BaseButtonClear from "./UI/BaseButtonClear.vue";
import IconCross from "@/assets/icons/cross.svg";

export default {
  name: "ShopFilters",

  components: {
    BaseLabel,
    BaseSelect,
    BaseInput,
    BaseButton,
    BaseButtonClear,
    IconCross,
  },

  props: {
    filters: {
      type: Object,
      required: true,
    },

    fields: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      filtersInit: { ...this.filters },
    };
  },

  methods: {
    submitForm() {
      this.$emit("update:filters", { ...this.filtersInit });
    },

    clearField(field) {
      this.filtersInit[field.filter] = "";

      this.submitForm();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/utils/toRem";

.filters {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(toRem(200px), 1fr));
  gap: toRem(20px);
  align-items: end;
  font-size: toRem(18px);

  &__clear {
    margin-right: toRem(-20px);
    padding: toRem(20px);

    svg {
      width: 12px;
      height: 12px;
    }
  }
}
</style>
