import { ref } from "vue";

const step = ref(1);
const user = ref({
  email: undefined,
  type: undefined,
  person: {
    name: undefined,
    cpf: undefined,
    dateOfbirth: undefined,
    phone: undefined,
  },
  company: {
    name: undefined,
    cnpj: undefined,
    openingDate: undefined,
    phone: undefined,
  },
  password: undefined,
});

export default function useRegister() {
  const setDataByStep = ({ step, data }) => {
    switch (step) {
      case 1:
        const { email, type } = data;
        user.value.email = email;
        user.value.type = type;
        return;
      case 2:
        if (user.value.type === "person") {
          const { name, cpf, dateOfbirth, phone } = data.person;
          user.value.person.name = name;
          user.value.person.cpf = cpf;
          user.value.person.dateOfbirth = dateOfbirth;
          user.value.person.phone = phone;
        }
        if (user.value.type === "company") {
          const { name, cnpj, openingDate, phone } = data.company;
          user.value.company.name = name;
          user.value.company.cnpj = cnpj;
          user.value.company.openingDate = openingDate;
          user.value.company.phone = phone;
        }
        return;
      case 3:
        const { password } = data;
        user.value.password = password;
        return;
      default:
        return;
    }
  };
  const getDataByStep = (step) => {
    switch (step) {
      case 1:
        return {
          email: user.value.email,
          type: user.value.type,
        };

      case 2:
        if (user.value.type === "person") {
          return user.value.person;
        }
        if (user.value.type === "company") {
          return user.value.company;
        }
        return;
      case 3:
        return {
          password: user.value.password,
        };
      default:
        return user.value;
    }
  };

  const getStep = () => {
    return step.value;
  };

  const getUserType = () => {
    return user.value.type;
  };

  const setStep = (value) => {
    step.value = value;
  };

  const resetForm = () => {
    Object.assign(user, {
      email: undefined,
      type: undefined,
      person: {
        name: undefined,
        cpf: undefined,
        dateOfbirth: undefined,
        phone: undefined,
      },
      company: {
        name: undefined,
        cnpj: undefined,
        openingDate: undefined,
        phone: undefined,
      },
      password: undefined,
    });
  };

  return {
    setStep,
    getStep,
    setDataByStep,
    getDataByStep,
    resetForm,
    getUserType,
  };
}
