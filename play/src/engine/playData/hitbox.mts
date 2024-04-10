import { scaledScreen } from './scaledScreen.mjs'
import { skin } from './skin.mjs'

export const hitboxLayout = ({ l, r }: { l: number; r: number }) =>
    new Rect({
        l,
        r,
        b: scaledScreen.b,
        t: scaledScreen.t,
    })
        .toQuad()
        .transform(skin.transform).aabb
