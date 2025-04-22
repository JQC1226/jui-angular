import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnInit,
  AfterViewInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'jui-search-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './jui-search-input.component.html',
  styleUrls: ['./jui-search-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JuiSearchInputComponent implements OnInit, AfterViewInit {
  @Input() messages = {
    searchInputPlaceholder: 'Filter History',
  };

  @Input() a11yMessages = {
    searchInputAriaLabel: 'Filter History',
    expandSearchButtonAriaLabel: 'Show Filter History',
    searchButtonAriaLabel: 'Filter History',
    closeButtonAriaLabel: 'Hide Filter History',
    clearButtonAriaLabel: 'Clear',
  };

  @Input() debounceInterval = 300;
  @Input() clearButton = false;
  @Input() clearValueOnClose = true;
  @Input() initiallyExpanded = false;
  @Input() collapsible = true;
  @Input() searchText = '';
  @Input() ariaHideForFilterSearch = false;
  @Input() enableClearButtonAriaLabel = true;
  @Input() ariaRequired = false;

  @Output() input = new EventEmitter<string>();
  @Output() modelValueChange = new EventEmitter<string>();
  @Output() hideInputEvent = new EventEmitter<void>();
  @Output() enterEvent = new EventEmitter<string>();
  @Output() escapeEvent = new EventEmitter<void>();
  @Output() focusEvent = new EventEmitter<void>();
  @Output() clickSearchEvent = new EventEmitter<string>();

  @ViewChild('searchInputRef') searchInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('expandSearchButtonRef')
  expandSearchButtonRef!: ElementRef<HTMLButtonElement>;

  shouldShowSearchInput = false;
  searchInputText = new FormControl('');
  get shouldShowClearButton(): boolean {
    return this.clearButton && (this.searchInputText.value || '')?.length > 0;
  }

  ngOnInit(): void {
    this.setInitiallyExpanded();
    this.searchInputText.setValue(this.searchText);
    this.searchInputText.valueChanges
      .pipe(debounceTime(this.debounceInterval))
      .subscribe((text) => {
        this.input.emit(text || '');
        this.modelValueChange.emit(text || '');
      });
  }

  ngAfterViewInit(): void {
    if (this.initiallyExpanded && this.searchInputRef) {
      this.searchInputRef.nativeElement.focus();
    }
  }

  setInitiallyExpanded(): void {
    this.shouldShowSearchInput = this.collapsible
      ? this.initiallyExpanded
      : true;
  }

  onClickExpandSearchButton(): void {
    this.shouldShowSearchInput = true;
    setTimeout(() => {
      this.searchInputRef?.nativeElement.focus();
    });
  }

  onClickCloseButton(): void {
    if (this.clearValueOnClose) {
      this.searchInputText.setValue('');
    }
    this.shouldShowSearchInput = false;
    this.hideInputEvent.emit();
    setTimeout(() => {
      this.expandSearchButtonRef?.nativeElement.focus();
    });
  }

  onEnterSearchInput(event: KeyboardEvent): void {
    this.enterEvent.emit((event.target as HTMLInputElement).value);
  }

  onLeaveSearchInput(): void {
    this.escapeEvent.emit();
    if (!this.collapsible) return;
    this.shouldShowSearchInput = false;
    this.hideInputEvent.emit();
    setTimeout(() => {
      this.expandSearchButtonRef?.nativeElement.focus();
    });
  }

  onClickSearchButton(): void {
    this.clickSearchEvent.emit(this.searchInputText.value || '');
  }

  onClickClearButton(): void {
    this.searchInputText.setValue('');
    this.searchInputRef?.nativeElement.focus();
  }

  onFocusSearchInput(): void {
    this.focusEvent.emit();
  }
}
