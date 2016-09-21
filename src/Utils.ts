//
// gluPerspective
//
export function makePerspective(fovy, aspect, znear, zfar)
{
    let ymax = znear * Math.tan(fovy * Math.PI / 360.0);
    let ymin = -ymax;
    let xmin = ymin * aspect;
    let xmax = ymax * aspect;

    return makeFrustum(xmin, xmax, ymin, ymax, znear, zfar);
}

//
// glFrustum
//
function makeFrustum(left, right, bottom, top, znear, zfar): number[]
{
    let X = 2 * znear / (right - left);
    let Y = 2 * znear / (top - bottom);
    let A = (right + left) / (right - left);
    let B = (top + bottom) / (top - bottom);
    let C = -(zfar + znear) / (zfar - znear);
    let D = -2 * zfar * znear / (zfar - znear);

    return [
        X, 0, A, 0,
        0, Y, B, 0,
        0, 0, C, -1,
        0, 0, D, 0
    ];
}

/*
* Generates Universally unique identifier
*/
export function uuid() {
  let uuid = "", i, random;
  for (i = 0; i < 32; i++) {
    random = Math.random() * 16 | 0;

    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += "-";
    }
    uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
  }
  return uuid;
}