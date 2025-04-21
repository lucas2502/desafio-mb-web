import AtomAlert from './AtomAlert.vue';
import '../../../../assets/main.css';

export default {
  title: 'Components/AtomAlert',
  component: AtomAlert,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['success', 'error'],
      },
    },
    message: {
      control: 'text',
    },
    show: {
      control: 'boolean',
    },
  },
};

const Template = (args) => ({
  components: { AtomAlert },
  setup() {
    return { args };
  },
  template: `
    <AtomAlert v-bind="args" />
  `,
});

export const SuccessToast = Template.bind({});
SuccessToast.args = {
  type: 'success',
  message: 'Operação realizada com sucesso!',
  show: true,
};

export const ErrorToast = Template.bind({});
ErrorToast.args = {
  type: 'error',
  message: 'Algo deu errado!',
  show: true,
};

export const HiddenToast = Template.bind({});
HiddenToast.args = {
  type: 'success',
  message: 'Este toast está oculto.',
  show: false,  // Alterando para false para garantir que o toast não seja exibido
};
