/**
 * Color
 */
export class Color
{
    public r:number;
    public g:number;
    public b:number;
    public a:number;

    static get White():Color { return new Color(1,1,1,1)};
    static get Black():Color { return new Color(0,0,0,1)};
    static get Red():Color { return new Color(1,0,0,1)};
    static get Green():Color { return new Color(0,1,0,1)};
    static get Blue():Color { return new Color(0,0,1,1)};

    constructor(r: number, g: number, b: number, a: number) 
    {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
}
