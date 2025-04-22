import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JuiCommentInputComponent } from './jui-comment-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('JuiCommentInputComponent', () => {
  let component: JuiCommentInputComponent;
  let fixture: ComponentFixture<JuiCommentInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, JuiCommentInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JuiCommentInputComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should apply required and maxlength validators', () => {
    component.ariaRequired = true;
    component.maxLength = 10;
    component.ngOnInit();

    component.commentControl.markAsTouched();
    component.commentControl.updateValueAndValidity();

    component.commentControl.setValue('');
    expect(component.commentControl.hasError('required')).toBeTrue();

    component.commentControl.setValue('a'.repeat(11));
    expect(component.commentControl.hasError('maxlength')).toBeTrue();

    component.commentControl.setValue('hello');
    expect(component.commentControl.valid).toBeTrue();
  });

  it('should calculate charsRemaining correctly', () => {
    component.maxLength = 10;
    fixture.detectChanges();
    component.commentControl.setValue('hello');
    expect(component.charsRemaining).toBe(5);
  });

  it('should emit input event on input', () => {
    spyOn(component.input, 'emit');
    fixture.detectChanges();
    const textarea = fixture.debugElement.query(
      By.css('textarea')
    ).nativeElement;
    textarea.value = 'Test input';
    textarea.dispatchEvent(new Event('input'));
    expect(component.input.emit).toHaveBeenCalledWith('Test input');
  });

  it('should emit blur event', () => {
    spyOn(component.blur, 'emit');
    fixture.detectChanges();
    const textarea = fixture.debugElement.query(
      By.css('textarea')
    ).nativeElement;
    textarea.dispatchEvent(new Event('blur'));
    expect(component.blur.emit).toHaveBeenCalled();
  });

  it('should emit focus event', () => {
    spyOn(component.focus, 'emit');
    fixture.detectChanges();
    const textarea = fixture.debugElement.query(
      By.css('textarea')
    ).nativeElement;
    textarea.dispatchEvent(new Event('focus'));
    expect(component.focus.emit).toHaveBeenCalled();
  });

  it('should emit enter event on Enter key', () => {
    spyOn(component.enter, 'emit');
    fixture.detectChanges();
    const textarea = fixture.debugElement.query(
      By.css('textarea')
    ).nativeElement;
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    textarea.dispatchEvent(event);
    expect(component.enter.emit).toHaveBeenCalled();
  });

  it('should return proper remainingText message', () => {
    component.maxLength = 100;
    fixture.detectChanges();
    component.commentControl.setValue('a'.repeat(81));
    expect(component.remainingText).toContain('Characters Remaining');
    component.commentControl.setValue('a'.repeat(50));
    expect(component.remainingText).toContain('characters limit');
  });

  it('should return correct maxHeightStyle', () => {
    component.maxHeight = 150;
    expect(component.maxHeightStyle).toEqual({ maxHeight: '150px' });
  });

  it('should generate charRemainingId', () => {
    fixture.detectChanges();
    expect(component.charRemainingId).toMatch(/char-remaining-id-/);
  });
});
