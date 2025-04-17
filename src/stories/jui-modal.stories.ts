// jui-modal.stories.ts
import { Meta, StoryObj } from '@storybook/angular';
import { JuiModalComponent } from '../app/components/jui-modal/jui-modal.component';

const meta: Meta<JuiModalComponent> = {
  title: 'JUI/Modal',
  component: JuiModalComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A responsive, accessible, and customizable Angular standalone modal.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<JuiModalComponent>;

export const OpenModal: Story = {
  args: {
    modelValue: true,
    width: '500px',
    height: '300px',
    closeButton: true,
    persistent: false,
    a11yMessage: { closeButtonAriaLabel: 'Close modal' },
  },
  render: (args) => ({
    props: args,
    template: `
    <div style="display: flex; justify-content: center; align-items: center; height: 100vh; width: 100vw;">
      <button (click)="show = true">Open Modal</button>
      <jui-modal
        [modelValue]="show"
        (modelValueChange)="show = $event"
        [width]="'500px'"
        [height]="'300px'"
        [persistent]="false"
        [closeButton]="true"
        [a11yMessage]="{ closeButtonAriaLabel: 'Close modal' }"
      >
        <h2>Modal Title</h2>
        <p>This is a standalone Angular modal with accessibility and responsiveness.</p>
      </jui-modal>
    </div>
    `,
  }),
};
