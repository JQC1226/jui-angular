import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'jui-comment-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './jui-comment-input.component.html',
  styleUrls: ['./jui-comment-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JuiCommentInputComponent implements OnInit {
  @Input() id = '';
  @Input() label = '';
  @Input() placeholder = '';
  @Input() maxLength = -1;
  @Input() maxHeight = 0;
  @Input() readonly = false;
  @Input() showCharsRemaining = true;
  @Input() ariaRequired: boolean | null = null;
  @Input() a11yMessages: { ariaLabel?: string } = { ariaLabel: '' };
  @Input() labelClassName: string[] = [];
  @Input() inputClassName: string[] = [];

  @Output() input = new EventEmitter<string>();
  @Output() blur = new EventEmitter<void>();
  @Output() focus = new EventEmitter<void>();
  @Output() enter = new EventEmitter<void>();

  @ViewChild('textareaRef') textareaRef!: ElementRef;

  commentControl!: FormControl;
  charRemainingId = '';
  countDownFrom = 20;

  ngOnInit(): void {
    const validators = [];
    if (this.ariaRequired || this.ariaRequired === null) {
      validators.push(Validators.required);
    }
    if (this.maxLength > 0) {
      validators.push(Validators.maxLength(this.maxLength));
    }

    this.commentControl = new FormControl('', validators);
    this.charRemainingId = this.generateId();
  }

  get charsRemaining(): number {
    return this.maxLength - (this.commentControl.value?.length || 0);
  }

  get showRemainingLabel(): boolean {
    return this.showCharsRemaining && this.maxLength > 0;
  }

  get remainingText(): string {
    const remaining = this.charsRemaining;
    return remaining <= this.countDownFrom
      ? `${remaining}s Characters Remaining`
      : `${this.maxLength}s characters limit`;
  }

  get maxHeightStyle(): Record<string, string> {
    return this.maxHeight ? { maxHeight: `${this.maxHeight}px` } : {};
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLTextAreaElement).value;
    this.commentControl.setValue(value);
    this.input.emit(value);
  }

  onBlur(): void {
    this.blur.emit();
  }

  onFocus(): void {
    this.focus.emit();
  }

  onEnter(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.enter.emit();
    }
  }

  private generateId(): string {
    return `char-remaining-id-${Math.floor(Math.random() * 1000000)}`;
  }
}
