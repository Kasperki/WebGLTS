/**
 * Time helper class
 */
export class Time 
{
    private startTime;
    private lastFrame;
    private nextFrame;

    constructor() 
    {
        this.startTime = new Date().getTime();
    }

    /**
     * Get time how long has the program run in milliseconds
     * @return {Number}
     */
    public getTime() : number 
    {
        return Date.now() - this.startTime;
    }

    /**
    * Get deltatime of the program. Deltatime is time spent between rendering frames. 
    * @return {Number}  
    */
    public getDeltaTime() : number 
    {
        return new Date().getTime() - this.lastFrame;
    }

    /**
     * Keeps track of last drawframe time. || Should be hidden from user.
     */
    public countDeltaTime() : void 
    {
        this.lastFrame = this.nextFrame;
        this.nextFrame = new Date().getTime();
    }
}