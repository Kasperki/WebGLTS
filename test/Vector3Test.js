"use strict";

const assert = require('assert');
var requirejs = require('requirejs');
var Vector3 = requirejs('./build/Vector3.js').Vector3;

describe("Vector3", function() {
    it("should create vector3", function() {
            let v = new Vector3(1, 1, 1);

            assert.equal(v.x, 1);
            assert.equal(v.y, 1);
            assert.equal(v.z, 1);   
    });

    describe("Add({Vector3})", function() {
        it("should add values to vector3", function() {
            let v1 = new Vector3(1,1,1);
            let v2 = new Vector3(1,2,3);

            v1.Add(v2);

            assert.equal(v1.x, 2);
            assert.equal(v1.y, 3);
            assert.equal(v1.z, 4);    
        });
        it("should add negative values to vector3", function() {
            let v1 = new Vector3(1,1,1);
            let v2 = new Vector3(-1,-2,-3);

            v1.Add(v2);

            assert.equal(v1.x, 0);
            assert.equal(v1.y, -1);
            assert.equal(v1.z, -2);    
        });
    });
});
