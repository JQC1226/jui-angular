import { Meta, StoryObj } from '@storybook/angular';
import { JuiButtonComponent } from '../app/lib/components/jui-button/jui-button.component';

const meta: Meta<JuiButtonComponent> = {
  title: 'JUI/Button',
  component: JuiButtonComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    action: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<JuiButtonComponent>;

export const Default: Story = {
  args: {
    messages: { buttonLabel: 'Click Me' },
  },
};

export const WithA11y: Story = {
  args: {
    messages: { buttonLabel: 'Submit' },
    a11yMessages: { buttonLabel: 'Submit this form' },
  },
};

export const TriggerAction: Story = {
  args: {
    messages: { buttonLabel: 'Do Something' },
  },
};
