import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuiButtonComponent } from './jui-button.component';

describe('JuiButtonComponent', () => {
  let component: JuiButtonComponent;
  let fixture: ComponentFixture<JuiButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JuiButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JuiButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
