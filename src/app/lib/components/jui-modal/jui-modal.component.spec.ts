import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JuiModalComponent } from './jui-modal.component';
import { By } from '@angular/platform-browser';
import { ElementRef, NO_ERRORS_SCHEMA } from '@angular/core';

describe('JuiModalComponent', () => {
  let fixture: ComponentFixture<JuiModalComponent>;
  let component: JuiModalComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JuiModalComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(JuiModalComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    document.body.style.overflow = '';
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set overflow to hidden on init if modelValue is true', () => {
    component.modelValue = true;
    fixture.detectChanges();
    component.ngAfterViewInit();
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('should reset overflow on destroy', () => {
    document.body.style.overflow = 'hidden';
    component.ngOnDestroy();
    expect(document.body.style.overflow).toBe('');
  });

  it('should emit false when close() is called', () => {
    spyOn(component.modelValueChange, 'emit');
    component.close();
    expect(component.modelValueChange.emit).toHaveBeenCalledWith(false);
  });

  it('should emit false when escape key is pressed and not persistent', () => {
    spyOn(component, 'close');
    component.persistent = false;
    component.handleEscape(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(component.close).toHaveBeenCalled();
  });

  it('should NOT emit when escape key is pressed and persistent', () => {
    spyOn(component, 'close');
    component.persistent = true;
    component.handleEscape(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(component.close).not.toHaveBeenCalled();
  });

  it('should emit false when clicking outside the modal and not persistent', () => {
    spyOn(component, 'close');
    const fakeEl = document.createElement('div');
    component.persistent = false;
    component.modalRef = { nativeElement: fakeEl } as ElementRef;
    component.onClickOutside({ target: fakeEl } as unknown as MouseEvent);
    expect(component.close).toHaveBeenCalled();
  });

  it('should NOT emit when clicking outside and persistent is true', () => {
    spyOn(component, 'close');
    const fakeEl = document.createElement('div');
    component.persistent = true;
    component.modalRef = { nativeElement: fakeEl } as ElementRef;
    component.onClickOutside({ target: fakeEl } as unknown as MouseEvent);
    expect(component.close).not.toHaveBeenCalled();
  });

  it('should NOT emit if click target is not modal element', () => {
    spyOn(component, 'close');
    const fakeEl = document.createElement('div');
    const otherEl = document.createElement('span');
    component.modalRef = { nativeElement: fakeEl } as ElementRef;
    component.persistent = false;
    component.onClickOutside({ target: otherEl } as unknown as MouseEvent);
    expect(component.close).not.toHaveBeenCalled();
  });

  it('should render modal with correct width and height', () => {
    component.modelValue = true;
    component.width = '800px';
    component.height = '600px';
    fixture.detectChanges();
    const contentEl = fixture.debugElement.query(
      By.css('.jui-modal-content')
    ).nativeElement;
    expect(contentEl.style.width).toBe('800px');
    expect(contentEl.style.height).toBe('600px');
  });

  it('should render close button if closeButton is true', () => {
    component.modelValue = true;
    component.closeButton = true;
    fixture.detectChanges();
    const closeBtn = fixture.debugElement.query(By.css('.jui-modal-close'));
    expect(closeBtn).toBeTruthy();
  });

  it('should not render close button if closeButton is false', () => {
    component.modelValue = true;
    component.closeButton = false;
    fixture.detectChanges();
    const closeBtn = fixture.debugElement.query(By.css('.jui-modal-close'));
    expect(closeBtn).toBeFalsy();
  });

  it('should emit close when close button is clicked', () => {
    component.modelValue = true;
    component.closeButton = true;
    fixture.detectChanges();
    spyOn(component, 'close');
    const closeBtn = fixture.debugElement.query(By.css('.jui-modal-close'));
    closeBtn.nativeElement.click();
    expect(component.close).toHaveBeenCalled();
  });
});
