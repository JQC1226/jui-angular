import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JuiRadioButtonComponent } from './jui-radio-button.component';

describe('JuiRadioButtonComponent', () => {
  let component: JuiRadioButtonComponent;
  let fixture: ComponentFixture<JuiRadioButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JuiRadioButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JuiRadioButtonComponent);
    component = fixture.componentInstance;
    component.value = 'test';
    fixture.detectChanges();
  });

  it('should emit selectRadio when clicked', () => {
    spyOn(component.selectRadio, 'emit');
    component.onClick();
    expect(component.selectRadio.emit).toHaveBeenCalledWith('test');
  });

  it('should emit enterRadio when enter is triggered', () => {
    spyOn(component.enterRadio, 'emit');
    component.onEnter();
    expect(component.enterRadio.emit).toHaveBeenCalledWith('test');
  });

  it('should emit focusRadio when focused', () => {
    spyOn(component.focusRadio, 'emit');
    component.onFocus();
    expect(component.focusRadio.emit).toHaveBeenCalledWith('test');
  });

  it('should emit blurRadio when blurred', () => {
    spyOn(component.blurRadio, 'emit');
    component.onBlur();
    expect(component.blurRadio.emit).toHaveBeenCalledWith('test');
  });
});
