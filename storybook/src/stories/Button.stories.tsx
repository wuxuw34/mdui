import type { Meta, StoryObj } from "@storybook/react-vite";
import { MButton } from "mdui";

const meta = {
  component: MButton,
} satisfies Meta<typeof MButton>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    children: "Default Button",
    variant: "default",
  },
};
export const Filled: Story = {
  args: {
    children: "Filled Button",
    variant: "filled",
  },
};
export const Outline: Story = {
  args: {
    children: "Outline Button",
    variant: "outline",
  },
};
export const Text: Story = {
  args: {
    children: "Text Button",
    variant: "text",
  },
};
