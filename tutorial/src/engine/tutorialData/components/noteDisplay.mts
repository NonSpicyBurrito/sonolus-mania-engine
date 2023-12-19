import { note, noteLayout } from '../note.mjs'
import { segment } from '../segment.mjs'
import { layer, skin } from '../skin.mjs'

const sprites = {
    tap: skin.sprites.tapNote,
    holdStart: skin.sprites.holdStartNote,
    holdEnd: skin.sprites.holdEndNote,
}

enum Mode {
    None,
    Overlay,
    Fall,
    Frozen,
}

let mode = tutorialMemory(DataType<Mode>)

let id = tutorialMemory(SkinSpriteId)

export const noteDisplay = {
    update() {
        if (!mode) return

        if (mode === Mode.Overlay) {
            const a = Math.unlerpClamped(1, 0.75, segment.time)

            const l = -0.75
            const r = 0.75

            const t = 0.5 - note.h * 1.5
            const b = 0.5 + note.h * 1.5

            skin.sprites.draw(id, new Rect({ l, r, t, b }), layer.note, a)
        } else {
            const y = mode === Mode.Fall ? Math.unlerp(0, 2, segment.time) : 1

            skin.sprites.draw(id, noteLayout(0, y), layer.note, 1)
        }
    },

    showOverlay(type: keyof typeof sprites) {
        mode = Mode.Overlay
        this.setType(type)
    },

    showFall(type: keyof typeof sprites) {
        mode = Mode.Fall
        this.setType(type)
    },

    showFrozen(type: keyof typeof sprites) {
        mode = Mode.Frozen
        this.setType(type)
    },

    clear() {
        mode = Mode.None
    },

    setType(type: keyof typeof sprites) {
        for (const [key, sprite] of Object.entries(sprites)) {
            if (key !== type) continue

            id = sprite.id
        }
    },
}
