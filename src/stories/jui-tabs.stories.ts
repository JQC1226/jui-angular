import { Meta, StoryObj } from '@storybook/angular';
import { Component } from '@angular/core';
import { JuiTabsComponent } from '../app/lib/components/jui-tabs/jui-tabs.component';

@Component({
  standalone: true,
  imports: [JuiTabsComponent],
  template: `
    <jui-tabs
      [modelValue]="selected"
      (modelValueChange)="selected = $event"
      [tabListData]="tabs"
      [a11yMessages]="{ tabsLabelledby: 'example-tabs' }"
    >
    </jui-tabs>
    <div style="margin-top: 1rem;">Selected Tab: {{ selected }}</div>
  `,
})
class JuiTabsStoryWrapper {
  selected = 'tab1';
  tabs = [
    { tabId: 'tab1', tabLabel: 'Tab One' },
    { tabId: 'tab2', tabLabel: 'Tab Two' },
    { tabId: 'tab3', tabLabel: 'Tab Three' },
  ];
}

const meta: Meta<JuiTabsStoryWrapper> = {
  title: 'JUI/Tabs',
  component: JuiTabsStoryWrapper,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A keyboard-accessible tabs component with a11y support.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<JuiTabsStoryWrapper>;

export const Default: Story = {
  name: 'Basic Usage',
};
