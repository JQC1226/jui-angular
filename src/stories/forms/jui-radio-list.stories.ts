import { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { JuiRadioListComponent } from '../../app/lib/components/forms/jui-radio-list/jui-radio-list.component';
import { JuiRadioButtonComponent } from '../../app/lib/components/forms/jui-radio-list/jui-radio-button/jui-radio-button.component';

const meta: Meta = {
  title: 'Forms/JuiRadioList',
  component: JuiRadioListComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    moduleMetadata({
      imports: [JuiRadioListComponent, JuiRadioButtonComponent],
    }),
  ],
};

export default meta;

export const Basic: StoryObj = {
  render: (args) => ({
    props: {
      ...args,
      selectedValue: 'option1',
      selectedValueChange: (val: string) => console.log('Selected:', val),
    },
    template: `
      <jui-radio-list [selectedValue]="selectedValue" (selectedValueChange)="selectedValueChange($event)">
        <jui-radio-button value="option1">Option 1</jui-radio-button>
        <jui-radio-button value="option2">Option 2</jui-radio-button>
        <jui-radio-button value="option3">Option 3</jui-radio-button>
      </jui-radio-list>
    `,
  }),
};
