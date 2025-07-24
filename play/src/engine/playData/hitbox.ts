import { scaledScreen } from './scaledScreen.js'
import { skin } from './skin.js'

export const hitboxLayout = ({ l, r }: { l: number; r: number }) =>
    new Rect({
        l,
        r,
        b: scaledScreen.b,
        t: scaledScreen.t,
    })
        .toQuad()
        .transform(skin.transform).aabb
