import AtomInputText from './AtomInputText.vue';
import '../../../../assets/main.css';


export default {
  title: 'Components/AtomInputText',
  component: AtomInputText,
  argTypes: {
    onBlur: { action: 'blurred' },
    onUpdateModelValue: { action: 'updated' },
  },
};

const Template = (args) => ({
  components: { AtomInputText },
  setup() {
    return { args };
  },
  template: `<AtomInputText v-bind="args" />`,
});

export const Default = Template.bind({});
Default.args = {
  id: 'input-1',
  label: 'Texto',
  modelValue: '',
  type: 'text',
  maxLength: '50',
  placeholder: 'Digite algo...',
  rules: [],
};

export const WithMaskCPF = Template.bind({});
WithMaskCPF.args = {
  id: 'input-2',
  label: 'CPF',
  modelValue: '',
  mask: 'cpf',
  type: 'text',
  maxLength: '14',
  placeholder: 'Digite seu CPF',
};

export const WithMaskCNPJ = Template.bind({});
WithMaskCNPJ.args = {
  id: 'input-3',
  label: 'CNPJ',
  modelValue: '',
  mask: 'cnpj',
  type: 'text',
  maxLength: '18',
  placeholder: 'Digite seu CNPJ',
};

export const WithMaskCelphone = Template.bind({});
WithMaskCelphone.args = {
  id: 'input-4',
  label: 'Celular',
  modelValue: '',
  mask: 'celphone',
  type: 'tel',
  maxLength: '15',
  placeholder: 'Digite seu celular',
};

export const WithError = Template.bind({});
WithError.args = {
  id: 'input-5',
  label: 'Email',
  modelValue: '',
  type: 'email',
  maxLength: '100',
  placeholder: 'Digite seu e-mail',

};

