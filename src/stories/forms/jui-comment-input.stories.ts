import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { action } from '@storybook/addon-actions';
import { JuiCommentInputComponent } from '../../app/lib/components/forms/jui-comment-input/jui-comment-input.component';

export default {
  title: 'FORMS/CommentInput',
  component: JuiCommentInputComponent,
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, JuiCommentInputComponent],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    input: { action: 'input' },
    focus: { action: 'focus' },
    blur: { action: 'blur' },
    enter: { action: 'enter' },
  },
} satisfies Meta<JuiCommentInputComponent>;

export const Default: StoryObj<JuiCommentInputComponent> = {
  args: {
    id: 'comment-input',
    label: 'Your Comment',
    placeholder: 'Type something...',
    maxLength: 10,
    maxHeight: 400,
    ariaRequired: true,
    showCharsRemaining: true,
    a11yMessages: {
      ariaLabel: 'Comment input field',
    },
    inputClassName: ['storybook-input'],
  },
};
