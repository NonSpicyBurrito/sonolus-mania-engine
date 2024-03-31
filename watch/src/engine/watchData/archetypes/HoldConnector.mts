import { options } from '../../configuration/options.mjs'
import { effect } from '../effect.mjs'
import { note, noteLayout } from '../note.mjs'
import { holdEffectLayout, particle } from '../particle.mjs'
import { getZ, layer, skin } from '../skin.mjs'
import { archetypes } from './index.mjs'

export class HoldConnector extends Archetype {
    import = this.defineImport({
        tailRef: { name: 'tail', type: Number },
    })

    initialized = this.entityMemory(Boolean)

    head = this.entityMemory({
        time: Number,
        lane: Number,
    })

    tail = this.entityMemory({
        time: Number,
    })

    visualTime = this.entityMemory({
        min: Number,
        max: Number,
        hidden: Number,
    })

    connector = this.entityMemory({
        l: Number,
        r: Number,

        z: Number,
    })

    slide = this.entityMemory({
        layout: Rect,
        z: Number,
    })

    effectInstanceId = this.entityMemory(ParticleEffectInstanceId)

    preprocess() {
        this.head.time = bpmChanges.at(this.headImport.beat).time
        this.tail.time = bpmChanges.at(this.tailImport.beat).time

        this.visualTime.min = this.head.time - note.duration
        this.visualTime.max = this.tail.time

        if (options.sfxEnabled) {
            if (replay.isReplay) {
                this.scheduleReplaySFX()
            } else {
                this.scheduleSFX()
            }
        }
    }

    spawnTime() {
        return this.visualTime.min
    }

    despawnTime(): number {
        return replay.isReplay
            ? Math.min(this.tailSharedMemory.despawnTime, this.tail.time)
            : this.tail.time
    }

    initialize() {
        if (this.initialized) return
        this.initialized = true

        this.globalInitialize()
    }

    updateParallel() {
        this.renderConnector()

        if (time.skip) {
            if (this.shouldSpawnHoldEffect) this.effectInstanceId = 0
        }

        if (time.now < this.head.time) return

        this.renderSlide()

        if (time.now < this.headSharedMemory.despawnTime) return

        if (this.shouldSpawnHoldEffect && !this.effectInstanceId) this.spawnHoldEffect()
    }

    terminate() {
        if (this.shouldSpawnHoldEffect && this.effectInstanceId) this.destroyHoldEffect()
    }

    get headRef() {
        return this.tailHoldImport.prevRef
    }

    get headImport() {
        return archetypes.HoldStartNote.import.get(this.headRef)
    }

    get headSingleImport() {
        return archetypes.HoldStartNote.singleImport.get(this.headRef)
    }

    get headSharedMemory() {
        return archetypes.HoldEndNote.sharedMemory.get(this.headRef)
    }

    get tailImport() {
        return archetypes.HoldEndNote.import.get(this.import.tailRef)
    }

    get tailHoldImport() {
        return archetypes.HoldEndNote.holdImport.get(this.import.tailRef)
    }

    get tailSharedMemory() {
        return archetypes.HoldEndNote.sharedMemory.get(this.import.tailRef)
    }

    get shouldSpawnHoldEffect() {
        return options.noteEffectEnabled && particle.effects.hold.exists
    }

    globalInitialize() {
        this.head.lane = this.headSingleImport.lane

        if (options.hidden > 0)
            this.visualTime.hidden = this.tail.time - note.duration * options.hidden

        this.connector.l = this.head.lane - 0.5 * options.noteSize
        this.connector.r = this.head.lane + 0.5 * options.noteSize

        this.connector.z = getZ(layer.note.connector, this.head.time, this.head.lane)

        noteLayout(this.head.lane, 1).copyTo(this.slide.layout)
        this.slide.z = getZ(layer.note.slide, this.head.time, this.head.lane)
    }

    scheduleSFX() {
        const id = effect.clips.hold.scheduleLoop(this.head.time)
        effect.clips.scheduleStopLoop(id, this.tail.time)
    }

    scheduleReplaySFX() {
        if (!this.headImport.judgment) return

        const start = Math.max(this.head.time, this.headSharedMemory.despawnTime)
        const end = Math.min(this.tail.time, this.tailSharedMemory.despawnTime)
        if (start >= end) return

        const id = effect.clips.hold.scheduleLoop(start)
        effect.clips.scheduleStopLoop(id, end)
    }

    spawnHoldEffect() {
        const layout = holdEffectLayout(this.head.lane)

        this.effectInstanceId = particle.effects.hold.spawn(layout, 1, true)
    }

    destroyHoldEffect() {
        particle.effects.destroy(this.effectInstanceId)

        this.effectInstanceId = 0
    }

    renderConnector() {
        if (options.hidden > 0 && time.now > this.visualTime.hidden) return

        const hiddenDuration = options.hidden > 0 ? note.duration * options.hidden : 0

        const visibleTime = {
            min: Math.max(this.head.time, time.now + hiddenDuration),
            max: Math.min(this.tail.time, time.now + note.duration),
        }

        const y = {
            min: Math.unlerp(visibleTime.min - note.duration, visibleTime.min, time.now),
            max: Math.unlerp(visibleTime.max - note.duration, visibleTime.max, time.now),
        }

        const layout = new Rect({
            l: this.connector.l,
            r: this.connector.r,
            t: y.min,
            b: y.max,
        })

        skin.sprites.connector.draw(layout, this.connector.z, options.connectorAlpha)
    }

    renderSlide() {
        skin.sprites.holdStartNote.draw(this.slide.layout, this.slide.z, 1)
    }
}
