import {Vector3} from "./Vector3";

export class Mesh 
{
    public vertices: Vector3[] = [];
    public get vertexPositionBufferSize(): number {return 3;}
    public get vertexPositionBufferItems():number {return this.vertices.length;}

    public Flatten(): number[] 
    {
        
        let flattenArray = [];
        
        for (let i = 0; i < this.vertices.length; i++) {
            flattenArray.push(this.vertices[i].x);
            flattenArray.push(this.vertices[i].y);
            flattenArray.push(this.vertices[i].z);
        }

        return flattenArray;
    }
}