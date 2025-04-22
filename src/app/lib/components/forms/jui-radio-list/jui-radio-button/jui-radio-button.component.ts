import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'jui-radio-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jui-radio-button.component.html',
  styleUrls: ['./jui-radio-button.component.scss'],
})
export class JuiRadioButtonComponent {
  @Input() value = '';
  @Input() checked = false;
  @Input() disabled = false;

  @Output() selectRadio = new EventEmitter<string>();
  @Output() enterRadio = new EventEmitter<string>();
  @Output() focusRadio = new EventEmitter<string>();
  @Output() blurRadio = new EventEmitter<string>();

  onClick(): void {
    if (!this.disabled) this.selectRadio.emit(this.value);
  }

  onEnter(): void {
    if (!this.disabled) this.enterRadio.emit(this.value);
  }

  onFocus(): void {
    if (!this.disabled) this.focusRadio.emit(this.value);
  }

  onBlur(): void {
    if (!this.disabled) this.blurRadio.emit(this.value);
  }
}
