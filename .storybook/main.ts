import type { StorybookConfig } from "@storybook/nextjs";

const storybookConfig: StorybookConfig = {
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions"
  ],
  docs: {
    autodocs: true
  },
  features: {
    experimentalRSC: true
  },
  framework: {
    name: "@storybook/nextjs",
    options: {}
  },
  staticDirs: ["..\\public"],
  stories: [
    "../src/components/**/*.mdx",
    "../src/components/**/*.stories.@(ts|tsx)"
  ]
};

export default storybookConfig;
