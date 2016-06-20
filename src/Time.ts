/**
 * 
 */
export class Time 
{
    private startTime;
    private lastFrame;
    private nextFrame;

    constructor() {
        this.startTime = new Date().getTime();
    }

    public getTime() : number {
        return Date.now() - this.startTime;
    }

    public getDeltaTime() : number {
        return new Date().getTime() - this.lastFrame;
    }

    public countDeltaTime() : void {
        this.lastFrame = this.nextFrame;
        this.nextFrame = new Date().getTime();
    }
}