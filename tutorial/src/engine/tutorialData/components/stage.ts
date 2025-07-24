import { noteLayout } from '../note.js'
import { scaledScreen } from '../scaledScreen.js'
import { layer, skin } from '../skin.js'

export const stage = {
    update() {
        for (let i = 0; i < 5; i++) {
            skin.sprites.lane.draw(Rect.rb.scale(1, -1).translate(i - 2.5, 0), layer.stage, 1)

            skin.sprites.slot.draw(noteLayout(i - 2.5 + 0.5, 1), layer.slot, 1)
        }

        skin.sprites.stageLeftBorder.draw(
            Rect.lb.scale(0.125, -1).translate(-2.5, 0),
            layer.stage,
            1,
        )
        skin.sprites.stageRightBorder.draw(
            Rect.rb.scale(0.125, -1).translate(2.5, 0),
            layer.stage,
            1,
        )

        skin.sprites.judgmentLine.draw(
            Rect.one.scale(scaledScreen.w / 2, (-scaledScreen.h / 2) * 0.05).translate(0, 1),
            layer.judgmentLine,
            1,
        )
    },
}
