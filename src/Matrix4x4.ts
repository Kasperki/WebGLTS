/**
 * Matrix
 */
export class Matrix4x4 
{
    
    public matrix: number[];
    
    constructor() 
    {
    }

    public static Identity() : Matrix4x4 
    {    
        let matrix = new Matrix4x4();
        matrix.matrix = 
        [
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0,
        ];

        return matrix;
    }

    public Translate(vector: number[]) 
    {
        let x = vector[0], y = vector[1], z = vector[2];
        this.matrix[12] = this.matrix[0] * x + this.matrix[4] * y + this.matrix[8] * z + this.matrix[12];
        this.matrix[13] = this.matrix[1] * x + this.matrix[5] * y + this.matrix[9] * z + this.matrix[13];
        this.matrix[14] = this.matrix[2] * x + this.matrix[6] * y + this.matrix[10] * z + this.matrix[14];
        this.matrix[15] = this.matrix[3] * x + this.matrix[7] * y + this.matrix[11] * z + this.matrix[15];
    }

    public Perspective(fovy, aspect, near, far) : number[]
    {
        let f = 1.0 / Math.tan(fovy / 2),
        nf = 1 / (near - far);
        this.matrix[0] = f / aspect;
        this.matrix[1] = 0;
        this.matrix[2] = 0;
        this.matrix[3] = 0;
        this.matrix[4] = 0;
        this.matrix[5] = f;
        this.matrix[6] = 0;
        this.matrix[7] = 0;
        this.matrix[8] = 0;
        this.matrix[9] = 0;
        this.matrix[10] = (far + near) * nf;
        this.matrix[11] = -1;
        this.matrix[12] = 0;
        this.matrix[13] = 0;
        this.matrix[14] = (2 * far * near) * nf;
        this.matrix[15] = 0;
        return this.matrix;
    }

    public toString() : string 
    {
        return this.matrix.toString(); 
    }
}