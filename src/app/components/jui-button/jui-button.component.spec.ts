import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JuiButtonComponent } from './jui-button.component';
import { By } from '@angular/platform-browser';

describe('JuiButtonComponent', () => {
  let component: JuiButtonComponent;
  let fixture: ComponentFixture<JuiButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JuiButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JuiButtonComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit action on click', () => {
    spyOn(component.action, 'emit');

    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('button'));
    btn.triggerEventHandler('click', new Event('click'));

    expect(component.action.emit).toHaveBeenCalled();
  });

  it('should show a11y and visible label when a11y label is provided', () => {
    component.messages = { buttonLabel: 'Click me' };
    component.a11yMessages = { buttonLabel: 'Click the button to continue' };
    fixture.detectChanges();

    const hidden = fixture.debugElement.query(By.css('.a11y'));
    const visible = fixture.debugElement.query(By.css('[aria-hidden="true"]'));

    expect(hidden.nativeElement.textContent).toContain(
      'Click the button to continue'
    );
    expect(visible.nativeElement.textContent).toContain('Click me');
  });

  it('should fall back to visible label when no a11y label is provided', () => {
    component.messages = { buttonLabel: 'Only visible label' };
    component.a11yMessages = {};
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.textContent.trim()).toBe('Only visible label');
  });
});
