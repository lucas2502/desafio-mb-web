import AtomButton from './AtomButton.vue';
import '../../../../assets/main.css';

export default {
  title: 'Components/AtomButton',
  component: AtomButton,
  argTypes: {
    onClick: { action: 'clicked' },
  },
};

const Template = (args) => ({
  components: { AtomButton },
  setup() {
    return { args };
  },
  template: `<AtomButton v-bind="args">{{ args.default }}</AtomButton>`,
});

export const Default = Template.bind({});
Default.args = {
  id: 'button-1',
  fullWidth: false,
  outline: false,
  loading: false,
  disabled: false,
  default: 'Clique aqui',
};

export const Loading = Template.bind({});
Loading.args = {
  id: 'button-2',
  loading: true,
  default: 'Carregando...',
};

export const Disabled = Template.bind({});
Disabled.args = {
  id: 'button-3',
  disabled: true,
  default: 'Desabilitado',
};

export const Outline = Template.bind({});
Outline.args = {
  id: 'button-4',
  outline: true,
  fullWidth: false,
  default: 'Outline',
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  id: 'button-5',
  fullWidth: true,
  outline: false,
  default: 'Full Width',
};

export const AllProps = Template.bind({});
AllProps.args = {
  id: 'button-6',
  loading: false,
  disabled: false,
  outline: true,
  fullWidth: true,
  default: 'Com tudo',
};
