import AtomLabel from './AtomLabel.vue';

export default {
  title: 'Components/AtomLabel',
  component: AtomLabel,
  argTypes: {
    children: { control: 'text' },  // permite editar o conteúdo do slot diretamente
  },
};

const Template = (args) => ({
  components: { AtomLabel },
  setup() {
    return { args };
  },
  template: `<AtomLabel>{{ args.children }}</AtomLabel>`,
});

export const Default = Template.bind({});
Default.args = {
  children: 'Label padrão',
};

export const CustomLabel = Template.bind({});
CustomLabel.args = {
  children: 'Label Customizado',
};

export const LongLabel = Template.bind({});
LongLabel.args = {
  children: 'Este é um label com um texto mais longo para testar o comportamento com mais conteúdo.',
};

export const LabelWithSpecialCharacters = Template.bind({});
LabelWithSpecialCharacters.args = {
  children: 'Label com caracteres especiais: @, #, $, %, &',
};
