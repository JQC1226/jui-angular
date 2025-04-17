import {
  Component,
  Input,
  ChangeDetectionStrategy,
  computed,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'jui-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jui-loading-spinner.component.html',
  styleUrls: ['./jui-loading-spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JuiLoadingSpinnerComponent {
  @Input() isLoading = false;
  @Input() isFocusable = false;
  @Input() zIndex = 10;
  @Input() a11yMessages: { loadingSpinnerLabel?: string } = {
    loadingSpinnerLabel: 'Loading',
  };

  get style() {
    return { 'z-index': this.zIndex };
  }
}
