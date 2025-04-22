import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuiInputDropdownComponent } from './jui-input-dropdown.component';

describe('JuiInputDropdownComponent', () => {
  let component: JuiInputDropdownComponent;
  let fixture: ComponentFixture<JuiInputDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JuiInputDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JuiInputDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
