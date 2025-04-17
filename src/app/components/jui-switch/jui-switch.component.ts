import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-jui-switch',
  imports: [CommonModule],
  templateUrl: './jui-switch.component.html',
  styleUrl: './jui-switch.component.scss',
})
export class JuiSwitchComponent {
  @Input() id!: string;
  @Input() modelValue = false;
  @Input() text = '';
  @Input() disabled = false;

  @Output() modelValueChange = new EventEmitter<boolean>();

  onToggle(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.modelValueChange.emit(isChecked);
  }
}
