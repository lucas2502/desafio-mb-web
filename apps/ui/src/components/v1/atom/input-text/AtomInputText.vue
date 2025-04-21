<template>
  <div class="input">
    <AtomLabel v-if="props.label">
      {{ props.label || "\u00A0" }}
    </AtomLabel>
    <input
      :id="props.id"
      ref="inputRef"
      v-model="internalValue"
      :model-value="props.modelValue"
      :mask="props.mask"
      :type="props.type"
      :maxlength="maxLength"
      dense
      :class="['input', { 'input-error': errorMessage }]"
      :rules="props.rules"
      :placeholder="props.placeholder"
      @input="handleInput"
      @blur="handleBlur"
    />
    <span v-if="errorMessage" class="error">{{ errorMessage }}</span>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import AtomLabel from "../label/AtomLabel.vue";
import Helper from "../../../../../core/helpers/Helper";
import FormatHelper from "../../../../../core/helpers/FormatHelper";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  label: String,
  modelValue: [String, Number],
  type: {
    type: String, // 'text' | 'password' | 'email' | 'tel'  | 'date'
    default: "text",
  },
  mask: String, // 'cpf' | 'cnpj' | 'celphone'
  maxLength: { type: String, default: "50" },
  rules: {
    type: Array,
    default: () => [],
  },
  placeholder: String,
  notAllowSpecialCharactersAndAllowSpace: { type: Boolean, default: false },
  notAllowSpecialCharactersAndSpace: { type: Boolean, default: false },
  allowSpecialCharacters: { type: Boolean, default: false },
  allowNameString: { type: Boolean, default: false },
  error: Boolean,
});

const emit = defineEmits(["update:modelValue", "blur"]);

const inputRef = ref();
const internalValue = ref(props.modelValue || "");
const errorMessage = ref();

watch(
  () => props.modelValue,
  (newVal) => {
    internalValue.value = newVal || "";
    formatValue();
  }
);

watch(internalValue, (newVal) => {
  emit("update:modelValue", newVal);
});

function handleBlur(event) {
  emit("blur", event);
}

function handleInput() {
  if (errorMessage) errorMessage.value = undefined;
}

function formatValue() {
  let formattedValue = internalValue.value;
  if (
    props.notAllowSpecialCharactersAndAllowSpace &&
    Helper.isDefined(formattedValue)
  ) {
    formattedValue = Helper.removeSpecialCharsFromString(
      String(formattedValue)
    );
  }
  if (
    props.notAllowSpecialCharactersAndSpace &&
    Helper.isDefined(formattedValue)
  ) {
    formattedValue = Helper.removeBlankSpaceAndSpecialCharsFromString(
      String(formattedValue)
    );
  }
  if (props.allowNameString && Helper.isDefined(formattedValue)) {
    formattedValue = Helper.allowNameFromString(String(formattedValue));
  }
  internalValue.value = formatValueWithMask(formattedValue);
}

function formatValueWithMask(value) {
  const v = String(value || "").replace(/\D/g, "");

  if (props.mask === "cpf") {
    return FormatHelper.cpf(v);
  }

  if (props.mask === "cnpj") {
    return FormatHelper.cnpj(v);
  }

  if (props.mask === "celphone") {
    return FormatHelper.celphone(v);
  }

  return value;
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

<style lang="scss">
.input {
  display: flex;
  flex-direction: column;

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input {
    width: 100%;
    padding: 8px 12px;
    border-radius: 10px;
    border: 1px solid #ccc;
    font-size: 14px;
  }
  input:focus:active {
    border: 1px solid var(--vt-c-primary);
  }
}
.error {
  font-size: 12px;
  color: red;
  margin-top: 4px;
}
</style>
