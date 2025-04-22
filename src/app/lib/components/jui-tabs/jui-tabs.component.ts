import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ViewChildren,
  ElementRef,
  QueryList,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';

interface A11yMessages {
  tabsLabelledby?: string;
}

interface TabItem {
  tabId: string;
  tabLabel: string;
  a11yMessages?: { tabLabel?: string };
}

@Component({
  selector: 'jui-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jui-tabs.component.html',
  styleUrls: ['./jui-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JuiTabsComponent implements AfterViewInit {
  @Input() modelValue = '';
  @Input() a11yMessages?: A11yMessages;
  @Input() tabListData: TabItem[] = [];

  @Output() modelValueChange = new EventEmitter<string>();

  @ViewChildren('tabItem', { read: ElementRef })
  tabItems!: QueryList<ElementRef>;

  isMouseClicked = false;
  currentFocusIndex = -1;

  ngAfterViewInit() {
    // Optional: Focus first selected tab if needed
  }

  isSelected(tabId: string): boolean {
    return this.modelValue === tabId;
  }

  getTabIndex(tabId: string): number {
    return this.modelValue === tabId ? 0 : -1;
  }

  onFocus(index: number): void {
    this.currentFocusIndex = index;
  }

  onBlur(): void {
    this.isMouseClicked = false;
  }

  onSelectTab(tabId: string): void {
    this.modelValueChange.emit(tabId);
  }

  focusTab(index: number): void {
    const el = this.tabItems.get(index);
    el?.nativeElement?.focus();
  }

  onClickTabItem(tabId: string, index: number): void {
    if (this.currentFocusIndex !== -1) {
      this.tabItems.get(this.currentFocusIndex)?.nativeElement.blur();
    }
    this.isMouseClicked = true;
    this.tabItems.get(index)?.nativeElement.focus();
    this.onSelectTab(tabId);
  }

  onKeydown(event: KeyboardEvent, index: number, tabId: string): void {
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        this.focusTab((index + 1) % this.tabItems.length);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        this.focusTab(
          (index - 1 + this.tabItems.length) % this.tabItems.length
        );
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.onSelectTab(tabId);
        break;
    }
  }

  moveDown(index: number): void {
    const next = (index + 1) % this.tabItems.length;
    this.tabItems.get(next)?.nativeElement.focus();
  }

  moveUp(index: number): void {
    const prev = (index - 1 + this.tabItems.length) % this.tabItems.length;
    this.tabItems.get(prev)?.nativeElement.focus();
  }

  getAriaLabel(tab: TabItem): string {
    return tab.a11yMessages?.tabLabel || tab.tabLabel;
  }
}
