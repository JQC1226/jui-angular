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
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { JuiLoadingSpinnerComponent } from '../../jui-loading-spinner/jui-loading-spinner.component';

@Component({
  selector: 'jui-form-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, JuiLoadingSpinnerComponent],
  templateUrl: './jui-form-input.component.html',
  styleUrls: ['./jui-form-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JuiFormInputComponent implements OnInit {
  @Input() id = '';
  @Input() modelValue = '';
  @Input() ariaRequired?: boolean;
  @Input() name = '';
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() maxlength: string | number = 512;
  @Input() clearButton = false;
  @Input() label = '';
  @Input() labelClassName: string[] = [];
  @Input() inputClassName: string[] = [];
  @Input() disabled = false;
  @Input() validate = false;
  @Input() enableVerifyButton = false;
  @Input() verifyInProgress = false;
  @Input() verifySuccess = false;
  @Input() liveMessageDelay = 1000;
  @Input() a11yMessages: {
    inputTextAriaLabel?: string;
    verifiedIconAriaLabel?: string;
    verifyButtonAriaLabel?: string;
    clearButtonAriaLabel?: string;
    verifiedLiveMessage?: string;
  } = {
    inputTextAriaLabel: '',
    verifiedIconAriaLabel: '',
    verifyButtonAriaLabel: '',
    clearButtonAriaLabel: '',
    verifiedLiveMessage: '',
  };

  @Output() modelValueChange = new EventEmitter<string>();
  @Output() blurEvent = new EventEmitter<string>();
  @Output() focusEvent = new EventEmitter<void>();
  @Output() verifyEvent = new EventEmitter<void>();

  @ViewChild('inputRef') inputRef!: ElementRef<HTMLInputElement>;

  inputControl!: FormControl;

  ngOnInit(): void {
    const validators = [];

    if (this.ariaRequired || this.ariaRequired === null) {
      validators.push(Validators.required);
    }

    if (this.maxlength && Number(this.maxlength) > 0) {
      validators.push(Validators.maxLength(Number(this.maxlength)));
    }

    this.inputControl = new FormControl(this.modelValue, validators);
  }

  get shouldShowClearButton(): boolean {
    return this.clearButton && this.inputControl.value?.length > 0;
  }

  get liveMessage(): string {
    return this.verifySuccess && this.a11yMessages.verifiedLiveMessage
      ? `${this.a11yMessages.verifiedLiveMessage} ${this.label}`
      : '';
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.inputControl.setValue(value);
    this.modelValueChange.emit(value);
  }

  onBlur(): void {
    this.blurEvent.emit(this.inputControl.value);
  }

  onFocus(): void {
    this.focusEvent.emit();
  }

  onEnter(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.blurEvent.emit(this.inputControl.value);
    }
  }

  onClickClearButton(): void {
    this.inputControl.setValue('');
    this.modelValueChange.emit('');
    setTimeout(() => {
      this.inputRef?.nativeElement?.focus();
    });
  }

  onClickVerifyButton(): void {
    this.verifyEvent.emit();
  }
}
