import FormHelper from './FormHelper';

describe('FormHelper Validation', () => {
  it('should validate if NotEmpty returns correct message for empty string', () => {
    expect(FormHelper.Validation.NotEmpty('')).toBe('Preenchimento obrigatório');
  });

  it('should validate if NotEmpty returns true for non-empty string', () => {
    expect(FormHelper.Validation.NotEmpty('Hello')).toBe(true);
  });

  it('should validate if Required returns correct message for undefined', () => {
    expect(FormHelper.Validation.Required('Field is required')(undefined)).toBe('Field is required');
  });

  it('should validate if Required returns true for non-empty value', () => {
    expect(FormHelper.Validation.Required('Field is required')('Hello')).toBe(true);
  });

  it('should validate if NoEmptySpace returns correct message for string with spaces', () => {
    expect(FormHelper.Validation.NoEmptySpace('Hello world')).toBe('Não pode conter espaço em branco');
  });

  it('should validate if ValidateCPF returns correct message for invalid CPF', () => {
    expect(FormHelper.Validation.ValidateCPF('12345678900')).toBe('Insira um CPF válido');
  });

  it('should validate if ValidateCNPJ returns correct message for invalid CNPJ', () => {
    expect(FormHelper.Validation.ValidateCNPJ('1234567890012312')).toBe('Insira um CNPJ válido');
  });

  it('should validate if ValidateEmail returns correct message for invalid email', () => {
    expect(FormHelper.Validation.ValidateEmail('invalidemail')).toBe('E-mail informado não é válido');
  });

  it('should validate if ValidatePhoneMask returns correct message for invalid phone number', () => {
    expect(FormHelper.Validation.ValidatePhoneMask('12345')).toBe('Número de celular inválido');
  });

  it('should validate if ValidateFormatDate returns correct message for invalid date format', () => {
    expect(FormHelper.Validation.ValidateFormatDate('32/13/2020')).toBe('Informe uma data válida');
  });


});
