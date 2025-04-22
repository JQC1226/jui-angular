import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'jui-dropdown',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './jui-dropdown.component.html',
  styleUrls: ['./jui-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JuiDropdownComponent implements OnInit {
  @Input() id = '';
  @Input() modelValue = '';
  @Input() label = '';
  @Input() title = '';
  @Input() options: any[] = [];
  @Input() kvpType = { key: 'id', value: 'desc' };
  @Input() disabled = false;
  @Input() labelClassName: string[] = [];
  @Input() inputClassName: string[] = [];
  @Input() validate = false;
  @Input() ariaRequired?: boolean;
  @Input() a11yMessages: { ariaLabel?: string } = { ariaLabel: '' };

  @Output() modelValueChange = new EventEmitter<string>();
  @Output() selectedOption = new EventEmitter<any>();
  @Output() blurEvent = new EventEmitter<void>();
  @Output() focusEvent = new EventEmitter<void>();
  @Output() clickEvent = new EventEmitter<void>();

  @ViewChild('selectRef') selectRef!: ElementRef<HTMLSelectElement>;

  control!: FormControl;

  ngOnInit(): void {
    const validators = [];
    if (this.ariaRequired || this.ariaRequired === null) {
      validators.push(Validators.required);
    }
    this.control = new FormControl(this.modelValue, validators);
  }

  get invalid(): boolean {
    return this.control.invalid && this.control.touched;
  }

  
  onSelect(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.control.setValue(value);
    this.modelValueChange.emit(value);
    const selected = this.options.find(
      (opt) => opt[this.kvpType.key] === value
    );
    this.selectedOption.emit(selected);
  }

  onBlur(): void {
    this.control.markAsTouched();
    this.blurEvent.emit();
  }

  onFocus(): void {
    this.focusEvent.emit();
  }

  onClick(): void {
    this.clickEvent.emit();
  }

  onEnter(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.blurEvent.emit();
    }
  }
}
