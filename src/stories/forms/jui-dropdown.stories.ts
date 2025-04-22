import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { JuiDropdownComponent } from '../../app/lib/components/forms/jui-dropdown/jui-dropdown.component';

export default {
  title: 'FORMS/Dropdown',
  component: JuiDropdownComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, JuiDropdownComponent],
    }),
  ],
  argTypes: {
    modelValueChange: { action: 'modelValueChange' },
    selectedOption: { action: 'selectedOption' },
    blurEvent: { action: 'blurEvent' },
    focusEvent: { action: 'focusEvent' },
    clickEvent: { action: 'clickEvent' },
  },
} satisfies Meta<JuiDropdownComponent>;

export const Default: StoryObj<JuiDropdownComponent> = {
  args: {
    id: 'dropdown-test',
    modelValue: '',
    label: 'Select an option',
    options: [
      { id: '1', desc: 'Option 1' },
      { id: '2', desc: 'Option 2' },
      { id: '3', desc: 'Option 3' },
    ],
    title: '',
    disabled: false,
    kvpType: { key: 'id', value: 'desc' },
    a11yMessages: {
      ariaLabel: 'Dropdown field',
    },
  },
};
