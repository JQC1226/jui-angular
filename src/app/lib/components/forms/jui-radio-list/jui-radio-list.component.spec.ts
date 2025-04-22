import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JuiRadioListComponent } from './jui-radio-list.component';
import { Component } from '@angular/core';
import { JuiRadioButtonComponent } from './jui-radio-button/jui-radio-button.component';

@Component({
  template: `
    <jui-radio-list
      [selectedValue]="selected"
      (selectedValueChange)="onChange($event)"
    >
      <jui-radio-button value="one">One</jui-radio-button>
      <jui-radio-button value="two">Two</jui-radio-button>
    </jui-radio-list>
  `,
  standalone: true,
  imports: [JuiRadioListComponent, JuiRadioButtonComponent],
})
class TestHostComponent {
  selected = 'one';
  onChange(value: string) {
    this.selected = value;
  }
}

describe('JuiRadioListComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render and select a radio button', () => {
    const radioInputs = fixture.nativeElement.querySelectorAll('input');
    expect(radioInputs.length).toBe(2);

    radioInputs[1].click();
    fixture.detectChanges();
    expect(host.selected).toBe('two');
  });

  it('should update selected value when clicked', () => {
    const secondRadio = fixture.nativeElement.querySelectorAll('input')[1];
    secondRadio.click();
    fixture.detectChanges();
    expect(host.selected).toBe('two');
  });
});
