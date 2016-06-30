"use strict";

const assert = require('assert');
var requirejs = require('requirejs');
var Matrix4x4 = requirejs('./build/Matrix4x4.js').Matrix4x4;

describe("Matrix4x4", function() {

    describe("Identity({Matrix4x4})", function() {
        it("should return identity matrix", function() {
            let m4x4 = new Matrix4x4.Identity();

            for(let i = 0; i < 16; i++) {
                if(i % 5 === 0)
                    assert.equal(m4x4.matrix[i], 1);
                else 
                    assert.equal(m4x4.matrix[i], 0);
            }
        });
    });

    describe("Scale({Vector3})", function() {
        it("should return scaled matrix", function() {
            let m4x4 = new Matrix4x4.Identity();
            let v3 = {x:2,y:3,z:4};

            m4x4.Scale(v3);

            assert.equal(m4x4.matrix[0], 2);
            assert.equal(m4x4.matrix[5], 3);
            assert.equal(m4x4.matrix[10], 4);

            for(let i = 0; i < 16; i++) {
                if(i % 5 !== 0)
                    assert.equal(m4x4.matrix[i], 0);
            }
        });
    });
});