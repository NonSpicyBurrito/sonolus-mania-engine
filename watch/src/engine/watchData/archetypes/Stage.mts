import { options } from '../../configuration/options.mjs'
import { noteLayout } from '../note.mjs'
import { scaledScreen } from '../scaledScreen.mjs'
import { layer, skin } from '../skin.mjs'
import { archetypes } from './index.mjs'

export class Stage extends Archetype {
    spawnTime() {
        return -999999
    }

    despawnTime() {
        return 999999
    }

    updateParallel() {
        this.drawStage()
        this.drawStageCover()
    }

    get lanes() {
        return archetypes.Initialization.data.get(0).lanes
    }

    drawStage() {
        for (let i = 0; i < this.lanes; i++) {
            skin.sprites.lane.draw(
                Rect.rb.scale(1, -1).translate(i - this.lanes / 2, 0),
                layer.stage,
                1,
            )

            skin.sprites.slot.draw(noteLayout(i - this.lanes / 2 + 0.5, 1), layer.slot, 1)
        }

        skin.sprites.stageLeftBorder.draw(
            Rect.lb.scale(0.125, -1).translate(-this.lanes / 2, 0),
            layer.stage,
            1,
        )
        skin.sprites.stageRightBorder.draw(
            Rect.rb.scale(0.125, -1).translate(this.lanes / 2, 0),
            layer.stage,
            1,
        )

        skin.sprites.judgmentLine.draw(
            Rect.one.scale(scaledScreen.w / 2, (-scaledScreen.h / 2) * 0.05).translate(0, 1),
            layer.judgmentLine,
            1,
        )
    }

    drawStageCover() {
        if (options.stageCover <= 0) return

        skin.sprites.cover.draw(
            new Rect({
                l: scaledScreen.l,
                r: scaledScreen.r,
                t: scaledScreen.t,
                b: Math.lerp(scaledScreen.t, 1, options.stageCover),
            }),
            layer.cover,
            1,
        )
    }
}
