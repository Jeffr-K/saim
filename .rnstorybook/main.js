// import type { StorybookConfig } from '@storybook/react-native';

// const main: StorybookConfig = {
//   framework: '@storybook/react-native',
//   stories: ['./stories/**/*.stories.?(ts|tsx|js|jsx)'],
//   addons: ['@storybook/addon-ondevice-controls', '@storybook/addon-ondevice-actions'],
// };

// export default main;

module.exports = {
  stories: ['./stories/**/*.stories.@(ts|tsx|js|jsx)'],
  addons: ['@storybook/addon-ondevice-actions', '@storybook/addon-ondevice-controls'],
};
