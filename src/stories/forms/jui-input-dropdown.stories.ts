import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { ReactiveFormsModule } from '@angular/forms';
import { JuiInputDropdownComponent } from '../../app/lib/components/forms/jui-input-dropdown/jui-input-dropdown.component';

export default {
  title: 'FORMS/InputDropdown',
  component: JuiInputDropdownComponent,
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, JuiInputDropdownComponent],
    }),
  ],
  argTypes: {
    modelValueChange: { action: 'modelValueChange' },
    updateEditModeEvent: { action: 'updateEditModeEvent' },
    enterDropdownEvent: { action: 'enterDropdownEvent' },
    enterInputFieldEvent: { action: 'enterInputFieldEvent' },
  },
} satisfies Meta<JuiInputDropdownComponent>;

export const Default: StoryObj<JuiInputDropdownComponent> = {
  args: {
    id: 'user-name',
    modelValue: '',
    label: 'Choose or type a name',
    placeholder: 'Enter or select username',
    disabled: false,
    editOptionLabel: 'Edit...',
    options: [
      { id: '1', desc: 'Alice' },
      { id: '2', desc: 'Alan' },
      { id: '3', desc: 'Amber' },

      { id: '4', desc: 'Bob' },
      { id: '5', desc: 'Bella' },
      { id: '6', desc: 'Brandon' },

      { id: '7', desc: 'Charlie' },
      { id: '8', desc: 'Catherine' },
      { id: '9', desc: 'Caleb' },

      { id: '10', desc: 'Diana' },
      { id: '11', desc: 'David' },
      { id: '12', desc: 'Derek' },

      { id: '13', desc: 'Ethan' },
      { id: '14', desc: 'Emma' },
      { id: '15', desc: 'Eliza' },
    ],
    kvpType: { key: 'id', value: 'desc' },
    ariaRequired: { dropdown: true, inputText: true },
    a11yMessages: {
      inputTextAriaLabel: 'Type your name',
      dropdownAriaLabel: 'Select a name',
      submitButtonAriaLabel: 'Submit typed name',
    },
    labelClassName: ['story-label'],
    inputClassName: ['story-input'],
    validate: false,
    inputType: 'text',
    maxlength: 50,
  },
};
