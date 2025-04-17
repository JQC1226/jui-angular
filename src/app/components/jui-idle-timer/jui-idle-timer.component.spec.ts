import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { JuiIdleTimerComponent } from './jui-idle-timer.component';
import { JuiModalComponent } from '../jui-modal/jui-modal.component';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('JuiIdleTimerComponent', () => {
  let component: JuiIdleTimerComponent;
  let fixture: ComponentFixture<JuiIdleTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JuiIdleTimerComponent, JuiModalComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(JuiIdleTimerComponent);
    component = fixture.componentInstance;

    component.activityEvents = [];
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
    component.ngOnDestroy();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit timerReset when reset is triggered', () => {
    spyOn(component.timerReset, 'emit');
    component.onResetTimer();
    expect(component.timerReset.emit).toHaveBeenCalled();
  });

  it('should emit timerStopped when stop is triggered', () => {
    spyOn(component.timerStopped, 'emit');
    component.onStopTimer();
    expect(component.timerStopped.emit).toHaveBeenCalled();
  });

  it('should emit timedOut when timer runs out', fakeAsync(() => {
    spyOn(component.timedOut, 'emit');
    component.timeLeft = 0;
    component.onChangeTimeLeft(0);

    expect(component.timedOut.emit).toHaveBeenCalled();
    expect(component.shouldShowWarningMessage).toBeFalse();
  }));

  it('should display modal when countdown reached', fakeAsync(() => {
    component.timeLeft = component.countDownTimerInMinutes * 60 - 1;
    component.onChangeTimeLeft(component.timeLeft);

    fixture.detectChanges();

    expect(component.shouldShowWarningMessage).toBeTrue();
  }));

  it('should reset timer on backdrop click', () => {
    spyOn(component, 'onResetTimer').and.callThrough();

    component.shouldShowWarningMessage = true;
    component.onBackdropClick();

    expect(component.onResetTimer).toHaveBeenCalled();
    expect(component.shouldShowWarningMessage).toBeFalse();
  });

  it('should correctly format timer', () => {
    expect(component.formattedTimer(65)).toEqual('01:05');
    expect(component.formattedTimer(5)).toEqual('00:05');
  });

  it('should handle localStorage reset event', () => {
    spyOn(component, 'resetTimer');

    const event = new StorageEvent('storage', {
      key: 'jui-idle-timer-reset-timestamp',
    });
    window.dispatchEvent(event);

    expect(component.resetTimer).toHaveBeenCalled();
  });

  it('should handle localStorage timeout event', () => {
    spyOn(component.timedOut, 'emit');

    const event = new StorageEvent('storage', {
      key: 'jui-idle-timer-timeout-timestamp',
    });
    window.dispatchEvent(event);

    expect(component.timedOut.emit).toHaveBeenCalled();
  });

  it('should handle localStorage stopped event', () => {
    spyOn(component.timerStopped, 'emit');

    const event = new StorageEvent('storage', {
      key: 'jui-idle-timer-stop-timestamp',
    });
    window.dispatchEvent(event);

    expect(component.timerStopped.emit).toHaveBeenCalled();
  });

  it('should cleanup properly on destroy', () => {
    spyOn(component, 'clearAll');
    component.ngOnDestroy();

    expect(component.clearAll).toHaveBeenCalled();
  });

  it('should throttle reset event', fakeAsync(() => {
    component.eventThrottleInMilliseconds = 500;
    spyOn(component, 'onResetTimer');

    component['throttledReset']();
    component['throttledReset']();
    component['throttledReset']();

    expect(component.onResetTimer).toHaveBeenCalledTimes(1);

    tick(500);

    component['throttledReset']();

    expect(component.onResetTimer).toHaveBeenCalledTimes(2);
  }));
});
