import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JuiLoadingSpinnerComponent } from './jui-loading-spinner.component';
import { By } from '@angular/platform-browser';

describe('JuiLoadingSpinnerComponent', () => {
  let fixture: ComponentFixture<JuiLoadingSpinnerComponent>;
  let component: JuiLoadingSpinnerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JuiLoadingSpinnerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JuiLoadingSpinnerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not render spinner if isLoading is false', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('.jui-loading-spinner'));
    expect(el).toBeNull();
  });

  it('should render spinner if isLoading is true', () => {
    component.isLoading = true;
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('.jui-loading-spinner'));
    expect(el).not.toBeNull();
  });

  it('should apply correct zIndex style', () => {
    component.isLoading = true;
    component.zIndex = 99;
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('.jui-loading-spinner'));
    expect(el.styles['z-index']).toBe('99');
  });

  it('should apply aria-label and tabindex correctly', () => {
    component.isLoading = true;
    component.isFocusable = true;
    component.a11yMessages = { loadingSpinnerLabel: 'Please wait' };
    fixture.detectChanges();
    const span = fixture.debugElement.query(By.css('.loading-indicator'));
    expect(span.attributes['aria-label']).toBe('Please wait');
    expect(span.attributes['tabindex']).toBe('0');
  });
});
