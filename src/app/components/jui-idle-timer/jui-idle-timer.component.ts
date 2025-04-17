import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { JuiModalComponent } from '../jui-modal/jui-modal.component';

@Component({
  selector: 'jui-idle-timer',
  standalone: true,
  templateUrl: './jui-idle-timer.component.html',
  imports: [JuiModalComponent],
  styleUrls: ['./jui-idle-timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JuiIdleTimerComponent implements OnInit, OnDestroy {
  @Input() a11yMessages = {
    stopTimerButtonAriaLabel: 'Stop Timer',
    resetTimerButtonAriaLabel: 'Reset Timer',
  };
  @Input() messages = {
    stopTimerButtonLabel: 'Stop Timer',
    resetTimerButtonLabel: 'Reset Timer',
  };
  @Input() inactivityDurationInMinutes = 0.1; // 6 seconds for testing
  @Input() countDownTimerInMinutes = 0.05; // 3 seconds for testing
  @Input() activityEvents: string[] = []; // Disable for testing
  @Input() height = '20rem';
  @Input() width = '50rem';
  @Input() eventThrottleInMilliseconds = 500;
  @Input() teleportTo = 'body';
  @Input() appContentId = 'app';
  @Input() ariaLabelledby = '';
  @Input() modalClasses: string | string[] | Record<string, boolean> = '';

  @Output() timerReset = new EventEmitter<void>();
  @Output() timerStopped = new EventEmitter<void>();
  @Output() timedOut = new EventEmitter<void>();

  shouldShowWarningMessage = false;
  timeLeft!: number;

  private intervalId: any;
  private readonly LOCAL_STORAGE_KEYS = {
    RESET: 'jui-idle-timer-reset-timestamp',
    TIMEOUT: 'jui-idle-timer-timeout-timestamp',
    STOPPED: 'jui-idle-timer-stop-timestamp',
  };

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.timeLeft = this.inactivityDurationInMinutes * 60;
    this.startTimer();
    this.addActivityListeners();
    window.addEventListener('storage', this.onStorage);
    localStorage.setItem(this.LOCAL_STORAGE_KEYS.RESET, `${Date.now()}`);
  }

  ngOnDestroy(): void {
    this.clearAll();
  }

  formattedTimer(secs: number): string {
    const minutes = Math.floor(secs / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (secs % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  startTimer(): void {
    const start = Date.now();
    this.intervalId = setInterval(() => {
      const passed = Math.floor((Date.now() - start) / 1000);
      this.timeLeft = this.inactivityDurationInMinutes * 60 - passed;
      console.log('[IdleTimer] Time left:', this.timeLeft);
      this.onChangeTimeLeft(this.timeLeft);
      this.cdr.markForCheck();
    }, 1000);
  }

  resetTimer(): void {
    this.clearTimer();
    this.startTimer();
  }

  clearTimer(): void {
    clearInterval(this.intervalId);
    this.shouldShowWarningMessage = false;
    this.timeLeft = this.inactivityDurationInMinutes * 60;
    this.cdr.markForCheck();
  }

  clearAll(): void {
    this.clearTimer();
    this.removeActivityListeners();
    window.removeEventListener('storage', this.onStorage);
  }

  onResetTimer(): void {
    localStorage.setItem(this.LOCAL_STORAGE_KEYS.RESET, `${Date.now()}`);
    this.timerReset.emit();
    this.resetTimer();
  }

  onStopTimer(): void {
    localStorage.setItem(this.LOCAL_STORAGE_KEYS.STOPPED, `${Date.now()}`);
    this.timerStopped.emit();
    this.clearAll();
  }

  onBackdropClick(): void {
    console.log('[IdleTimer] Backdrop clicked');
    this.onResetTimer();
    this.shouldShowWarningMessage = false;
    this.cdr.markForCheck();
  }

  onChangeTimeLeft(time: number): void {
    if (
      time <= this.countDownTimerInMinutes * 60 &&
      !this.shouldShowWarningMessage
    ) {
      console.log('[IdleTimer] Showing modal...');
      this.shouldShowWarningMessage = true;
      this.cdr.markForCheck();
    }
    if (time <= 0) {
      console.log('[IdleTimer] Timeout triggered.');
      localStorage.setItem(this.LOCAL_STORAGE_KEYS.TIMEOUT, `${Date.now()}`);
      this.timedOut.emit();
      this.clearAll();
    }
  }

  private onStorage = (event: StorageEvent): void => {
    if (event.key === this.LOCAL_STORAGE_KEYS.RESET) {
      this.resetTimer();
    } else if (event.key === this.LOCAL_STORAGE_KEYS.TIMEOUT) {
      this.timedOut.emit();
      this.clearAll();
    } else if (event.key === this.LOCAL_STORAGE_KEYS.STOPPED) {
      this.timerStopped.emit();
      this.clearAll();
    }
  };

  private addActivityListeners(): void {
    this.activityEvents.forEach((event) =>
      window.addEventListener(event, this.throttledReset, true)
    );
  }

  private removeActivityListeners(): void {
    this.activityEvents.forEach((event) =>
      window.removeEventListener(event, this.throttledReset, true)
    );
  }

  private throttledReset = this.throttle(() => {
    if (this.timeLeft > this.countDownTimerInMinutes * 60) {
      this.onResetTimer();
    }
  }, this.eventThrottleInMilliseconds);

  private throttle(func: () => void, limit: number): () => void {
    let inThrottle: boolean;
    return () => {
      if (!inThrottle) {
        func();
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }
}
