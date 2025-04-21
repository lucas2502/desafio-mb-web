<template>
  <div>
    <MoleculeFormStep :step="2" :title="pageTitle">
      <template v-if="userType === 'person'">
        <AtomInputText
          ref="nameRef"
          id="input-person-name"
          label="Nome"
          v-model="local.name"
          type="text"
          placeholder="Informe um nome"
          :rules="[(v) => !!v || 'Campo obrigatório']"
        ></AtomInputText>

        <AtomInputText
          ref="documentRef"
          id="input-cpf"
          label="CPF"
          v-model="local.cpf"
          type="text"
          mask="cpf"
          placeholder="Informe seu CPF"
          :rules="[
            (v) => !!v || 'Campo obrigatório',
            (v) => FormHelper.Validation.ValidateCPF(v),
          ]"
        ></AtomInputText>

        <AtomInputText
          ref="dateRef"
          id="input-date"
          label="Data de nascimento"
          v-model="local.dateOfbirth"
          type="date"
          placeholder="Informe a data"
          :rules="[(v) => !!v || 'Campo obrigatório']"
        ></AtomInputText>

        <AtomInputText
          ref="celphoneRef"
          id="input-person-phone"
          label="Telefone"
          v-model="local.phone"
          type="tel"
          mask="celphone"
          placeholder="Informe um telefone"
          :rules="[
            (v) => !!v || 'Campo obrigatório',
            (v) => FormHelper.Validation.ValidatePhoneMask(v),
          ]"
        ></AtomInputText>
      </template>

      <template v-if="userType === 'company'">
        <AtomInputText
          ref="nameRef"
          id="input-comapny-name"
          label="Razão social"
          v-model="local.name"
          type="text"
          placeholder="Informe a razão sozial"
          :rules="[(v) => !!v || 'Campo obrigatório']"
        ></AtomInputText>

        <AtomInputText
          ref="documentRef"
          id="input-cnpj"
          label="CNPJ"
          v-model="local.cnpj"
          type="text"
          mask="cnpj"
          placeholder="Informe seu CNPJ"
          :rules="[
            (v) => !!v || 'Campo obrigatório',
            (v) => FormHelper.Validation.ValidateCNPJ(v),
          ]"
        ></AtomInputText>

        <AtomInputText
          ref="dateRef"
          id="input-opening-date"
          label="Data da abertura"
          v-model="local.openingDate"
          type="date"
          placeholder="Informe a data da abertura"
        ></AtomInputText>

        <AtomInputText
          ref="celphoneRef"
          id="input-company-phone"
          label="Telefone"
          v-model="local.phone"
          type="tel"
          mask="celphone"
          placeholder="Informe um telefone"
          :rules="[
            (v) => !!v || 'Campo obrigatório',
            (v) => FormHelper.Validation.ValidatePhoneMask(v),
          ]"
        ></AtomInputText>
      </template>

      <template #actions>
        <AtomButton id="button-back" outline @click="goBack">Voltar</AtomButton>
        <AtomButton id="button-next" @click="goNext">Continuar</AtomButton>
      </template>
    </MoleculeFormStep>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import AtomButton from "../../atom/button/AtomButton.vue";
import AtomInputText from "../../atom/input-text/AtomInputText.vue";
import MoleculeFormStep from "../../molecule/form-step/MoleculeFormStep.vue";
import FormHelper from "../../../../../core/helpers/FormHelper.js";
import Helper from "../../../../../core/helpers/Helper.js";
import useRegister from "@/composables/useRegister";

const { setDataByStep, getDataByStep, setStep, getStep, getUserType } =
  useRegister();

const local = ref(getDataByStep(2));

const nameRef = ref(undefined);
const documentRef = ref(undefined);
const dateRef = ref(undefined);
const celphoneRef = ref(undefined);

const userType = computed(() => {
  return getUserType();
});

// const propsByUserType = computed(() => {
//   const userType = getUserType();
//   return userType === "person"
//     ? {
//         title: "Pessoa Física",
//         fields: {
//           name: "Nome",
//           documment: "CPF",
//           date: "Data de nascimento",
//         },
//       }
//     : {
//         title: "Pessoa Jurídica",
//         fields: {
//           name: "Razão social",
//           documment: "CNPJ",
//           date: "Data da abertura",
//         },
//       };
// });

const pageTitle = computed(() => {
  return userType.value === "person" ? "Pessoa Física" : "Pessoa Jurídica";
});

function isValidForm() {
  const isNameValid = nameRef.value?.validate();
  const isDocumentValid = documentRef.value?.validate();
  const isDateValid = dateRef.value?.validate();
  const isCelphoneValid = celphoneRef.value?.validate();

  return isNameValid && isDocumentValid && isDateValid && isCelphoneValid;
}

function handleValidation(type) {
  if (type === "person") {
    return (
      Helper.isDefined(local.value.name) &&
      Helper.isDefined(local.value.cpf) &&
      Helper.isDefined(local.value.dateOfbirth) &&
      Helper.isDefined(local.value.phone)
    );
  }
  if (type === "company") {
    return (
      Helper.isDefined(local.value.name) &&
      Helper.isDefined(local.value.cnpj) &&
      Helper.isDefined(local.value.openingDate) &&
      Helper.isDefined(local.value.phone)
    );
  }
}

async function submit() {
  const isValid = isValidForm();
  if (!isValid) {
    return;
  }
  if (handleValidation(userType.value)) {
    const data = {
      ...local.value,
    };

    setDataByStep({ step: 3, data });
    setStep(3);
  }
}

function goBack(event) {
  setStep(1);
}

function goNext(event) {
  submit();
}
</script>

<style scoped></style>
