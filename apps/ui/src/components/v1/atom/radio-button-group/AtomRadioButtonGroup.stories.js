import AtomRadioButtonGroup from './AtomRadioButtonGroup.vue';

export default {
  title: 'Components/AtomRadioButtonGroup',
  component: AtomRadioButtonGroup,
  argTypes: {
    options: { control: 'array' },
    modelValue: { control: 'select', options: ['yes', 'no', ''] },
    label: { control: 'text' },
  },
};

const Template = (args) => ({
  components: { AtomRadioButtonGroup },
  setup() {
    return { args };
  },
  template: `<AtomRadioButtonGroup v-bind="args" />`,
});

export const Default = Template.bind({});
Default.args = {
  id: 'radio-group-1',
  label: 'Você gostaria de continuar?',
  options: [
    { label: 'Sim', value: 'yes' },
    { label: 'Não', value: 'no' },
  ],
  modelValue: '',
};

export const WithError = Template.bind({});
WithError.args = {
  id: 'radio-group-2',
  label: 'Escolha uma opção:',
  options: [
    { label: 'Sim', value: 'yes' },
    { label: 'Não', value: 'no' },
  ],
  modelValue: '',
  rules: [
    (value) => (value ? true : 'Você deve escolher uma opção'),
  ],
};

export const PreselectedOption = Template.bind({});
PreselectedOption.args = {
  id: 'radio-group-3',
  label: 'Você é maior de idade?',
  options: [
    { label: 'Sim', value: 'yes' },
    { label: 'Não', value: 'no' },
  ],
  modelValue: 'yes',
};

export const DisabledOptions = Template.bind({});
DisabledOptions.args = {
  id: 'radio-group-4',
  label: 'Você deseja receber atualizações?',
  options: [
    { label: 'Sim', value: 'yes', disabled: true },
    { label: 'Não', value: 'no' },
  ],
  modelValue: 'no',
};

export const MultipleOptions = Template.bind({});
MultipleOptions.args = {
  id: 'radio-group-5',
  label: 'Qual é o seu estado civil?',
  options: [
    { label: 'Solteiro(a)', value: 'single' },
    { label: 'Casado(a)', value: 'married' },
    { label: 'Divorciado(a)', value: 'divorced' },
    { label: 'Viúvo(a)', value: 'widowed' },
  ],
  modelValue: '',
};
