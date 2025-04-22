import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'jui-button',
  imports: [CommonModule],
  templateUrl: './jui-button.component.html',
  styleUrls: ['./jui-button.component.scss'],
})
export class JuiButtonComponent {
  @Input() messages: { buttonLabel?: string } = { buttonLabel: '' };
  @Input() a11yMessages: { buttonLabel?: string } = { buttonLabel: '' };

  @Output() action = new EventEmitter<void>();

  onClickButton(event: Event): void {
    event.preventDefault();
    this.action.emit();
  }
}
