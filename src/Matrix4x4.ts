import {Vector3} from "Vector3";

const glMatrixEPSILON = 0.000001;

/**
 * Matrix
 * Powered by; https://github.com/toji/gl-matrix
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

    public Translate(vector: Vector3) 
    {
        let x = vector.x, y = vector.y, z = vector.z;
        this.matrix[12] = this.matrix[0] * x + this.matrix[4] * y + this.matrix[8] * z + this.matrix[12];
        this.matrix[13] = this.matrix[1] * x + this.matrix[5] * y + this.matrix[9] * z + this.matrix[13];
        this.matrix[14] = this.matrix[2] * x + this.matrix[6] * y + this.matrix[10] * z + this.matrix[14];
        this.matrix[15] = this.matrix[3] * x + this.matrix[7] * y + this.matrix[11] * z + this.matrix[15];
    }

    public Scale(scale: Vector3)
    {
        this.matrix[0] *= scale.x;
        this.matrix[5] *= scale.y;
        this.matrix[10] *= scale.z;
    }

    public Rotate(degrees, axis: Vector3) : Matrix4x4
    {
        let x = axis.x, y = axis.y, z = axis.z;
        let len = Math.sqrt(x * x + y * y + z * z);
        let s, c, t;
        let b00, b01, b02, b10, b11, b12, b20, b21, b22;
        let rad = degrees * Math.PI / 180;

        if (Math.abs(len) < glMatrixEPSILON) { return null; }

        len = 1 / len;
        x *= len;
        y *= len;
        z *= len;

        s = Math.sin(rad);
        c = Math.cos(rad);
        t = 1 - c;

        // Construct the elements of the rotation matrix
        b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
        b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
        b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;

        // Perform rotation-specific matrix multiplication
        this.matrix[0] = this.matrix[0] * b00 + this.matrix[4] * b01 + this.matrix[8] * b02;
        this.matrix[1] = this.matrix[1] * b00 + this.matrix[5] * b01 + this.matrix[9] * b02;
        this.matrix[2] = this.matrix[2] * b00 + this.matrix[6] * b01 + this.matrix[10] * b02;
        this.matrix[3] = this.matrix[3] * b00 + this.matrix[7] * b01 + this.matrix[11] * b02;
        this.matrix[4] = this.matrix[0] * b10 + this.matrix[4] * b11 + this.matrix[8] * b12;
        this.matrix[5] = this.matrix[1] * b10 + this.matrix[5] * b11 + this.matrix[9] * b12;
        this.matrix[6] = this.matrix[2] * b10 + this.matrix[6] * b11 + this.matrix[10] * b12;
        this.matrix[7] = this.matrix[3] * b10 + this.matrix[7] * b11 + this.matrix[11] * b12;
        this.matrix[8] = this.matrix[0] * b20 + this.matrix[4] * b21 + this.matrix[8] * b22;
        this.matrix[9] = this.matrix[1] * b20 + this.matrix[5] * b21 + this.matrix[9] * b22;
        this.matrix[10] = this.matrix[2] * b20 + this.matrix[6] * b21 + this.matrix[10] * b22;
        this.matrix[11] = this.matrix[3] * b20 + this.matrix[7] * b21 + this.matrix[11] * b22;

        return this;
    }

    public toString() : string 
    {
        return this.matrix.toString(); 
    }
}