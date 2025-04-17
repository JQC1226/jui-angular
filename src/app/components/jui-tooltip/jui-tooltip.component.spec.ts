import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JuiTooltipComponent } from './jui-tooltip.component';
import { Component } from '@angular/core';

@Component({
  selector: 'test-host',
  template: `
    <jui-tooltip [text]="text" [disable]="disable" [options]="options">
      <button>Hover me</button>
    </jui-tooltip>
  `,
  standalone: true,
  imports: [JuiTooltipComponent],
})
class TestHostComponent {
  text = 'Hello Tooltip';
  disable = false;
  options = {};
}

describe('JuiTooltipComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: JuiTooltipComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    const tooltipDebugElement = fixture.debugElement.children[0];
    component = tooltipDebugElement.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init tippy instance in ngAfterViewInit', () => {
    component.ngAfterViewInit();
    expect((component as any).tippyInstance).toBeTruthy();
  });

  it('should show tooltip if instance is available', () => {
    component.ngAfterViewInit();
    const showSpy = spyOn((component as any).tippyInstance!, 'show');
    component.showTooltip();
    expect(showSpy).toHaveBeenCalled();
  });

  it('should not show tooltip if instance is null', () => {
    (component as any).tippyInstance = null;
    expect(() => component.showTooltip()).not.toThrow();
  });

  it('should destroy tooltip instance on ngOnDestroy', () => {
    component.ngAfterViewInit();
    const destroySpy = spyOn((component as any).tippyInstance!, 'destroy');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
  });

  it('should not destroy if tippyInstance is null', () => {
    (component as any).tippyInstance = null;
    expect(() => component.destroyTooltip()).not.toThrow();
  });

  it('should disable tooltip when disable=true', () => {
    component.ngAfterViewInit();
    const disableSpy = spyOn((component as any).tippyInstance!, 'disable');
    component.disableTooltip(true);
    expect(disableSpy).toHaveBeenCalled();
  });

  it('should enable tooltip when disable=false', () => {
    component.ngAfterViewInit();
    const enableSpy = spyOn((component as any).tippyInstance!, 'enable');
    component.disableTooltip(false);
    expect(enableSpy).toHaveBeenCalled();
  });

  it('should not disable if tippyInstance is null', () => {
    (component as any).tippyInstance = null;
    expect(() => component.disableTooltip(true)).not.toThrow();
  });

  it('should not create tooltip if no child element exists', async () => {
    // Create tooltip component directly without any children
    const blankFixture = TestBed.createComponent(JuiTooltipComponent);
    const blankComponent = blankFixture.componentInstance;

    blankFixture.detectChanges();

    const wrapper = blankComponent['tooltipWrapper'].nativeElement;
    expect(wrapper.firstElementChild).toBeNull();

    blankComponent.ngAfterViewInit();
    expect((blankComponent as any).tippyInstance).toBeNull();
  });


  it('should update tooltip content', () => {
    component.ngAfterViewInit();
    const setContentSpy = spyOn(
      (component as any).tippyInstance!,
      'setContent'
    );
    component.updateText('New Tooltip');
    expect(setContentSpy).toHaveBeenCalledWith('New Tooltip');
  });

  it('should not update content if tippyInstance is null', () => {
    (component as any).tippyInstance = null;
    expect(() => component.updateText('Ignore')).not.toThrow();
  });
});
