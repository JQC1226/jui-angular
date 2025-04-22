import { Meta, moduleMetadata } from '@storybook/angular';
import { JuiActionDropdownComponent } from '../../app/lib/components/forms/jui-action-dropdown/jui-action-dropdown.component';

export default {
  title: 'Forms/ActionDropdown',
  component: JuiActionDropdownComponent,
  decorators: [
    moduleMetadata({
      imports: [JuiActionDropdownComponent],
    }),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<JuiActionDropdownComponent>;

export const Default = {
  args: {
    title: 'Select Action',
    id: 'dropdown-1',
    allOptions: [
      {
        group: 'Group A',
        options: [
          { optionName: 'Action A1' },
          { optionName: 'Action A2', disabled: true },
        ],
      },
      {
        options: [{ optionName: 'Action B1' }, { optionName: 'Action B2' }],
      },
    ],
    defaultSelect: '',
    tabindex: 0,
    dropdownDisabled: false,
    inputClasses: '',
    focusOnSelect: true,
    autoFocusOnSelect: false,
    a11yMessages: {
      dropdownDescribedby: 'desc-id',
      dropdownLabel: 'Action Dropdown',
    },
  },
};
