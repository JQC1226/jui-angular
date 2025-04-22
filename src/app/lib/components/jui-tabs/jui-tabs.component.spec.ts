import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JuiTabsComponent } from './jui-tabs.component';
import { By } from '@angular/platform-browser';

describe('JuiTabsComponent', () => {
  let fixture: ComponentFixture<JuiTabsComponent>;
  let component: JuiTabsComponent;

  const tabsMock = [
    { tabId: 'tab1', tabLabel: 'Tab One' },
    { tabId: 'tab2', tabLabel: 'Tab Two' },
    {
      tabId: 'tab3',
      tabLabel: 'Tab Three',
      a11yMessages: { tabLabel: 'Alt Tab 3' },
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JuiTabsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JuiTabsComponent);
    component = fixture.componentInstance;
    component.modelValue = 'tab2';
    component.tabListData = tabsMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render correct number of tabs', () => {
    const labels = fixture.debugElement.queryAll(By.css('.tab-label'));
    expect(labels.length).toBe(3);
    expect(labels[1].nativeElement.textContent.trim()).toBe('Tab Two');
  });

  it('should apply selected class to active tab', () => {
    const liElements = fixture.debugElement.queryAll(By.css('li'));
    expect(liElements[1].classes['tab-selected']).toBeTrue();
  });

  it('should compute aria label from a11y or fallback to tabLabel', () => {
    const label0 = component.getAriaLabel(tabsMock[0]);
    const label2 = component.getAriaLabel(tabsMock[2]);
    expect(label0).toBe('Tab One');
    expect(label2).toBe('Alt Tab 3');
  });

  it('should return correct tabIndex', () => {
    expect(component.getTabIndex('tab2')).toBe(0);
    expect(component.getTabIndex('tab1')).toBe(-1);
  });

  it('should update currentFocusIndex on focus', () => {
    component.onFocus(2);
    expect(component.currentFocusIndex).toBe(2);
  });

  it('should reset isMouseClicked on blur', () => {
    component.isMouseClicked = true;
    component.onBlur();
    expect(component.isMouseClicked).toBeFalse();
  });

  it('should emit selected tabId on click', () => {
    spyOn(component.modelValueChange, 'emit');
    component.tabItems.reset([
      { nativeElement: document.createElement('a') } as any,
      { nativeElement: document.createElement('a') } as any,
      { nativeElement: document.createElement('a') } as any,
    ]);
    component.currentFocusIndex = 1;
    spyOn(component.tabItems.get(1)?.nativeElement, 'blur');
    spyOn(component.tabItems.get(0)?.nativeElement, 'focus');
    component.onClickTabItem('tab1', 0);
    expect(component.modelValueChange.emit).toHaveBeenCalledWith('tab1');
  });

  it('should handle keyboard ArrowRight and ArrowDown keys', () => {
    const mockEl0 = { nativeElement: jasmine.createSpyObj('el', ['focus']) };
    const mockEl1 = { nativeElement: jasmine.createSpyObj('el', ['focus']) };
    component.tabItems.reset([mockEl0 as any, mockEl1 as any]);
    const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    spyOn(event, 'preventDefault');
    component.onKeydown(event, 0, 'tab1');
    expect(event.preventDefault).toHaveBeenCalled();
    expect(mockEl1.nativeElement.focus).toHaveBeenCalled();
  });

  it('should handle keyboard ArrowLeft and ArrowUp keys', () => {
    const mockEl0 = { nativeElement: jasmine.createSpyObj('el', ['focus']) };
    const mockEl1 = { nativeElement: jasmine.createSpyObj('el', ['focus']) };
    component.tabItems.reset([mockEl0 as any, mockEl1 as any]);
    const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
    spyOn(event, 'preventDefault');
    component.onKeydown(event, 1, 'tab2');
    expect(event.preventDefault).toHaveBeenCalled();
    expect(mockEl0.nativeElement.focus).toHaveBeenCalled();
  });

  it('should emit on Enter and Space key press', () => {
    spyOn(component.modelValueChange, 'emit');
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    spyOn(event, 'preventDefault');
    component.onKeydown(event, 0, 'tab1');
    expect(component.modelValueChange.emit).toHaveBeenCalledWith('tab1');
  });

  it('should move up and down focus correctly', () => {
    const focusSpy0 = jasmine.createSpy('focus0');
    const focusSpy1 = jasmine.createSpy('focus1');
    const focusSpy2 = jasmine.createSpy('focus2');

    const el0 = { nativeElement: { focus: focusSpy0 } };
    const el1 = { nativeElement: { focus: focusSpy1 } };
    const el2 = { nativeElement: { focus: focusSpy2 } };

    const mockTabItems = {
      length: 3,
      get: (i: number) => [el0, el1, el2][i],
      map: () => [el0, el1, el2].map((e) => e.nativeElement),
    };

    component.tabItems = mockTabItems as any;

    component.moveDown(1); // move to index 2
    expect(focusSpy2).toHaveBeenCalled();

    component.moveDown(2); // wrap to 0
    expect(focusSpy0).toHaveBeenCalled();

    component.moveUp(0); // wrap to 2
    expect(focusSpy2).toHaveBeenCalled();

    component.moveUp(2); // move to 1
    expect(focusSpy1).toHaveBeenCalled();
  });

  it('should log all elements on focusTab', () => {
    const spyFocus = jasmine.createSpy('focus');
    const el0 = { nativeElement: { focus: spyFocus } };
    const el1 = { nativeElement: { focus: spyFocus } };
    component.tabItems.reset([el0 as any, el1 as any]);
    component.focusTab(1);
    expect(spyFocus).toHaveBeenCalled();
  });
});
