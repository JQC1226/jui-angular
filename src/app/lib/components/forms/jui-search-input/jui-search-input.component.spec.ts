import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { JuiSearchInputComponent } from './jui-search-input.component';
import { By } from '@angular/platform-browser';

describe('JuiSearchInputComponent', () => {
  let component: JuiSearchInputComponent;
  let fixture: ComponentFixture<JuiSearchInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JuiSearchInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JuiSearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expand input on expand button click', () => {
    component.shouldShowSearchInput = false;
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.expand-search-button'));
    button.triggerEventHandler('click');
    fixture.detectChanges();
    expect(component.shouldShowSearchInput).toBeTrue();
  });

  it('should emit value after debounce', fakeAsync(() => {
    spyOn(component.input, 'emit');
    component.searchInputText.setValue('abc');
    tick(component.debounceInterval);
    expect(component.input.emit).toHaveBeenCalledWith('abc');
  }));

  it('should clear input on clear button click', () => {
    component.searchInputText.setValue('clear me');
    fixture.detectChanges();
    component.onClickClearButton();
    expect(component.searchInputText.value).toBe('');
  });

  it('should emit escape event and hide input', () => {
    spyOn(component.escapeEvent, 'emit');
    spyOn(component.hideInputEvent, 'emit');
    component.shouldShowSearchInput = true;
    component.collapsible = true;
    fixture.detectChanges();
    component.onLeaveSearchInput();
    expect(component.escapeEvent.emit).toHaveBeenCalled();
    expect(component.shouldShowSearchInput).toBeFalse();
    expect(component.hideInputEvent.emit).toHaveBeenCalled();
  });
});
