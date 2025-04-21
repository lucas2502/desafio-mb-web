<template>
  <button
    :id="id"
    type="button"
    @click="doClick"
    :class="[
      'base-button',
      {
        'base-button--outline': outline,
        'base-button--full-width': fullWidth,
        'base-button--disabled': disabled,
      },
    ]"
  >
    <template v-if="loading"> Carregando... </template>
    <template v-else>
      <slot></slot>
    </template>
  </button>
</template>

<script setup>
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    default: undefined,
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
  outline: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["click"]);

function doClick() {
  emit("click");
}
</script>

<style lang="scss">
.base-button {
  padding: 8px 24px;
  font-weight: 500;
  border-radius: 6px;
  font-size: 14px;
  border: 2px solid transparent;
  background-color: var(--vt-c-primary);
  color: #fff;
  cursor: pointer;
  width: 45%;

  &:hover {
    opacity: 0.9;
  }

  &--outline {
    background-color: transparent;
    border: 2px solid var(--vt-c-primary);
    color: var(--vt-c-primary);
  }
  &--full-width {
    width: 100%;
  }

  &--disabled {
    pointer-events: none !important;
    border-color: var(--vt-c-white-mute) !important;
    color: var(--vt-c-white) !important;
    background-color: var(--vt-c-white-mute) !important;
  }
}
</style>
