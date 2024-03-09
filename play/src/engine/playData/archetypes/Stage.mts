import { options } from '../../configuration/options.mjs'
import { effect, sfxDistance } from '../effect.mjs'
import { hitboxLayout } from '../hitbox.mjs'
import { noteLayout } from '../note.mjs'
import { particle } from '../particle.mjs'
import { scaledScreen } from '../scaledScreen.mjs'
import { layer, skin } from '../skin.mjs'
import { isUsed } from './InputManager.mjs'
import { archetypes } from './index.mjs'

export class Stage extends Archetype {
    hitbox = this.entityMemory(Rect)

    spawnOrder() {
        return 1
    }

    shouldSpawn() {
        return entityInfos.get(0).state === EntityState.Despawned
    }

    initialize() {
        hitboxLayout({
            l: options.fullscreenInputEnabled ? scaledScreen.l : -this.lanes / 2,
            r: options.fullscreenInputEnabled ? scaledScreen.r : this.lanes / 2,
        }).copyTo(this.hitbox)
    }

    touchOrder = 2
    touch() {
        for (const touch of touches) {
            if (!touch.started) continue
            if (!this.hitbox.contains(touch.position)) continue
            if (isUsed(touch)) continue

            this.onEmptyTap(touch)
        }
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

    onEmptyTap(touch: Touch) {
        if (options.sfxEnabled) this.playEmptySFX()
        if (options.laneEffectEnabled) this.playEmptyLaneEffects(this.touchToLane(touch))
    }

    touchToLane({ position }: Touch) {
        const direction = options.stageDirection > 1 ? -1 : 1

        return (
            Math.floor(
                (options.stageDirection % 2 === 0
                    ? Math.unlerp(this.hitbox.l, this.hitbox.r, position.x * direction)
                    : Math.unlerp(this.hitbox.b, this.hitbox.t, position.y * direction)) *
                    this.lanes,
            ) -
            this.lanes / 2
        )
    }

    playEmptySFX() {
        effect.clips.stage.play(sfxDistance)
    }

    playEmptyLaneEffects(l: number) {
        particle.effects.lane.spawn(Rect.rb.scale(1, -1).translate(l, 0), 0.2, false)
    }
}
