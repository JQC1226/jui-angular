import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import { JuiModalComponent } from '../app/components/jui-modal/jui-modal.component';
import { JuiIdleTimerComponent } from '../app/components/jui-idle-timer/jui-idle-timer.component';


const meta: Meta<JuiIdleTimerComponent> = {
  title: 'JUI/Idle Timer',
  component: JuiIdleTimerComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, JuiModalComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<JuiIdleTimerComponent>;

export const QuickTimeout: Story = {
  args: {
    inactivityDurationInMinutes: 0.1, // 6 seconds
    countDownTimerInMinutes: 0.05, // 3 seconds
    height: '20rem',
    width: '40rem',
    a11yMessages: {
      stopTimerButtonAriaLabel: 'Stop',
      resetTimerButtonAriaLabel: 'Stay signed in',
    },
    messages: {
      stopTimerButtonLabel: 'Log me out',
      resetTimerButtonLabel: 'Keep me signed in',
    },
  },
  render: (args) => ({
    props: {
      ...args,
      timerReset: () => console.log('[QuickTimeout] Reset clicked'),
      timerStopped: () => console.log('[QuickTimeout] Stop clicked'),
      timedOut: () => console.log('[QuickTimeout] Timed out'),
    },
  }),
};

export const LongSession: Story = {
  args: {
    inactivityDurationInMinutes: 2,
    countDownTimerInMinutes: 1,
    height: '24rem',
    width: '50rem',
    a11yMessages: {
      stopTimerButtonAriaLabel: 'Stop session',
      resetTimerButtonAriaLabel: 'Continue session',
    },
    messages: {
      stopTimerButtonLabel: 'Stop Session',
      resetTimerButtonLabel: 'Continue Working',
    },
  },
  render: (args) => ({
    props: {
      ...args,
      timerReset: () => console.log('[LongSession] Reset clicked'),
      timerStopped: () => console.log('[LongSession] Stop clicked'),
      timedOut: () => console.log('[LongSession] Timed out'),
    },
  }),
};

export const DefaultSettings: Story = {
  args: {
    inactivityDurationInMinutes: 1,
    countDownTimerInMinutes: 0.2,
  },
  render: (args) => ({
    props: {
      ...args,
      timerReset: () => console.log('[Default] Reset'),
      timerStopped: () => console.log('[Default] Stopped'),
      timedOut: () => console.log('[Default] Timed Out'),
    },
  }),
};
