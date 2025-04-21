import Helper from './Helper'

export default class FormHelper {
  static Validation = {
    NotEmpty(v) {
      return (typeof v === 'string' ? v.trim() !== '' : !!v) || 'Preenchimento obrigatório';
    },

    Required(text) {
      return (v) =>
        (!!v && v !== '' && v !== undefined) || (text || 'Preenchimento obrigatório');
    },

    NoEmptySpace(v) {
      return !/^.+\s.+$/g.test(v) || 'Não pode conter espaço em branco';
    },

    ValidateCPF(v) {
      return Helper.isValidCpf(v) || 'Insira um CPF válido';
    },

    ValidateCNPJ(v) {
      return Helper.isValidCnpj(v) || 'Insira um CNPJ válido';
    },

    ValidateEmail(v) {
      if (!v) return true;
      return Helper.isValidEmail(v) || 'E-mail informado não é válido';
    },

    ValidatePhoneMask(v) {
      return Helper.isValidPhone(v) ||
        'Número de celular inválido';
    },

    ValidateFormatDate(v) {
      return /^(?:0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(v) || 'Informe uma data válida';
    },

  };
}


