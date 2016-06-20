/**
 * Vector3
 */
export class Vector3
{
    public x:number;
    public y:number;
    public z:number;

    public static One = new Vector3(1,1,1);
    public static Zero = new Vector3(0,0,0);

    constructor(x: number, y: number, z: number) 
    {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public Add(v: Vector3)
    {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
    }
}

