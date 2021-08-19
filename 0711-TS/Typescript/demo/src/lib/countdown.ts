import { EventEmitter } from 'eventemitter3';

export interface RemainTimeData {
    /** 天数 */
    days: number;
    /**
     * 小时数
     */
    hours: number;
    /**
     * 分钟数
     */
    minutes: number;
    /**
     * 秒数
     */
    seconds: number;
    /**
     * 毫秒数
     */
    count: number;
}

export type CountdownCallback = (remainTimeData: RemainTimeData, remainTime: number) => void;

// 倒计时状态
enum CountdownStatus {
    running,
    paused,
    stoped,
}

/**
 * 倒计时事件
 */
export enum CountdownEventName {
    START = 'start',
    STOP = 'stop',
    RUNNING = 'running',
}

interface CountdownEventMap {
    [CountdownEventName.START]: [];
    [CountdownEventName.STOP]: [];
    [CountdownEventName.RUNNING]: [RemainTimeData, number];
}

export function fillZero(num: number) {
    return `0${num}`.slice(-2);
}

export class Countdown extends EventEmitter<CountdownEventMap> {
    private static COUNT_IN_MILLISECOND: number = 1 * 100;
    private static SECOND_IN_MILLISECOND: number = 10 * Countdown.COUNT_IN_MILLISECOND;
    private static MINUTE_IN_MILLISECOND: number = 60 * Countdown.SECOND_IN_MILLISECOND;
    private static HOUR_IN_MILLISECOND: number = 60 * Countdown.MINUTE_IN_MILLISECOND;
    private static DAY_IN_MILLISECOND: number = 24 * Countdown.HOUR_IN_MILLISECOND;

    private endTime: number;
    private remainTime: number = 0;
    private status: CountdownStatus = CountdownStatus.stoped;
    private step: number;

    constructor(endTime: number, step: number = 1e3) {
        super();

        this.endTime = endTime;
        this.step = step;
    
        // 初始化countdown实例的时候, 直接开始倒计时
        this.start();
    }

    /** 开始倒计时 */
    public start() {
        // 发布事件：开始倒计时
        this.emit(CountdownEventName.START);

        // 更新状态为 倒计时进行中
        this.status = CountdownStatus.running;
        this.countdown();
    }

    /** 结束倒计时 */
    public stop() {
        // 发布事件：结束倒计时
        this.emit(CountdownEventName.STOP);

        // 更新状态为 倒计时结束
        this.status = CountdownStatus.stoped;
    }

    private countdown() {
        if (this.status !== CountdownStatus.running) {
            return;
        }

        // 保证获取到的remainTime >= 0
        this.remainTime = Math.max(this.endTime - Date.now(), 0);

        // 发布事件 倒计时进行中, 并且传递时间数据
        this.emit(CountdownEventName.RUNNING, this.parseRemainTime(this.remainTime), this.remainTime);

        if (this.remainTime > 0) {
            // 递归countdown
            setTimeout(() => this.countdown(), this.step);
        } else {
            this.stop();
        }
    }

    private parseRemainTime(remainTime: number): RemainTimeData {
        let time = remainTime;

        const days = Math.floor(time / Countdown.DAY_IN_MILLISECOND);
        time = time % Countdown.DAY_IN_MILLISECOND;

        const hours = Math.floor(time / Countdown.HOUR_IN_MILLISECOND);
        time = time % Countdown.HOUR_IN_MILLISECOND;

        const minutes = Math.floor(time / Countdown.MINUTE_IN_MILLISECOND);
        time = time % Countdown.MINUTE_IN_MILLISECOND;

        const seconds = Math.floor(time / Countdown.SECOND_IN_MILLISECOND);
        time = time % Countdown.SECOND_IN_MILLISECOND;

        const count = Math.floor(time / Countdown.COUNT_IN_MILLISECOND);

        return {
            days,
            hours,
            minutes,
            seconds,
            count,
        };
    }
}
