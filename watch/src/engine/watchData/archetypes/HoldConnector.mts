import { options } from '../../configuration/options.mjs'
import { effect } from '../effect.mjs'
import { note, noteLayout } from '../note.mjs'
import { holdEffectLayout, particle } from '../particle.mjs'
import { getZ, layer, skin } from '../skin.mjs'
import { archetypes } from './index.mjs'

export class HoldConnector extends Archetype {
    data = this.defineData({
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

    scheduleSFXTime = this.entityMemory(Number)

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
        this.head.time = bpmChanges.at(this.headData.beat).time
        this.tail.time = bpmChanges.at(this.tailData.beat).time

        this.visualTime.min = this.head.time - note.duration
        this.visualTime.max = this.tail.time

        if (options.sfxEnabled) this.scheduleSFX()
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
        this.renderConnector()

        if (time.skip) {
            if (this.shouldSpawnHoldEffect) this.effectInstanceId = 0
        }

        if (time.now < this.head.time) return

        if (this.shouldSpawnHoldEffect && !this.effectInstanceId) this.spawnHoldEffect()

        this.renderSlide()
    }

    terminate() {
        if (this.shouldSpawnHoldEffect && this.effectInstanceId) this.destroyHoldEffect()
    }

    get headRef() {
        return this.tailHoldData.prevRef
    }

    get headData() {
        return archetypes.HoldStartNote.data.get(this.headRef)
    }

    get headSingleData() {
        return archetypes.HoldStartNote.singleData.get(this.headRef)
    }

    get tailData() {
        return archetypes.HoldEndNote.data.get(this.data.tailRef)
    }

    get tailHoldData() {
        return archetypes.HoldEndNote.holdData.get(this.data.tailRef)
    }

    get shouldSpawnHoldEffect() {
        return options.noteEffectEnabled && particle.effects.hold.exists
    }

    globalInitialize() {
        this.head.lane = this.headSingleData.lane

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
