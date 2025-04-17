import { Meta, StoryObj } from '@storybook/angular';
import { JuiTooltipComponent } from '../app/components/jui-tooltip/jui-tooltip.component';

const meta: Meta<JuiTooltipComponent> = {
  title: 'JUI/Tooltip',
  component: JuiTooltipComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<JuiTooltipComponent>;

export const Basic: Story = {
  render: (args) => ({
    props: args,
    template: `
      <jui-tooltip [text]="text">
        <button class="demo-button">Hover me</button>
      </jui-tooltip>
    `,
  }),
  args: {
    text: 'This is a tooltip!',
  },
};

export const Disabled: Story = {
  render: (args) => ({
    props: args,
    template: `
      <jui-tooltip [text]="text" [disable]="true">
        <button class="demo-button">Tooltip is disabled</button>
      </jui-tooltip>
    `,
  }),
  args: {
    text: 'Disabled tooltip',
  },
};

export const WithCustomOptions: Story = {
  render: (args) => ({
    props: args,
    template: `
      <jui-tooltip [text]="text" [options]="options">
        <button class="demo-button">Top placement</button>
      </jui-tooltip>
    `,
  }),
  args: {
    text: 'Tooltip from the top',
    options: {
      placement: 'top',
      animation: 'scale',
    },
  },
};
