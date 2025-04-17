import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { JuiModalComponent } from '../jui-modal/jui-modal.component';

@Component({
  selector: 'jui-idle-timer-modal',
  imports: [JuiModalComponent],
  templateUrl: './jui-idle-timer.component.html',
  styleUrls: ['./jui-idle-timer.component.scss'],
})
export class JuiIdleTimerModalComponent implements OnInit, OnDestroy {
  @Input() inactivityDurationInMinutes = 30;
  @Input() countDownTimerInMinutes = 5;
  @Input() activityEvents: string[] = ['click', 'keydown'];
  @Input() height = '20rem';
  @Input() width = '50rem';
  @Input() teleportTo = 'body';
  @Input() appContentId = 'app';
  @Input() ariaLabelledby = '';
  @Input() classes: string | string[] | { [key: string]: boolean } = '';
  @Input() a11yMessages = {
    stopTimerButtonAriaLabel: 'Stop Timer',
    resetTimerButtonAriaLabel: 'Reset Timer',
  };
  @Input() messages = {
    stopTimerButtonLabel: 'Stop Timer',
    resetTimerButtonLabel: 'Reset Timer',
  };

  @Output() timerReset = new EventEmitter<void>();
  @Output() timerStopped = new EventEmitter<void>();
  @Output() timedOut = new EventEmitter<void>();

  shouldShowWarningMessage = false;
  timeLeft = signal(0);
  private endTime = 0;
  private intervalId: any;

  get modalClasses(): Record<string, boolean> | string[] | string {
    if (Array.isArray(this.classes)) return [...this.classes, 'jui-idle-timer'];
    if (typeof this.classes === 'string')
      return `${this.classes} jui-idle-timer`;
    return {
      ...this.classes,
      'jui-idle-timer': true,
    };
  }

  ngOnInit(): void {
    this.resetTimer();
    this.addEventListeners();
    window.addEventListener('storage', this.onStorage);
  }

  ngOnDestroy(): void {
    this.clearAll();
  }

  onResetTimer(): void {
    window.localStorage.setItem(
      'jui-idle-timer-reset-timestamp',
      `${Date.now()}`
    );
    this.timerReset.emit();
    this.shouldShowWarningMessage = false;
    this.resetTimer();
  }

  onStopTimer(): void {
    window.localStorage.setItem(
      'jui-idle-timer-stop-timestamp',
      `${Date.now()}`
    );
    this.timerStopped.emit();
    this.clearAll();
  }

  private resetTimer(): void {
    this.clearTimer();
    const totalTime = this.inactivityDurationInMinutes * 60;
    this.endTime = Date.now() + totalTime * 1000;
    this.intervalId = setInterval(() => {
      const remaining = Math.floor((this.endTime - Date.now()) / 1000);
      this.timeLeft.set(Math.max(0, remaining));
      if (remaining <= this.countDownTimerInMinutes * 60) {
        this.shouldShowWarningMessage = true;
      }
      if (remaining <= 0) this.onTimeout();
    }, 1000);
  }

  private onTimeout(): void {
    window.localStorage.setItem(
      'jui-idle-timer-timeout-timestamp',
      `${Date.now()}`
    );
    this.timedOut.emit();
    this.clearAll();
  }

  private clearTimer(): void {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  private clearAll(): void {
    this.clearTimer();
    this.shouldShowWarningMessage = false;
    window.removeEventListener('storage', this.onStorage);
    this.removeEventListeners();
  }

  private addEventListeners(): void {
    this.activityEvents.forEach((event) =>
      window.addEventListener(event, this.throttledActivityReset, true)
    );
  }

  private removeEventListeners(): void {
    this.activityEvents.forEach((event) =>
      window.removeEventListener(event, this.throttledActivityReset, true)
    );
  }

  private throttledActivityReset = (() => {
    let last = 0;
    return () => {
      const now = Date.now();
      if (now - last > 500) {
        if (this.timeLeft() > this.countDownTimerInMinutes * 60) {
          this.onResetTimer();
        }
        last = now;
      }
    };
  })();

  private onStorage = (event: StorageEvent): void => {
    if (event.key === 'jui-idle-timer-reset-timestamp') {
      this.resetTimer();
    } else if (event.key === 'jui-idle-timer-stop-timestamp') {
      this.timerStopped.emit();
      this.clearAll();
    } else if (event.key === 'jui-idle-timer-timeout-timestamp') {
      this.timedOut.emit();
      this.clearAll();
    }
  };

  formattedTimer(seconds: number): string {
    const min = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const sec = Math.floor(seconds % 60)
      .toString()
      .padStart(2, '0');
    return `${min}:${sec}`;
  }

  get customMessage(): boolean {
    return false;
  }
}
