import {Vector3}  from "../Vector3";
import {MouseCode} from "./MouseCode";

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

    private static mousebutton: boolean[];
    public static mousePosition: Vector3;
    public static mouseWheelDelta: Vector3;

    constructor ()
    {
        Input.keys = new Array();
        Input.keysdown = new Array();
        Input.keysdownStart = new Array();
        Input.keysup = new Array();

        Input.mousebutton = new Array();

        document.onmousemove = this.handleMouseMove;
        document.onmousedown = this.handleMouseDown;
        document.onmouseup = this.handleMouseUp;
        document.onwheel = this.handleMouseWheel;

        document.onkeydown = this.handleKeyDown;
        document.onkeyup = this.handleKeyUp;

        Input.mouseWheelDelta = Vector3.Zero;
        Input.mousePosition = Vector3.Zero;
        canvasRect = document.getElementById("glcanvas").getBoundingClientRect();
    }

    //NOTE: Does not work if dom changes after load. then must calculate boundingClientRect again
    private handleMouseMove(event: MouseEvent)
    {
        Input.mousePosition.x = event.clientX - canvasRect.left;
        Input.mousePosition.y = event.clientY - canvasRect.top;
        //console.log(Input.mousePosition.toString());  //DEBUG
    }

    private handleMouseDown(event: MouseEvent)
    {
        Input.mousebutton[event.button] = true;
    }

    private handleMouseUp(event: MouseEvent)
    {
        Input.mousebutton[event.button] = false;
    }

    private handleMouseWheel(event: WheelEvent)
    {
        Input.mouseWheelDelta.x = event.deltaX;
        Input.mouseWheelDelta.y = event.deltaY;
        Input.mouseWheelDelta.z = event.deltaZ;
        //console.log(Input.mouseWheelDelta.toString()); //DEBUG
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
     * CALLED ONLY ONCE IN MAINLOOP!!  || Should be hidden from user.
     */
    public Update(): void
    {
        Input.keysdown = [];
        Input.keysup = [];
    }

    /**
    * Get boolean value if mousebutton is held down on that frame 
    * @param {MouseCode} mousecode 
    * @return {boolean}
    */
    public static GetMouseButton(mouseCode: MouseCode): boolean
    {
        if (this.mousebutton[mouseCode])
            return true;
        else
            return false;
    }

    /**
     * Get boolean value if key is held down on that frame
     * @param {String} keyCode
     * @return {boolean}
     */
    public static GetKey(keyCode: string): boolean
    {
        if (this.keys[keyCode.toLowerCase()])
            return true;
        else
            return false;
    }

    /**
     * Get boolean value if key has been pressed down on that frame
     * @param {String} keyCode
     * @return {boolean}
     */
    public static GetKeyDown(keyCode: string): boolean
    {
        if (this.keysdown[keyCode.toLowerCase()])
            return true;
        else
            return false;
    }

    /**
     * Get boolean value if key has been released up on that frame
     * @param {String} keyCode
     * @return {boolean}
     */
    public static GetKeyUp(keyCode: string): boolean
    {
        if (this.keysup[keyCode.toLowerCase()])
            return true;
        else
            return false;
    }
}