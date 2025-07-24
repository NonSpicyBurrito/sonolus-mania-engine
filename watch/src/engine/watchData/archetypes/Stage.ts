import { options } from '../../configuration/options.js'
import { effect, sfxDistance } from '../effect.js'
import { noteLayout } from '../note.js'
import { scaledScreen } from '../scaledScreen.js'
import { layer, skin } from '../skin.js'
import { archetypes } from './index.js'

export class Stage extends Archetype {
    spawnTime() {
        return -999999
    }

    despawnTime() {
        return 999999
    }
    preprocess() {
        if (options.sfxEnabled) {
            let t = -999999
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            while (true) {
                const nt = streams.getNextKey(-9999, t)
                if (nt === t) break

                t = nt
                effect.clips.stage.schedule(t, sfxDistance)
            }
        }

        if (options.laneEffectEnabled) {
            for (let i = 0; i < this.lanes; i++) {
                archetypes.EmptyEffect.spawn({
                    l: i - this.lanes / 2,
                })
            }
        }
    }

    updateParallel() {
        this.drawStage()
        this.drawStageCover()
    }

    get lanes() {
        return archetypes.Initialization.import.get(0).lanes
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
