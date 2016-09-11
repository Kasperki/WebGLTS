/**
 * Time helper class
 */
export class Time
{
    private static startTime;
    private static lastFrame;
    private static nextFrame;

    constructor()
    {
        Time.startTime = new Date().getTime();
    }

    /**
     * Get time how long has the program run in milliseconds
     * @return {Number}
     */
    public static getTime(): number
    {
        return Date.now() - this.startTime;
    }

    /**
    * Get deltatime of the program. Deltatime is time spent between rendering frames. 
    * @return {Number}  
    */
    public static getDeltaTime(): number
    {
        return new Date().getTime() - this.lastFrame;
    }

    /**
     * Keeps track of last drawframe time. || Should be hidden from user.
     */
    public countDeltaTime(): void
    {
        Time.lastFrame = Time.nextFrame;
        Time.nextFrame = new Date().getTime();
    }
}