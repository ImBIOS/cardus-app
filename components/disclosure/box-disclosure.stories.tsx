import { Meta, Story } from "@storybook/react";
import BoxDisclosure, { BoxDisclosureProps } from "./box-disclosure";

const BoxDisclosureStory = {
  component: BoxDisclosure,
  title: "Components/Disclosure/BoxDisclosure",
} as Meta;

export default BoxDisclosureStory;

const Template: Story<BoxDisclosureProps> = (args) => (
  <BoxDisclosure {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: "Title",
  subtitle: "Subtitle",
  images: [
    "https://source.unsplash.com/random",
    "https://source.unsplash.com/random",
    "https://source.unsplash.com/random",
    "https://source.unsplash.com/random",
    "https://source.unsplash.com/random",
  ],
};
