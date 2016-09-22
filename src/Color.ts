/**
 * Color
 */
export class Color
{
    private _r: number;

    get r() : number 
    {
        return this._r;
    }
    set r(r : number) 
    {
        if (r > 1) {
            this._r = 1;
        }
        else if (r < 0) {
            this.r = 0;
        }
        else {
            this._r = r;
        }
    }

    private _g: number;

    get g() : number 
    {
        return this._g;
    }
    set g(g : number) 
    {
        if (g > 1) {
            this._g = 1;
        }
        else if (g < 0) {
            this.g = 0;
        }
        else {
            this._g = g;
        }
    }

    private _b: number;

    get b() : number 
    {
        return this._b;
    }
    set b(b : number) 
    {
        if (b > 1) {
            this._b = 1;
        }
        else if (b < 0) {
            this.b = 0;
        }
        else {
            this._b = b;
        }
    }

    private _a: number;

    get a() : number 
    {
        return this._a;
    }
    set a(a : number) 
    {
        if (a > 1) {
            this._a = 1;
        }
        else if (a < 0) {
            this.a = 0;
        }
        else {
            this._a = a;
        }
    }

    static get White(): Color { return new Color(1, 1, 1, 1); };
    static get Black(): Color { return new Color(0, 0, 0, 1); };
    static get Red(): Color { return new Color(1, 0, 0, 1); };
    static get Green(): Color { return new Color(0, 1, 0, 1); };
    static get Blue(): Color { return new Color(0, 0, 1, 1); };

    constructor(r: number, g: number, b: number, a: number)
    {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    public toString(): string
    {
        return "r:" + this.r + " g:" + this.g + " b:" + this.b + " a:" + this.a;
    }
}
