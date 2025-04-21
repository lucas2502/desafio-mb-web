<template>
  <transition name="toast-fade">
    <div
      id="alert-toast"
      v-if="visible"
      class="base-toast"
      :class="`base-toast--${type}`"
      role="alert"
    >
      <span class="base-toast__message">{{ message }}</span>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "success",
    validator: (val) => ["success", "error"].includes(val),
  },
  message: {
    type: String,
    default: "",
  },
  show: {
    type: Boolean,
    default: false,
  },
});

const visible = ref(props.show);

watch(
  () => props.show,
  (val) => {
    if (val) {
      visible.value = true;
      setTimeout(() => {
        visible.value = false;
      }, 3000);
    }
  }
);
</script>

<style scoped lang="scss">
.base-toast {
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  min-width: 280px;
  padding: 16px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vt-c-white);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 9999;
  transition: all 0.3s ease;

  &--success {
    background-color: var(--vt-c-success, #38a169);
  }

  &--error {
    background-color: var(--vt-c-danger, #e53e3e);
  }

  &__message {
    flex: 1;
    color: #fff;
  }
}
</style>
