import MoleculeFormStep from './MoleculeFormStep.vue';
import '../../../../assets/main.css';

export default {
  title: 'Components/MoleculeFormStep',
  component: MoleculeFormStep,
  argTypes: {
    step: { control: 'number' },
    title: { control: 'text' },
  },
};

const Template = (args) => ({
  components: { MoleculeFormStep },
  setup() {
    return { args };
  },
  template: `
    <MoleculeFormStep v-bind="args">
      <template #actions>
        <button>Action Button</button>
      </template>
    </MoleculeFormStep>
  `,
});

export const DefaultCard = Template.bind({});
DefaultCard.args = {
  step: 1,
  title: 'MoleculeFormStep Title',
};

export const CardWithCustomStep = Template.bind({});
CardWithCustomStep.args = {
  step: 2,
  title: 'Custom Step MoleculeFormStep',
};

export const CardWithoutActions = Template.bind({});
CardWithoutActions.args = {
  step: 3,
  title: 'MoleculeFormStep Without Actions',
};
