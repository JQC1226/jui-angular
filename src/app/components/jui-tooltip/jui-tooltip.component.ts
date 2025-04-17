import {
  Component,
  ElementRef,
  Input,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import tippy, { Instance, Props as TippyOptions } from 'tippy.js';

@Component({
  selector: 'jui-tooltip',
  standalone: true,
  templateUrl: './jui-tooltip.component.html',
  styleUrls: ['./jui-tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JuiTooltipComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() text: string = '';
  @Input() options: Partial<TippyOptions> = {};
  @Input() show: boolean = false;
  @Input() disable: boolean = false;

  @ViewChild('tooltipWrapper', { static: true }) tooltipWrapper!: ElementRef;

  private tippyInstance: Instance | null = null;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const target = this.tooltipWrapper.nativeElement.firstElementChild;

    if (!target) return;

    const instances = tippy(target, {
      content: this.text,
      ...this.options,
    });

    this.tippyInstance = Array.isArray(instances) ? instances[0] : instances;

    this.disableTooltip(this.disable);
    if (this.show) this.showTooltip();
  }

  ngOnDestroy(): void {
    this.destroyTooltip();
  }

  showTooltip(): void {
    this.tippyInstance?.show();
  }

  destroyTooltip(): void {
    this.tippyInstance?.destroy();
  }

  disableTooltip(disable: boolean): void {
    if (!this.tippyInstance) return;

    disable ? this.tippyInstance.disable() : this.tippyInstance.enable();
  }

  updateText(text: string): void {
    this.tippyInstance?.setContent(text);
  }
}
