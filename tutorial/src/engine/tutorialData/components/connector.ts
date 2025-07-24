import { note } from '../note.js'
import { segment } from '../segment.js'
import { layer, skin } from '../skin.js'

const sprites = {
    connector: skin.sprites.connector,
}

enum Mode {
    None,
    OverlayIn,
    OverlayOut,
    FallIn,
    FallOut,
    Frozen,
}

let mode = tutorialMemory(DataType<Mode>)

export const connector = {
    update() {
        if (!mode) return

        if (mode === Mode.OverlayIn || mode === Mode.OverlayOut) {
            const a = 0.8 * Math.unlerpClamped(1, 0.75, segment.time)

            const l = -0.75
            const r = 0.75

            const t = 0.5 - (mode === Mode.OverlayIn ? note.h * 3 : 0)
            const b = 0.5 + (mode === Mode.OverlayOut ? note.h * 3 : 0)

            const layout = new Rect({ l, r, t, b })

            sprites.connector.draw(layout, layer.connector, a)
        } else {
            const t = Math.unlerp(0, 2, mode === Mode.FallOut ? segment.time : 0)
            const b = Math.unlerp(0, 2, mode === Mode.FallIn ? segment.time : 2)

            const layout = new Rect({ l: -0.25, r: 0.25, b, t })

            sprites.connector.draw(layout, layer.connector, 0.8)
        }
    },

    showOverlayIn() {
        mode = Mode.OverlayIn
    },

    showOverlayOut() {
        mode = Mode.OverlayOut
    },

    showFallIn() {
        mode = Mode.FallIn
    },

    showFallOut() {
        mode = Mode.FallOut
    },

    showFrozen() {
        mode = Mode.Frozen
    },

    clear() {
        mode = Mode.None
    },
}
