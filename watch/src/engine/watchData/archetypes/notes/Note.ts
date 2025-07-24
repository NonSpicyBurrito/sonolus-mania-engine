import { EngineArchetypeDataName } from '@sonolus/core'
import { bucketWindows } from '../../../../../../shared/src/engine/data/windows.js'
import { options } from '../../../configuration/options.js'
import { effect, sfxDistance } from '../../effect.js'
import { note, noteLayout } from '../../note.js'
import { hitEffectLayout, particle } from '../../particle.js'
import { getZ, layer } from '../../skin.js'

export abstract class Note extends Archetype {
    hasInput = true

    abstract sprite: SkinSprite

    abstract effect: ParticleEffect

    import = this.defineImport({
        beat: { name: EngineArchetypeDataName.Beat, type: Number },
        judgment: { name: EngineArchetypeDataName.Judgment, type: DataType<Judgment> },
        accuracy: { name: EngineArchetypeDataName.Accuracy, type: Number },
    })

    sharedMemory = this.defineSharedMemory({
        despawnTime: Number,
    })

    initialized = this.entityMemory(Boolean)

    targetTime = this.entityMemory(Number)

    visualTime = this.entityMemory(Range)
    hiddenTime = this.entityMemory(Number)

    layout = this.entityMemory(Rect)
    z = this.entityMemory(Number)

    abstract bucket: Bucket

    globalPreprocess() {
        this.bucket.set(bucketWindows)

        this.life.set({
            perfect: 0,
            great: 0,
            good: 0,
            miss: -50,
        })
    }

    preprocess() {
        this.targetTime = bpmChanges.at(this.import.beat).time

        this.visualTime.copyFrom(Range.l.mul(note.duration).add(this.targetTime))

        this.sharedMemory.despawnTime = this.hitTime

        if (options.sfxEnabled) {
            if (replay.isReplay) {
                this.scheduleReplaySFX()
            } else {
                this.scheduleSFX()
            }
        }

        this.result.time = this.targetTime

        if (!replay.isReplay) {
            this.result.bucket.index = this.bucket.index
        } else if (this.import.judgment) {
            this.result.bucket.index = this.bucket.index
            this.result.bucket.value = this.import.accuracy * 1000
        }
    }

    spawnTime() {
        return this.visualTime.min
    }

    despawnTime() {
        return this.sharedMemory.despawnTime
    }

    initialize() {
        if (this.initialized) return
        this.initialized = true

        this.globalInitialize()
    }

    updateParallel() {
        if (options.hidden > 0 && time.now > this.hiddenTime) return

        this.render()
    }

    terminate() {
        if (time.skip) return

        this.despawnTerminate()
    }

    abstract lane: number

    get hitTime() {
        return this.targetTime + (replay.isReplay ? this.import.accuracy : 0)
    }

    globalInitialize() {
        if (options.hidden > 0)
            this.hiddenTime = this.visualTime.max - note.duration * options.hidden

        noteLayout(this.lane, 0).copyTo(this.layout)

        this.z = getZ(layer.note.body, this.targetTime, this.lane)
    }

    scheduleSFX() {
        effect.clips.perfect.schedule(this.hitTime, sfxDistance)
    }

    scheduleReplaySFX() {
        if (!this.import.judgment) return

        switch (this.import.judgment) {
            case Judgment.Perfect:
                effect.clips.perfect.schedule(this.hitTime, sfxDistance)
                break
            case Judgment.Great:
                effect.clips.great.schedule(this.hitTime, sfxDistance)
                break
            case Judgment.Good:
                effect.clips.good.schedule(this.hitTime, sfxDistance)
                break
        }
    }

    render() {
        const y = Math.unlerp(this.visualTime.min, this.visualTime.max, time.now)

        this.sprite.draw(this.layout.translate(0, y), this.z, 1)
    }

    despawnTerminate() {
        if (replay.isReplay && !this.import.judgment) return

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
