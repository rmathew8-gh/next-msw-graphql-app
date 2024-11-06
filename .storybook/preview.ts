import type { Preview } from "@storybook/react";
import { initialize, mswLoader } from "msw-storybook-addon";

initialize();

export const loaders = [mswLoader];

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
