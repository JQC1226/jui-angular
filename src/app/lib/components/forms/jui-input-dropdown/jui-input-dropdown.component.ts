import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { JuiDropdownComponent } from '../jui-dropdown/jui-dropdown.component';
import { JuiFormInputComponent } from '../jui-form-input/jui-form-input.component';

@Component({
  selector: 'jui-input-dropdown',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    JuiDropdownComponent,
    JuiFormInputComponent,
  ],
  templateUrl: './jui-input-dropdown.component.html',
  styleUrls: ['./jui-input-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JuiInputDropdownComponent implements OnInit {
  @Input() id = '';
  @Input() modelValue = '';
  @Input() label = '';
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() inputType = 'text';
  @Input() labelClassName: string[] = [];
  @Input() inputClassName: string[] = [];
  @Input() ariaRequired: { dropdown?: boolean; inputText?: boolean } = {};
  @Input() a11yMessages: {
    inputTextAriaLabel?: string;
    dropdownAriaLabel?: string;
    submitButtonAriaLabel?: string;
  } = {};
  @Input() options: any[] = [];
  @Input() validate = false;
  @Input() editOptionLabel = 'Edit...';
  @Input() maxlength: number | string = 512;
  @Input() kvpType = { key: 'id', value: 'desc' };

  @Output() modelValueChange = new EventEmitter<string>();
  @Output() updateEditModeEvent = new EventEmitter<boolean>();
  @Output() enterDropdownEvent = new EventEmitter<void>();
  @Output() enterInputFieldEvent = new EventEmitter<string>();

  @ViewChild('inputField') inputFieldRef!: ElementRef;

  isEditMode = false;
  editOptions: any[] = [];
  lastSavedValue = '';
  readonly EDIT_KEY = 'EDIT';

  ngOnInit(): void {
    if (this.options?.length > 0) {
      this.lastSavedValue = this.options[0][this.kvpType.value || ''];
    }
  }

  get optionsList(): any[] {
    const combinedOptions = [...this.options, ...this.editOptions];
    const dedupedOptions = combinedOptions.filter(
      (opt, index, self) =>
        index ===
        self.findIndex((o) => o[this.kvpType.key] === opt[this.kvpType.key])
    );
    return [
      ...dedupedOptions,
      {
        [this.kvpType.key]: this.EDIT_KEY,
        [this.kvpType.value]: this.editOptionLabel,
      },
    ];
  }

  onFieldInput(value: string): void {
    this.modelValue = value;
    this.modelValueChange.emit(value);
  }

  onChangeEditMode(isEdit: boolean): void {
    this.isEditMode = isEdit;
    this.updateEditModeEvent.emit(this.isEditMode);
  }

  onDropdownOptionSelection(selectedOption: any): void {
    if (selectedOption[this.kvpType.key] === this.EDIT_KEY) {
      this.onChangeEditMode(true);
      this.modelValue = '';
    }
  }

  onDropdownEnter(): void {
    this.enterDropdownEvent.emit();
  }

  onLeaveFormInputField(): void {}

  onFormInputFieldSubmit(): void {
    this.editOptions.push({
      [this.kvpType.key]: this.modelValue,
      [this.kvpType.value]: this.modelValue,
    });
    this.onChangeEditMode(false);
  }
}
