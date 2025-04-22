import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JuiActionDropdownComponent } from './jui-action-dropdown.component';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

describe('JuiActionDropdownComponent', () => {
  let component: JuiActionDropdownComponent;
  let fixture: ComponentFixture<JuiActionDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, JuiActionDropdownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JuiActionDropdownComponent);
    component = fixture.componentInstance;
    component.allOptions = [
      { options: [{ optionName: 'Option 1' }, { optionName: 'Option 2' }] },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit selected option on selectAction', () => {
    const option = { optionName: 'Option 1' };
    const serialized = JSON.stringify(option);

    spyOn(component.selectedOptionEvent, 'emit');

    component.selectedIndex = serialized;

    const mockEvent = {
      target: { value: serialized },
    } as unknown as Event;

    component.selectAction(mockEvent);
    expect(component.selectedOptionEvent.emit).toHaveBeenCalledWith(option);
  });

  it('should emit blur event on blur', () => {
    spyOn(component.blurEvent, 'emit');
    const select = fixture.debugElement.query(By.css('select')).nativeElement;
    select.dispatchEvent(new Event('blur'));
    expect(component.blurEvent.emit).toHaveBeenCalled();
  });

  it('should apply aria attributes correctly', () => {
    component.title = 'My Dropdown';
    component.a11yMessages = {
      dropdownDescribedby: 'desc-id',
      dropdownLabel: 'Label',
    };
    fixture.detectChanges();

    const select = fixture.debugElement.query(By.css('select')).nativeElement;
    expect(select.getAttribute('aria-label')).toBe('Label');
    expect(select.getAttribute('aria-describedby')).toBe('desc-id');
  });
});
