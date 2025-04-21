export default {
  stories: [
    "../src/**/*.stories.@(js|jsx|vue)"
  ],
  framework: {
    name: "@storybook/vue3-vite",
    options: {}
  },
  docs: {
    autodocs: true
  },
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook"
  ]
};
