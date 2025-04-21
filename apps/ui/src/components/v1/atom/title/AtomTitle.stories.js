import AtomTitle from './AtomTitle.vue';

export default {
  title: 'Components/AtomTitle',
  component: AtomTitle,
  argTypes: {
    type: { control: 'select', options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] },
    bold: { control: 'boolean' },
  },
};

const Template = (args) => ({
  components: { AtomTitle },
  setup() {
    return { args };
  },
  template: `<AtomTitle v-bind="args">Texto do título</AtomTitle>`,
});

export const H1 = Template.bind({});
H1.args = {
  type: 'h1',
  bold: false,
};

export const H2 = Template.bind({});
H2.args = {
  type: 'h2',
  bold: false,
};

export const H3 = Template.bind({});
H3.args = {
  type: 'h3',
  bold: false,
};

export const BoldH1 = Template.bind({});
BoldH1.args = {
  type: 'h1',
  bold: true,
};

export const BoldH2 = Template.bind({});
BoldH2.args = {
  type: 'h2',
  bold: true,
};

export const BoldH3 = Template.bind({});
BoldH3.args = {
  type: 'h3',
  bold: true,
};
