import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JuiDropdownComponent } from './jui-dropdown.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('JuiDropdownComponent', () => {
  let component: JuiDropdownComponent;
  let fixture: ComponentFixture<JuiDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, JuiDropdownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JuiDropdownComponent);
    component = fixture.componentInstance;
    component.id = 'test-dropdown';
    component.label = 'Test Label';
    component.modelValue = '';
    component.options = [
      { id: '1', desc: 'One' },
      { id: '2', desc: 'Two' },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render options', () => {
    fixture.detectChanges();
    const options = fixture.debugElement.queryAll(By.css('option'));
    expect(options.length).toBe(2);
    expect(options[0].nativeElement.textContent).toContain('One');
  });

  it('should emit selected option', () => {
    spyOn(component.selectedOption, 'emit');
    const select = fixture.debugElement.query(By.css('select')).nativeElement;
    select.value = select.options[1].value;
    select.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.selectedOption.emit).toHaveBeenCalledWith({
      id: '2',
      desc: 'Two',
    });
  });

  it('should emit blur event', () => {
    spyOn(component.blurEvent, 'emit');
    const select = fixture.debugElement.query(By.css('select')).nativeElement;
    select.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(component.blurEvent.emit).toHaveBeenCalled();
  });

  it('should emit focus event', () => {
    spyOn(component.focusEvent, 'emit');
    const select = fixture.debugElement.query(By.css('select')).nativeElement;
    select.dispatchEvent(new Event('focus'));
    fixture.detectChanges();
    expect(component.focusEvent.emit).toHaveBeenCalled();
  });

  it('should emit click event', () => {
    spyOn(component.clickEvent, 'emit');
    const select = fixture.debugElement.query(By.css('select')).nativeElement;
    select.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.clickEvent.emit).toHaveBeenCalled();
  });

  it('should emit blur event on Enter key', () => {
    spyOn(component.blurEvent, 'emit');
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    const select = fixture.debugElement.query(By.css('select')).nativeElement;
    select.dispatchEvent(event);
    fixture.detectChanges();
    expect(component.blurEvent.emit).toHaveBeenCalled();
  });

  it('should apply required validator if ariaRequired is true', () => {
    component.ariaRequired = true;
    component.ngOnInit();
    component.control.setValue('');
    component.control.markAsTouched();
    fixture.detectChanges();
    expect(component.control.hasError('required')).toBeTrue();
  });
});
