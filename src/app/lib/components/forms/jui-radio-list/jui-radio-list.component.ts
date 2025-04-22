import {
  Component,
  Input,
  Output,
  EventEmitter,
  ContentChildren,
  QueryList,
  AfterContentInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { JuiRadioButtonComponent } from './jui-radio-button/jui-radio-button.component';

@Component({
  selector: 'jui-radio-list',
  standalone: true,
  imports: [CommonModule, JuiRadioButtonComponent],
  templateUrl: './jui-radio-list.component.html',
  styleUrls: ['./jui-radio-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JuiRadioListComponent implements AfterContentInit {
  @Input() selectedValue = '';
  @Input() vertical = false;
  @Input() showValidationError = false;

  @Output() selectedValueChange = new EventEmitter<string>();
  @Output() enter = new EventEmitter<string>();
  @Output() focus = new EventEmitter<string>();
  @Output() blur = new EventEmitter<string>();

  @ContentChildren(JuiRadioButtonComponent)
  
  radioButtons!: QueryList<JuiRadioButtonComponent>;

  ngAfterContentInit(): void {
    this.radioButtons.forEach((rb) => {
      rb.checked = rb.value === this.selectedValue;
      rb.selectRadio.subscribe((value: string) => this.onSelect(value));
      rb.enterRadio.subscribe((value: string) => this.enter.emit(value));
      rb.focusRadio.subscribe((value: string) => this.focus.emit(value));
      rb.blurRadio.subscribe((value: string) => this.blur.emit(value));
    });
  }

  onSelect(value: string): void {
    this.selectedValue = value;
    this.selectedValueChange.emit(value);
    this.radioButtons.forEach((rb) => (rb.checked = rb.value === value));
  }
}
