import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JuiFormInputComponent } from './jui-form-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('JuiFormInputComponent', () => {
  let component: JuiFormInputComponent;
  let fixture: ComponentFixture<JuiFormInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, JuiFormInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JuiFormInputComponent);
    component = fixture.componentInstance;
    component.id = 'email';
    component.label = 'Email';
    component.modelValue = '';
    component.placeholder = 'Enter email';
    component.ariaRequired = true;
    component.clearButton = true;
    component.enableVerifyButton = true;
    component.verifyInProgress = false;
    component.verifySuccess = false;
    component.a11yMessages = {
      clearButtonAriaLabel: 'Clear input',
      verifyButtonAriaLabel: 'Verify input',
      verifiedIconAriaLabel: 'Verified',
      verifiedLiveMessage: 'Verified!',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit input event and update control', () => {
    spyOn(component.modelValueChange, 'emit');
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = 'test';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.inputControl.value).toBe('test');
    expect(component.modelValueChange.emit).toHaveBeenCalledWith('test');
  });

  it('should emit blur event with value', () => {
    spyOn(component.blurEvent, 'emit');
    component.inputControl.setValue('blur me');
    fixture.debugElement
      .query(By.css('input'))
      .nativeElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(component.blurEvent.emit).toHaveBeenCalledWith('blur me');
  });

  it('should emit focus event', () => {
    spyOn(component.focusEvent, 'emit');
    fixture.debugElement
      .query(By.css('input'))
      .nativeElement.dispatchEvent(new Event('focus'));
    fixture.detectChanges();
    expect(component.focusEvent.emit).toHaveBeenCalled();
  });

  it('should emit enter event on Enter key', () => {
    spyOn(component.blurEvent, 'emit');
    component.inputControl.setValue('value');
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    fixture.debugElement
      .query(By.css('input'))
      .nativeElement.dispatchEvent(event);
    expect(component.blurEvent.emit).toHaveBeenCalledWith('value');
  });

  it('should clear input and focus when clicking clear button', () => {
    spyOn(component.modelValueChange, 'emit');
    component.inputControl.setValue('clearme');
    fixture.detectChanges();
    fixture.debugElement.query(By.css('.clear-button')).nativeElement.click();
    fixture.detectChanges();
    expect(component.inputControl.value).toBe('');
    expect(component.modelValueChange.emit).toHaveBeenCalledWith('');
  });

  it('should emit verifyEvent on click', () => {
    spyOn(component.verifyEvent, 'emit');
    fixture.debugElement
      .query(By.css('.validation-button'))
      .nativeElement.click();
    expect(component.verifyEvent.emit).toHaveBeenCalled();
  });

  it('should apply required validator', () => {
    component.ngOnInit();
    component.inputControl.setValue('');
    component.inputControl.markAsTouched();
    component.inputControl.updateValueAndValidity();
    expect(component.inputControl.hasError('required')).toBeTrue();
  });

  it('should return liveMessage string if verified', () => {
    component.verifySuccess = true;
    component.label = 'Email';
    expect(component.liveMessage).toContain('Verified!');
  });
});
