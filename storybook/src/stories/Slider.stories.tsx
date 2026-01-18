import { MSlider } from "mdui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  component: MSlider,
  parameters:{
    size:['ms' , 'sm']
  }
} satisfies Meta<typeof MSlider>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    variant: "standard",
  },
};
export const Centered: Story = {
  args: {
    variant: "centered",
    orientation: "horizontal",
  },
};
