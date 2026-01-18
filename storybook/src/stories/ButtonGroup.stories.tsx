import ButtonGroup from "../components/buttonGroup";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { MButtonGroup } from "mdui";

const meta = {
  component: ButtonGroup,
} satisfies Meta<typeof MButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    variant: "default",
  },
};
export const Connected: Story = {
  args: {
    variant: "connected",
  },
};
