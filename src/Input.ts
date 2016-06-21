/**
 * Input
 * handles all input
 */
export class Input 
{
    private static keys: boolean[];
    private static keysdown: boolean[];
    private static keysdownStart: boolean[];
    private static keysup: boolean[];

    constructor () 
    {
        Input.keys = new Array();
        Input.keysdown = new Array();
        Input.keysdownStart = new Array();
        Input.keysup = new Array();

        document.onkeydown = this.handleKeyDown;
        document.onkeyup = this.handleKeyUp;
    }

    private handleKeyDown(event: KeyboardEvent) 
    {
        Input.keys[event.keyCode] = true;
        
        if (!Input.keysdownStart[event.keyCode]) {
            Input.keysdownStart[event.keyCode] = true;
            Input.keysdown[event.keyCode] = true;
        }
    }

    private handleKeyUp(event: KeyboardEvent) 
    {
        Input.keys[event.keyCode] = false;
        Input.keysdownStart[event.keyCode] = false;
        Input.keysup[event.keyCode] = true;
    }

    /**
     * Updates input
     * CALLED ONLY ONCE IN MAINLOOP!! 
     */
    public Update(): void 
    {
        Input.keysdown = [];
        Input.keysup = [];
    }

    /**
     * Get boolean value if key is held down on that frame
     * @param keyCode string
     * @return boolean
     */
    public static GetKey(keyCode: string) 
    {
        if (this.keys[keyCode.charCodeAt(0)])
            return true;
        else 
            return false;
    }

    /**
     * Get boolean value if key has been pressed down on that frame
     * @param keyCode string
     * @return boolean
     */
    public static GetKeyDown(keyCode: string)
    {
        if (this.keysdown[keyCode.charCodeAt(0)])
            return true;
        else 
            return false;
    }

    /**
     * Get boolean value if key has been released up on that frame
     * @param keyCode string
     * @return boolean
     */
    public static GetKeyUp(keyCode: string)  
    {
        if (this.keysup[keyCode.charCodeAt(0)])
            return true;
        else 
            return false;
    }
}