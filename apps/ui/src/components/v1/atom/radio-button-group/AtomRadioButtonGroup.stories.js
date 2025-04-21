import AtomRadioButtonGroup from './AtomRadioButtonGroup.vue';

export default {
  title: 'Components/AtomRadioButtonGroup',
  component: AtomRadioButtonGroup,
  argTypes: {
    options: { control: 'array' },
    modelValue: { control: 'select', options: [true, false, ''] },
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
    { label: 'Sim', value: true },
    { label: 'Não', value: false },
  ],
  modelValue: '',
};


export const PreselectedOption = Template.bind({});
PreselectedOption.args = {
  id: 'radio-group-3',
  label: 'Você é maior de idade?',
  options: [
    { label: 'Sim', value: true },
    { label: 'Não', value: false },
  ],
  modelValue: true,
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
