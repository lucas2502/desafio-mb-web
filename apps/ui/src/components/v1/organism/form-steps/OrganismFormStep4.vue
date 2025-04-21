<template>
  <div>
    <MoleculeFormStep :step="4" title="Revise suas informações">
      <AtomInputText
        ref="emailRef"
        id="input-email-address"
        label="Endereço de mail"
        v-model="local.email"
        type="email"
        placeholder="Informe um e-mail"
      ></AtomInputText>

      <template v-if="local.type === 'person'">
        <AtomInputText
          ref="nameRef"
          id="input-person-name"
          label="Nome"
          v-model="local.person.name"
          type="text"
          placeholder="Informe um nome"
        ></AtomInputText>

        <AtomInputText
          ref="documentRef"
          id="input-cpf"
          label="CPF"
          v-model="local.person.cpf"
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
          v-model="local.person.dateOfbirth"
          type="date"
          placeholder="Informe a data"
        ></AtomInputText>

        <AtomInputText
          ref="celphoneRef"
          id="input-person-phone"
          label="Telefone"
          v-model="local.person.phone"
          type="tel"
          mask="celphone"
          placeholder="Informe um telefone"
          :rules="[
            (v) => !!v || 'Campo obrigatório',
            (v) => FormHelper.Validation.ValidatePhoneMask(v),
          ]"
        ></AtomInputText>
      </template>

      <template v-if="local.type === 'company'">
        <AtomInputText
          ref="nameRef"
          id="input-comapny-name"
          label="Razão social"
          v-model="local.company.name"
          type="text"
          placeholder="Informe a razão sozial"
        ></AtomInputText>

        <AtomInputText
          ref="documentRef"
          id="input-cnpj"
          label="CNPJ"
          v-model="local.company.cnpj"
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
          v-model="local.company.openingDate"
          type="date"
          placeholder="Informe a data da abertura"
        ></AtomInputText>

        <AtomInputText
          ref="celphoneRef"
          id="input-company-phone"
          label="Telefone"
          v-model="local.company.phone"
          type="tel"
          mask="celphone"
          placeholder="Informe um telefone"
          :rules="[
            (v) => !!v || 'Campo obrigatório',
            (v) => FormHelper.Validation.ValidatePhoneMask(v),
          ]"
        ></AtomInputText>
      </template>

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
        <AtomButton id="button-back" outline @click="goBack" :disabled="loading"
          >Voltar</AtomButton
        >
        <AtomButton id="button-next" @click="goNext" :loading="loading"
          >Cadastrar</AtomButton
        >
      </template>
    </MoleculeFormStep>
    <AtomAlert :message="alert.message" :type="alert.type" :show="alert.show" />
  </div>
</template>

<script setup>
import { ref, nextTick } from "vue";
import AtomButton from "../../atom/button/AtomButton.vue";
import AtomInputText from "../../atom/input-text/AtomInputText.vue";
import MoleculeFormStep from "../../molecule/form-step/MoleculeFormStep.vue";
import useRegister from "@/composables/useRegister";
import Helper from "../../../../../core/helpers/Helper.js";
import FormHelper from "../../../../../core/helpers/FormHelper.js";
import createUserUseCase from "../../../../../modules/users/use-cases/CreateUser";
import AtomAlert from "../../atom/alert/AtomAlert.vue";
import { ErrorCodeEnum } from "../../../../../core/enums/ErrorCodeEnum";

const { getDataByStep, setStep, getStep } = useRegister();

const local = ref(getDataByStep(4));
const loading = ref(false);

const alert = ref({
  message: undefined,
  type: undefined,
  show: false,
});

const emailRef = ref(undefined);
const nameRef = ref(undefined);
const documentRef = ref(undefined);
const dateRef = ref(undefined);
const celphoneRef = ref(undefined);
const passwordlRef = ref(undefined);

function isValidForm() {
  const isEmailValid = emailRef.value?.validate();
  const isNameValid = nameRef.value?.validate();
  const isDocumentValid = documentRef.value?.validate();
  const isDateValid = dateRef.value?.validate();
  const isCelphoneValid = celphoneRef.value?.validate();
  const isPasswordValid = passwordlRef.value?.validate();

  return (
    isEmailValid &&
    isNameValid &&
    isDocumentValid &&
    isDateValid &&
    isCelphoneValid &&
    isPasswordValid
  );
}

function handleValidation(type) {
  if (type === "person") {
    return (
      Helper.isDefined(local.value.person.name) &&
      Helper.isDefined(local.value.person.cpf) &&
      Helper.isDefined(local.value.person.dateOfbirth) &&
      Helper.isDefined(local.value.person.phone)
    );
  }
  if (type === "company") {
    return (
      Helper.isDefined(local.value.company.name) &&
      Helper.isDefined(local.value.company.cnpj) &&
      Helper.isDefined(local.value.company.openingDate) &&
      Helper.isDefined(local.value.company.phone)
    );
  }
}

async function submit() {
  const step = getStep();
  const isValid = isValidForm();
  if (!isValid) {
    return;
  }
  if (
    step === 4 &&
    Helper.isDefined(local.value.email) &&
    Helper.isDefined(local.value.type) &&
    Helper.isDefined(local.value.password) &&
    handleValidation(local.value.type)
  ) {
    const input = {
      email: local.value.email,
      type: local.value.type,
      person: {
        name: local.value.person.name,
        cpf: local.value.person.cpf,
        dateOfbirth: local.value.person.dateOfbirth,
        phone: local.value.person.phone,
      },
      company: {
        name: local.value.company.name,
        cnpj: local.value.company.cnpj,
        openingDate: local.value.company.openingDate,
        phone: local.value.company.phone,
      },
      password: local.value.password,
    };
    loading.value = true;
    const res = await createUserUseCase.execute(input);
    handleAlert({
      message: "Registro criado com sucesso!",
      type: "success",
    });
    loading.value = false;
    if (res.isLeft()) {
      handleAlert({
        message: "Erro ao realizar o registro!",
        type: "error",
      });
      return;
    }
  }
}

function handleAlert({ message, type }) {
  alert.value.show = false;
  nextTick(() => {
    alert.value.show = true;
    alert.value.message = message;
    alert.value.type = type;
  });
}

function goNext() {
  submit();
}

function goBack() {
  setStep(3);
}
</script>

<style scoped></style>
