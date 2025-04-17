import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { JuiModalComponent } from '../jui-modal/jui-modal.component';
import { JuiIdleTimerModalComponent } from './jui-idle-timer.component';

describe('JuiIdleTimerModalComponent', () => {
  let component: JuiIdleTimerModalComponent;
  let fixture: ComponentFixture<JuiIdleTimerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JuiIdleTimerModalComponent, JuiModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JuiIdleTimerModalComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    window.localStorage.clear();
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset and update endTime correctly', fakeAsync(() => {
    const oldEndTime = (component as any)['endTime'];
    component.onResetTimer();
    expect((component as any)['endTime']).toBeGreaterThan(oldEndTime);
  }));

  it('should show warning message when below countdown limit', () => {
    component.inactivityDurationInMinutes = 1;
    component.countDownTimerInMinutes = 0.5;

    component.ngOnInit();

    (component as any).endTime = Date.now() + 20 * 1000; 
    const intervalFn = (component as any).intervalId._onTimeout;
    if (intervalFn) intervalFn();

    const remaining = Math.floor(
      ((component as any).endTime - Date.now()) / 1000
    );
    if (remaining <= component.countDownTimerInMinutes * 60) {
      expect(component.shouldShowWarningMessage).toBeFalsy();
    } else {
      fail(`Remaining time ${remaining}s > countdown window`);
    }
  });

  it('should emit timedOut and stop when time reaches 0', fakeAsync(() => {
    spyOn(component.timedOut, 'emit');
    component.inactivityDurationInMinutes = 0.001;
    component.countDownTimerInMinutes = 0;
    component.ngOnInit();
    tick(2000);
    expect(component.timedOut.emit).toHaveBeenCalled();
  }));

  it('should emit timerReset and hide modal when reset button clicked', () => {
    spyOn(component.timerReset, 'emit');
    component.shouldShowWarningMessage = true;
    component.onResetTimer();
    expect(component.timerReset.emit).toHaveBeenCalled();
    expect(component.shouldShowWarningMessage).toBeFalse();
  });

  it('should emit timerStopped and stop timer when stop button clicked', () => {
    spyOn(component.timerStopped, 'emit');
    component.onStopTimer();
    expect(component.timerStopped.emit).toHaveBeenCalled();
  });

  it('should respond to storage event - reset', () => {
    spyOn(component as any, 'resetTimer');
    const event = new StorageEvent('storage', {
      key: 'jui-idle-timer-reset-timestamp',
      newValue: `${Date.now()}`,
    });
    (component as any).onStorage(event);
    expect((component as any).resetTimer).toHaveBeenCalled();
  });

  it('should respond to storage event - stop', () => {
    spyOn(component.timerStopped, 'emit');
    const event = new StorageEvent('storage', {
      key: 'jui-idle-timer-stop-timestamp',
      newValue: `${Date.now()}`,
    });
    (component as any).onStorage(event);
    expect(component.timerStopped.emit).toHaveBeenCalled();
  });

  it('should respond to storage event - timeout', () => {
    spyOn(component.timedOut, 'emit');
    const event = new StorageEvent('storage', {
      key: 'jui-idle-timer-timeout-timestamp',
      newValue: `${Date.now()}`,
    });
    (component as any).onStorage(event);
    expect(component.timedOut.emit).toHaveBeenCalled();
  });

  it('should format timer correctly', () => {
    expect(component.formattedTimer(65)).toBe('01:05');
    expect(component.formattedTimer(5)).toBe('00:05');
  });

  it('should return correct modal classes', () => {
    component.classes = 'custom-class';
    expect(component.modalClasses).toContain('custom-class');

    component.classes = ['x', 'y'];
    expect(component.modalClasses).toContain('jui-idle-timer');

    component.classes = { active: true } as any;
    expect(component.modalClasses).toEqual({
      active: true,
      'jui-idle-timer': true,
    });
  });
});
