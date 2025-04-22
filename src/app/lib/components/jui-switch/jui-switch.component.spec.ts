import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JuiSwitchComponent } from './jui-switch.component';
import { By } from '@angular/platform-browser';

describe('JuiSwitchComponent', () => {
  let component: JuiSwitchComponent;
  let fixture: ComponentFixture<JuiSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JuiSwitchComponent], // standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(JuiSwitchComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render input with correct id and text', () => {
    component.id = 'switch-1';
    component.text = 'Toggle Me';
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('input'));
    const label = fixture.debugElement.query(By.css('label'));
    const textSpan = fixture.debugElement.query(By.css('.text'));

    expect(input.attributes['id']).toBe('switch-1');
    expect(label.attributes['for']).toBe('switch-1');
    expect(textSpan.nativeElement.textContent).toContain('Toggle Me');
  });

  it('should not render text span if no text is provided', () => {
    component.id = 'switch-2';
    component.text = '';
    fixture.detectChanges();

    const textSpan = fixture.debugElement.query(By.css('.text'));
    expect(textSpan).toBeNull();
  });

  it('should emit modelValueChange when toggled by click', () => {
    spyOn(component.modelValueChange, 'emit');

    component.id = 'switch-3';
    component.modelValue = false;
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('input'));
    input.nativeElement.checked = true;
    input.triggerEventHandler('input', { target: input.nativeElement });

    expect(component.modelValueChange.emit).toHaveBeenCalledWith(true);
  });

  it('should not emit when Enter is pressed and switch is disabled', () => {
    spyOn(component.modelValueChange, 'emit');

    component.id = 'switch-5';
    component.modelValue = true;
    component.disabled = true;
    fixture.detectChanges();

    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    const input = fixture.debugElement.query(By.css('input'));
    input.triggerEventHandler('keydown.enter', event);

    expect(component.modelValueChange.emit).not.toHaveBeenCalled();
  });

  it('should set input checked based on modelValue', () => {
    component.id = 'switch-6';
    component.modelValue = true;
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('input'));
    expect(input.nativeElement.checked).toBeTrue();
  });

  it('should set input disabled when disabled is true', () => {
    component.id = 'switch-7';
    component.disabled = true;
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('input'));
    expect(input.nativeElement.disabled).toBeTrue();
  });
});
