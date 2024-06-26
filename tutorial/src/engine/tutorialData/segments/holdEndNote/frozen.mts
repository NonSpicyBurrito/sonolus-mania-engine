import { noteDisplay } from '../../components/noteDisplay.mjs'
import { drawHand, instruction } from '../../instruction.mjs'
import { segment } from '../../segment.mjs'

export const holdEndNoteFrozen = {
    enter() {
        noteDisplay.showFrozen('holdEnd')

        instruction.texts.release.show()
    },

    update() {
        drawHand(
            Math.remapClamped(0.25, 0.75, Math.PI / 3, Math.PI / 6, segment.time % 1),
            Math.unlerpClamped(1, 0.75, segment.time % 1),
        )
    },

    exit() {
        noteDisplay.clear()

        instruction.texts.clear()
    },
}
