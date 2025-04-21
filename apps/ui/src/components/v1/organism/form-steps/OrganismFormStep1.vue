<template>
  <div>
    <MoleculeFormStep :step="1" title="Seja bem vindo(a)">
      <AtomInputText
        ref="emailRef"
        id="input-email-address"
        label="Endereço de mail"
        v-model="local.email"
        type="email"
        placeholder="Informe um e-mail"
        :rules="[
          (v) => !!v || 'Campo obrigatório',
          (v) => FormHelper.Validation.ValidateEmail(v),
        ]"
      ></AtomInputText>

      <AtomRadioButtonGroup
        ref="typeRef"
        id="input-type"
        v-model="local.type"
        :options="[
          { label: 'Pessoa fisíca', value: 'person' },
          { label: 'Pessoa jurídica', value: 'company' },
        ]"
        :rules="[(v) => !!v || 'Selecione uma opção']"
      />

      <template #actions>
        <AtomButton id="next" full-width @click="goNext">Continuar</AtomButton>
      </template>
    </MoleculeFormStep>
  </div>
</template>

<script setup>
import { ref } from "vue";
import AtomButton from "../../atom/button/AtomButton.vue";
import AtomInputText from "../../atom/input-text/AtomInputText.vue";
import AtomRadioButtonGroup from "../../atom/radio-button-group/AtomRadioButtonGroup.vue";
import MoleculeFormStep from "../../molecule/form-step/MoleculeFormStep.vue";
import FormHelper from "../../../../../core/helpers/FormHelper.js";
import Helper from "../../../../../core/helpers/Helper.js";
import useRegister from "@/composables/useRegister";

const { setDataByStep, getDataByStep, setStep } = useRegister();

const local = ref(getDataByStep(1));

const emailRef = ref(undefined);
const typeRef = ref(undefined);

function isValidForm() {
  const isEmailValid = emailRef.value?.validate();
  const isTypeValid = typeRef.value?.validate();

  return isEmailValid && isTypeValid;
}

async function submit() {
  const isValid = isValidForm();
  if (!isValid) {
    return;
  }
  if (
    Helper.isDefined(local.value.email) &&
    Helper.isDefined(local.value.type)
  ) {
    const data = {
      email: local.value.email,
      type: local.value.type,
    };

    setDataByStep({ step: 1, data });
    setStep(2);
  }
}

function goNext() {
  submit();
}
</script>

<style scoped></style>
