import { definePreview } from "@storybook/nextjs-vite";

import "../src/app/globals.css";

const preview = definePreview({
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <div className="min-w-[320px] font-sans text-content-primary">
        <Story />
      </div>
    ),
  ],
});

export default preview;
