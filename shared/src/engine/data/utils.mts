export const bounds = (quad: Quad) =>
    new Rect({
        l: Math.min(quad.p1.x, quad.p2.x, quad.p3.x, quad.p4.x),
        r: Math.max(quad.p1.x, quad.p2.x, quad.p3.x, quad.p4.x),
        b: Math.min(quad.p1.y, quad.p2.y, quad.p3.y, quad.p4.y),
        t: Math.max(quad.p1.y, quad.p2.y, quad.p3.y, quad.p4.y),
    })
