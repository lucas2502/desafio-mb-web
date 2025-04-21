<template>
  <div>
    <MoleculeFormStep :step="3" title="Senha de acesso">
      <AtomInputText
        ref="passwordlRef"
        id="input-passows"
        label="Sua senha"
        v-model="local.password"
        type="password"
        placeholder="Informe uma senha"
        :rules="[(v) => !!v || 'Campo obrigatório']"
      ></AtomInputText>

      <template #actions>
        <AtomButton id="button-back" outline @click="goBack">Voltar</AtomButton>
        <AtomButton id="button-next" @click="goNext">Continuar</AtomButton>
      </template>
    </MoleculeFormStep>
  </div>
</template>

<script setup>
import { ref } from "vue";
import AtomButton from "../../atom/button/AtomButton.vue";
import AtomInputText from "../../atom/input-text/AtomInputText.vue";
import MoleculeFormStep from "../../molecule/form-step/MoleculeFormStep.vue";
import useRegister from "@/composables/useRegister";
import Helper from "../../../../../core/helpers/Helper.js";

const { setDataByStep, getDataByStep, setStep } = useRegister();

const local = ref(getDataByStep(3));

const passwordlRef = ref(undefined);

function isValidForm() {
  const isPasswordValid = passwordlRef.value?.validate();
  return isPasswordValid;
}

async function submit() {
  const isValid = isValidForm();
  if (!isValid) {
    return;
  }
  if (Helper.isDefined(local.value.password)) {
    const data = {
      password: local.value.password,
    };

    setDataByStep({ step: 3, data });
    setStep(4);
  }
}

function goNext() {
  submit();
}

function goBack() {
  setStep(2);
}
</script>

<style scoped></style>
