import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JuiFormInputComponent } from '../../app/lib/components/forms/jui-form-input/jui-form-input.component';

export default {
  title: 'FORMS/FormInput',
  component: JuiFormInputComponent,
  decorators: [
    moduleMetadata({
      imports: [FormsModule, ReactiveFormsModule, JuiFormInputComponent],
    }),
  ],
  argTypes: {
    modelValueChange: { action: 'modelValueChange' },
    blurEvent: { action: 'blurEvent' },
    focusEvent: { action: 'focusEvent' },
    verifyEvent: { action: 'verifyEvent' },
  },
} satisfies Meta<JuiFormInputComponent>;

export const Default: StoryObj<JuiFormInputComponent> = {
  args: {
    id: 'username',
    modelValue: '',
    label: 'Username',
    placeholder: 'Enter your username',
    ariaRequired: true,
    clearButton: true,
    maxlength: 32,
    enableVerifyButton: true,
    verifyInProgress: true,
    verifySuccess: true,
    a11yMessages: {
      inputTextAriaLabel: 'Username input',
      clearButtonAriaLabel: 'Clear username',
      verifyButtonAriaLabel: 'Verify username',
      verifiedIconAriaLabel: 'Username verified',
      verifiedLiveMessage: 'Username has been verified',
    },
  },
};
