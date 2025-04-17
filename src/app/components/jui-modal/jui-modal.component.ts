import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  HostListener,
  AfterViewInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'jui-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jui-modal.component.html',
  styleUrls: ['./jui-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JuiModalComponent implements AfterViewInit, OnDestroy {
  @Input() modelValue = false;
  @Output() modelValueChange = new EventEmitter<boolean>();

  @Input() closeButton = true;
  @Input() a11yMessage: { closeButtonAriaLabel?: string } = {
    closeButtonAriaLabel: 'Close modal',
  };
  @Input() width = '600px';
  @Input() height = '400px';
  @Input() persistent = false;

  @ViewChild('modal') modalRef!: ElementRef;

  @HostListener('document:keydown.escape', ['$event'])
  handleEscape(event: KeyboardEvent) {
    if (!this.persistent) this.close();
  }

  ngAfterViewInit(): void {
    document.body.style.overflow = this.modelValue ? 'hidden' : '';
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }

  close(): void {
    this.modelValueChange.emit(false);
  }

  onClickOutside(event: MouseEvent): void {
    if (!this.persistent && event.target === this.modalRef.nativeElement) {
      this.close();
    }
  }
}
