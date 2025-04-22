// jui-loading-spinner.stories.ts
import { Meta, StoryObj } from '@storybook/angular';
import { JuiLoadingSpinnerComponent } from '../app/lib/components/jui-loading-spinner/jui-loading-spinner.component';

const meta: Meta<JuiLoadingSpinnerComponent> = {
  title: 'JUI/Loading Spinner',
  component: JuiLoadingSpinnerComponent,
  tags: ['autodocs'],
  args: {
    isLoading: true,
    isFocusable: true,
    zIndex: 99,
    a11yMessages: { loadingSpinnerLabel: 'Loading data' },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'An accessible loading spinner component with configurable z-index and ARIA support.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<JuiLoadingSpinnerComponent>;

export const Default: Story = {};
