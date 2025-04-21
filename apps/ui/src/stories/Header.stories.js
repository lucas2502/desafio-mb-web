import { fn } from '@storybook/test';

import MyHeader from './Header.vue';

export default {
  title: 'Example/Header',
  component: MyHeader,
  tags: ['autodocs'],
  render: (args) => ({
    components: {
      MyHeader,
    },
    setup() {
      return {
        ...args,
      };
    },
    template: '<my-header :user="user" />',
  }),
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    onLogin: fn(),
    onLogout: fn(),
    onCreateAccount: fn(),
  },
};

export const LoggedIn = {
  args: {
    user: {
      name: 'Jane Doe',
    },
  },
};

export const LoggedOut = {
  args: {
    user: null,
  },
};
