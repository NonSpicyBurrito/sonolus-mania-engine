import { EngineArchetypeDataName } from 'sonolus-core'
import { options } from '../../../configuration/options.mjs'
import { effect, sfxDistance } from '../../effect.mjs'
import { note, noteLayout } from '../../note.mjs'
import { hitEffectLayout, particle } from '../../particle.mjs'
import { getZ, layer } from '../../skin.mjs'

export abstract class Note extends Archetype {
    hasInput = true

    abstract sprite: SkinSprite

    abstract effect: ParticleEffect

    data = this.defineData({
        beat: { name: EngineArchetypeDataName.Beat, type: Number },
    })

    initialized = this.entityMemory(Boolean)

    targetTime = this.entityMemory(Number)

    visualTime = this.entityMemory({
        min: Number,
        max: Number,
        hidden: Number,
    })

    layout = this.entityMemory(Rect)
    z = this.entityMemory(Number)

    globalPreprocess() {
        this.life.set({
            perfect: 0,
            great: 0,
            good: 0,
            miss: -50,
        })
    }

    preprocess() {
        this.targetTime = bpmChanges.at(this.data.beat).time

        this.visualTime.max = this.targetTime
        this.visualTime.min = this.visualTime.max - note.duration

        if (options.sfxEnabled) this.scheduleSFX()

        this.result.time = this.targetTime
    }

    spawnTime() {
        return this.visualTime.min
    }

    despawnTime() {
        return this.visualTime.max
    }

    initialize() {
        if (this.initialized) return
        this.initialized = true

        this.globalInitialize()
    }

    updateParallel() {
        if (options.hidden > 0 && time.now > this.visualTime.hidden) return

        this.render()
    }

    terminate() {
        if (time.skip) return

        this.despawnTerminate()
    }

    abstract lane: number

    globalInitialize() {
        if (options.hidden > 0)
            this.visualTime.hidden = this.visualTime.max - note.duration * options.hidden

        noteLayout(this.lane, 0).copyTo(this.layout)

        this.z = getZ(layer.note.body, this.targetTime, this.lane)
    }

    scheduleSFX() {
        effect.clips.perfect.schedule(this.targetTime, sfxDistance)
    }

    render() {
        const y = Math.unlerp(this.visualTime.min, this.visualTime.max, time.now)

        this.sprite.draw(this.layout.translate(0, y), this.z, 1)
    }

    despawnTerminate() {
        if (options.noteEffectEnabled) this.playNoteEffects()
        if (options.laneEffectEnabled) this.playLaneEffects()
    }

    playNoteEffects() {
        this.effect.spawn(hitEffectLayout(this.lane), 0.5, false)
    }

    playLaneEffects() {
        particle.effects.lane.spawn(Rect.rb.scale(1, -1).translate(this.lane - 0.5, 0), 0.2, false)
    }
}
