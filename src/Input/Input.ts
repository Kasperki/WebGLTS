import {Vector3} from "Vector3";
/**
 * Input
 * handles all input
 * KeyCodes: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key#Key_values
 */
let canvasRect;

export class Input 
{
    private static keys: boolean[];
    private static keysdown: boolean[];
    private static keysdownStart: boolean[];
    private static keysup: boolean[];
    public static mousePosition: Vector3;

    constructor () 
    {
        Input.keys = new Array();
        Input.keysdown = new Array();
        Input.keysdownStart = new Array();
        Input.keysup = new Array();

        document.onmousemove = this.handleMouseMove;
        document.onkeydown = this.handleKeyDown;
        document.onkeyup = this.handleKeyUp;

        Input.mousePosition = new Vector3(0,0,0);
        canvasRect = document.getElementById('glcanvas').getBoundingClientRect();
    }

    //Does not work if dom changes after load. then must calculate boundingClientRect again
    private handleMouseMove(event: MouseEvent) 
    {
        Input.mousePosition.x = event.clientX - canvasRect.left;
        Input.mousePosition.y = event.clientY - canvasRect.top;
        console.log(Input.mousePosition);  //TODO REMOVE
    }

    private handleKeyDown(event: KeyboardEvent) 
    {
        let key = event.key.toLowerCase();   
        
        Input.keys[key] = true;

        if (!Input.keysdownStart[key]) {
            Input.keysdownStart[key] = true;
            Input.keysdown[key] = true;
        }
    }

    private handleKeyUp(event: KeyboardEvent) 
    {
        let key = event.key.toLowerCase(); 
        
        Input.keys[key] = false;
        Input.keysdownStart[key] = false;
        Input.keysup[key] = true;
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
        if (this.keys[keyCode.toLowerCase()])
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
        if (this.keysdown[keyCode.toLowerCase()])
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
        if (this.keysup[keyCode.toLowerCase()])
            return true;
        else 
            return false;
    }
}