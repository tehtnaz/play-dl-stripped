/**
 * Timer Class.
 *
 * setTimeout + extra features ( re-starting, pausing, resuming ).
 */
export class Timer {
    /**
     * Boolean for checking if Timer is destroyed or not.
     */
    private destroyed: boolean;
    /**
     * Boolean for checking if Timer is paused or not.
     */
    private paused: boolean;
    /**
     * setTimeout function
     */
    private timer: NodeJS.Timer;
    /**
     * Callback to be executed once timer finishes.
     */
    private callback: () => void;
    /**
     * Seconds time when it is started.
     */
    private time_start: number;
    /**
     * Total time left.
     */
    private time_left: number;
    /**
     * Total time given by user [ Used only for re-using timer. ]
     */
    private time_total: number;
    /**
     * Constructor for Timer Class
     * @param callback Function to execute when timer is up.
     * @param time Total time to wait before execution.
     */
    constructor(callback: () => void, time: number) {
        this.callback = callback;
        this.time_total = time;
        this.time_left = time;
        this.paused = false;
        this.destroyed = false;
        this.time_start = process.hrtime()[0];
        this.timer = setTimeout(this.callback, this.time_total * 1000);
    }
    /**
     * Pauses Timer
     * @returns Boolean to tell that if it is paused or not.
     */
    pause() {
        if (!this.paused && !this.destroyed) {
            this.paused = true;
            clearTimeout(this.timer);
            this.time_left = this.time_left - (process.hrtime()[0] - this.time_start);
            return true;
        } else return false;
    }
    /**
     * Resumes Timer
     * @returns Boolean to tell that if it is resumed or not.
     */
    resume() {
        if (this.paused && !this.destroyed) {
            this.paused = false;
            this.time_start = process.hrtime()[0];
            this.timer = setTimeout(this.callback, this.time_left * 1000);
            return true;
        } else return false;
    }
    /**
     * Reusing of timer
     * @returns Boolean to tell if it is re-used or not.
     */
    reuse() {
        if (!this.destroyed) {
            clearTimeout(this.timer);
            this.time_left = this.time_total;
            this.paused = false;
            this.time_start = process.hrtime()[0];
            this.timer = setTimeout(this.callback, this.time_total * 1000);
            return true;
        } else return false;
    }
    /**
     * Destroy timer.
     *
     * It can't be used again.
     */
    destroy() {
        clearTimeout(this.timer);
        this.destroyed = true;
        this.callback = () => {};
        this.time_total = 0;
        this.time_left = 0;
        this.paused = false;
        this.time_start = 0;
    }
}
