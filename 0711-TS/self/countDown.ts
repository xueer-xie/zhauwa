import { EventEmitter } from 'eventemitter';

export enum CountdownEventName {
  START = 'start',
  STOP = 'stop',
  RUNNING = 'running',
}

enum CountdownStatus {
  running,
  paused,
  stoped,
}

export interface RemainTimeData {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  count: number;
}

interface CountdownEventMap {
  [CountdownEventName.START]: [];
  [CountdownEventName.STOP]: [];
  [CountdownEventName.RUNNING]: [RemainTimeData];
}

export class Countdown extends EventEmitter<CountdownEventMap> {
  private static COUNT_IN_MILLSECOND: number = 1 * 100; 
  private static SECOND_IN_MILLSECOND: number = 10 * this.COUNT_IN_MILLSECOND; 
  private static MINUTE_IN_MILLSECOND: number = 60* this.SECOND_IN_MILLSECOND; 
  private static HOUR_IN_MILLSECOND: number = 60 * this.MINUTE_IN_MILLSECOND; 
  private static DAY_IN_MILLSECOND: number = 24 * this.HOUR_IN_MILLSECOND; 


  private endTime: number;
  private step: number;
  private status: CountdownStatus = CountdownStatus.stoped;
  private remainTime: number = 0;

  constructor(endTime: number, step: number = 1e3) {
    super();

    this.endTime = endTime;
    this.step = step;

    this.start();

  }

  public start() {
    this.emit(CountdownEventName.START);
    this.status = CountdownStatus.running;

    this.countdown();
  }

  public stop() {
    this.emit(CountdownEventName.STOP);
    this.status = CountdownStatus.stoped;
  }

  private countdown() {
    if (this.status !== CountdownStatus.running) {
      return;
    }

    this.remainTime = Math.max(this.endTime - Date.now(), 0);

    this.emit(CountdownEventName.RUNNING, this.parseRemainTime(this.remainTime));

    if (this.remainTime > 0) {
      setTimeout(() => this.countdown(), this.step);
    } else {
      this.stop();
    }
  }

  private parseRemainTime(remainTime: number): RemainTimeData {
    let time = remainTime;

    const days = Math.floor(time / Countdown.DAY_IN_MILLSECOND);
    time = time % Countdown.DAY_IN_MILLSECOND;

    const hours = Math.floor(time / Countdown.HOUR_IN_MILLSECOND);
    time = time % Countdown.HOUR_IN_MILLSECOND;

    const minutes = Math.floor(time / Countdown.MINUTE_IN_MILLSECOND);
    time = time % Countdown.MINUTE_IN_MILLSECOND;

    const seconds = Math.floor(time / Countdown.SECOND_IN_MILLSECOND);
    time = time % Countdown.SECOND_IN_MILLSECOND;

    const count = Math.floor(time / Countdown.COUNT_IN_MILLSECOND);

    return {
      days,
      hours,
      minutes,
      seconds,
      count,
    };
  }
}

const countdown = new Countdown();
