<template>
  <div class="radio-group">
    <div class="options">
      <label v-for="option in options" :key="option.value" class="option">
        <input
          type="radio"
          :name="id"
          :value="option.value"
          v-model="internalValue"
          @change="onChange"
        />
        {{ option.label }}
      </label>
    </div>

    <span v-if="errorMessage" class="error">{{ errorMessage }}</span>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  id: { type: String, required: true },
  label: String,
  modelValue: [String, Number],
  options: {
    type: Array,
    required: true, // Ex: [{ label: 'Sim', value: 'yes' }, { label: 'Não', value: 'no' }]
  },
  rules: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:modelValue"]);
const internalValue = ref(props.modelValue || "");
const errorMessage = ref("");

watch(
  () => props.modelValue,
  (newVal) => {
    internalValue.value = newVal;
  }
);

watch(internalValue, (val) => {
  emit("update:modelValue", val);
});

function onChange() {
  errorMessage.value = "";
}

function validate() {
  errorMessage.value = "";

  for (const rule of props.rules) {
    const result = rule(internalValue.value);
    if (result !== true) {
      errorMessage.value = result;
      return false;
    }
  }

  return true;
}

defineExpose({ validate });
</script>

<style scoped>
.radio-group {
  display: flex;
  flex-direction: column;
}
.options {
  display: flex;
  gap: 16px;
  margin-top: 4px;
}
.option {
  display: flex;
  align-items: center;
  gap: 4px;
}
.error {
  color: red;
  font-size: 12px;
  margin-top: 4px;
}
</style>
