import { Meta, StoryObj } from '@storybook/angular';
import { Component } from '@angular/core';
import { JuiIdleTimerModalComponent } from '../app/components/jui-idle-timer/jui-idle-timer.component';

@Component({
  selector: 'storybook-idle-timer-wrapper',
  standalone: true,
  imports: [JuiIdleTimerModalComponent],
  template: `
    <jui-idle-timer-modal
      [inactivityDurationInMinutes]="inactivityDurationInMinutes"
      [countDownTimerInMinutes]="countDownTimerInMinutes"
      [a11yMessages]="a11yMessages"
      [messages]="messages"
      [height]="height"
      [width]="width"
      (timerReset)="onEvent('Reset')"
      (timerStopped)="onEvent('Stopped')"
      (timedOut)="onEvent('Timed Out')"
    />
  `,
})
class IdleTimerStoryWrapper {
  inactivityDurationInMinutes = 0.1;
  countDownTimerInMinutes = 0.2;
  height = '20rem';
  width = '50rem';
  a11yMessages = {
    stopTimerButtonAriaLabel: 'Stop timer ARIA label',
    resetTimerButtonAriaLabel: 'Reset timer ARIA label',
  };
  messages = {
    stopTimerButtonLabel: 'Stop Session',
    resetTimerButtonLabel: 'Continue Session',
  };

  onEvent(event: string) {
    console.log('IdleTimer event:', event);
  }
}

const meta: Meta<IdleTimerStoryWrapper> = {
  title: 'JUI/Idle Timer Modal',
  component: IdleTimerStoryWrapper,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A modal component that appears when user is inactive for a given period. Useful for session timeouts.',
      },
    },
  },
  argTypes: {
    inactivityDurationInMinutes: { control: 'number' },
    countDownTimerInMinutes: { control: 'number' },
    height: { control: 'text' },
    width: { control: 'text' },
    a11yMessages: { control: 'object' },
    messages: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<IdleTimerStoryWrapper>;

export const Default: Story = {
  args: {
    inactivityDurationInMinutes: 0.1,
    countDownTimerInMinutes: 0.2,
    height: '20rem',
    width: '50rem',
  },
};

export const LongSession: Story = {
  args: {
    inactivityDurationInMinutes: 0.5,
    countDownTimerInMinutes: 1,
    height: '25rem',
    width: '45rem',
  },
};

export const CustomLabels: Story = {
  args: {
    inactivityDurationInMinutes: 0.1,
    countDownTimerInMinutes: 0.2,
    messages: {
      stopTimerButtonLabel: 'End Session Now',
      resetTimerButtonLabel: 'Keep Me Logged In',
    },
    a11yMessages: {
      stopTimerButtonAriaLabel: 'End your session',
      resetTimerButtonAriaLabel: 'Extend your session',
    },
  },
};

export const CompactLayout: Story = {
  args: {
    inactivityDurationInMinutes: 0.2,
    countDownTimerInMinutes: 0.2,
    height: '16rem',
    width: '30rem',
  },
};
