/**
 * Vector3
 */
export class Vector3
{
    public x:number;
    public y:number;
    public z:number;

    static get One(): Vector3 
    { 
        return new Vector3(1,1,1)
    };
    
    static get Zero(): Vector3 
    { 
        return new Vector3(0,0,0)
    };

    constructor(x: number, y: number, z: number) 
    {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    /**
     * Adds Vectors together
     * @param {Vector3} v
     */
    public Add(v: Vector3)
    {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
    }

    /**
    * Returns vector in string
    * @return {string}
    */
    public toString = () : string => 
    {
        return "X:" + this.x + " Y:" + this.y + " Z:" + this.z;
    }
}

