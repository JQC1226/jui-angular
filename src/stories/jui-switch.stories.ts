import { Meta, StoryObj } from '@storybook/angular';
import { JuiSwitchComponent } from '../app/lib/components/jui-switch/jui-switch.component';

export default {
  title: 'JUI/Switch',
  component: JuiSwitchComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    modelValueChange: { action: 'toggled' },
  },
} as Meta<JuiSwitchComponent>;

type Story = StoryObj<JuiSwitchComponent>;

export const Default: Story = {
  args: {
    id: 'toggle-1',
    modelValue: false,
    text: 'Enable Notifications',
  },
};

export const Disabled: Story = {
  args: {
    id: 'toggle-2',
    modelValue: true,
    text: 'Disabled toggle',
    disabled: true,
  },
};
