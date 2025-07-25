import { EngineArchetypeDataName } from '@sonolus/core'
import { bucketWindows, windows } from '../../../../../../shared/src/engine/data/windows.js'
import { options } from '../../../configuration/options.js'
import { effect, sfxDistance } from '../../effect.js'
import { hitboxLayout } from '../../hitbox.js'
import { note, noteLayout } from '../../note.js'
import { hitEffectLayout, particle } from '../../particle.js'
import { scaledScreen } from '../../scaledScreen.js'
import { getZ, layer } from '../../skin.js'
import { archetypes } from '../index.js'

export abstract class Note extends Archetype {
    hasInput = true

    abstract sprite: SkinSprite

    abstract effect: ParticleEffect

    import = this.defineImport({
        beat: { name: EngineArchetypeDataName.Beat, type: Number },
    })

    targetTime = this.entityMemory(Number)

    spawnTime = this.entityMemory(Number)

    visualTime = this.entityMemory(Range)
    hiddenTime = this.entityMemory(Number)

    inputTime = this.entityMemory(Range)

    hitbox = this.entityMemory(Rect)

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

        this.inputTime.copyFrom(windows.good.add(this.targetTime).add(input.offset))

        if (this.shouldScheduleSFX) this.scheduleSFX()
    }

    spawnOrder() {
        return 1000 + this.spawnTime
    }

    shouldSpawn() {
        return time.now >= this.spawnTime
    }

    initialize() {
        if (options.hidden > 0)
            this.hiddenTime = this.visualTime.max - note.duration * options.hidden

        noteLayout(this.lane, 0).copyTo(this.layout)

        this.z = getZ(layer.note.body, this.targetTime, this.lane)

        hitboxLayout({
            l: this.getHitboxX(-0.5),
            r: this.getHitboxX(0.5),
        }).copyTo(this.hitbox)

        this.result.accuracy = windows.good.max
    }

    touchOrder = 1

    updateParallel() {
        if (time.now > this.inputTime.max) this.despawn = true
        if (this.despawn) return

        if (time.now < this.visualTime.min) return
        if (options.hidden > 0 && time.now > this.hiddenTime) return

        this.render()
    }

    abstract lane: number

    get shouldScheduleSFX() {
        return options.sfxEnabled && options.autoSFX
    }

    get shouldPlaySFX() {
        return options.sfxEnabled && !options.autoSFX
    }

    scheduleSFX() {
        effect.clips.perfect.schedule(this.targetTime, sfxDistance)
    }

    render() {
        const y = Math.unlerp(this.visualTime.min, this.visualTime.max, time.now)

        this.sprite.draw(this.layout.translate(0, y), this.z, 1)
    }

    playHitEffects() {
        if (this.shouldPlaySFX) this.playSFX()
        if (options.noteEffectEnabled) this.playNoteEffects()
        if (options.laneEffectEnabled) this.playLaneEffects()
    }

    playSFX() {
        switch (this.result.judgment) {
            case Judgment.Perfect:
                effect.clips.perfect.play(sfxDistance)
                break
            case Judgment.Great:
                effect.clips.great.play(sfxDistance)
                break
            case Judgment.Good:
                effect.clips.good.play(sfxDistance)
                break
        }
    }

    playNoteEffects() {
        this.effect.spawn(hitEffectLayout(this.lane), 0.5, false)
    }

    playLaneEffects() {
        particle.effects.lane.spawn(Rect.rb.scale(1, -1).translate(this.lane - 0.5, 0), 0.2, false)
    }

    get lanes() {
        return archetypes.Initialization.import.get(0).lanes
    }

    getHitboxX(offset: number) {
        return options.fullscreenInputEnabled
            ? Math.lerp(scaledScreen.l, scaledScreen.r, (this.lane + offset) / this.lanes + 0.5)
            : this.lane + offset
    }
}
