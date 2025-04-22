import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  OnInit,
  AfterViewInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'jui-action-dropdown',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './jui-action-dropdown.component.html',
  styleUrls: ['./jui-action-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JuiActionDropdownComponent implements OnInit, AfterViewInit {
  @Input() id = '';
  @Input() title = '';
  @Input() tabindex = 0;
  @Input() dropdownDisabled = false;
  @Input() defaultSelect = '';
  @Input() focusSignal = false;
  @Input() customClass = 'action-bg';
  @Input() inputClasses = '';
  @Input() focusOnSelect = true;
  @Input() autoFocusOnSelect = false;
  @Input() optionKeys = {
    group: 'group',
    options: 'options',
    optionName: 'optionName',
  };
  @Input() allOptions: any[] = [];
  @Input() a11yMessages: {
    dropdownDescribedby?: string;
    dropdownLabel?: string;
  } = {};

  @Output() selectedOptionEvent = new EventEmitter<any>();
  @Output() blurEvent = new EventEmitter<void>();

  @ViewChild('selectElement') selectRef!: ElementRef<HTMLSelectElement>;
  @ViewChild('focusHiddenInput') hiddenRef!: ElementRef<HTMLSpanElement>;

  selectedIndex = '';

  ngOnInit(): void {
    this.selectedIndex = this.defaultSelect;
  }

  ngAfterViewInit(): void {
    this.setTabindex();
    if (this.focusSignal) {
      this.focus();
    }
  }

  get ariaLabel(): string {
    return this.a11yMessages?.dropdownLabel || this.title;
  }

  get iconClasses(): Record<string, boolean> {
    return {
      'action-button': true,
      'sf-symbol': true,
      [this.customClass]: true,
      disabled: this.dropdownDisabled,
    };
  }

  setTabindex(): void {
    this.selectRef?.nativeElement?.setAttribute(
      'tabIndex',
      String(this.tabindex)
    );
  }

  focus(): void {
    if (this.selectRef?.nativeElement) {
      this.selectRef.nativeElement.setAttribute('tabIndex', '0');
      this.selectRef.nativeElement.focus();
    }
  }

  resetVoFocus(): void {
    if (this.autoFocusOnSelect && this.hiddenRef?.nativeElement) {
      setTimeout(() => {
        this.hiddenRef.nativeElement.focus();
        setTimeout(() => this.focus(), 350);
      }, 200);
    } else {
      this.focus();
    }
  }

  resetSelection(): void {
    this.selectedIndex = this.defaultSelect;
    if (this.focusOnSelect) {
      this.resetVoFocus();
    }
  }

  selectAction(event: Event): void {
    if (this.dropdownDisabled) return;
    const value = (event.target as HTMLSelectElement).value;
    const selected = JSON.parse(value);
    this.selectedOptionEvent.emit(selected);
  }

  onBlur(): void {
    if (!this.dropdownDisabled) {
      this.blurEvent.emit();
    }
  }
}
