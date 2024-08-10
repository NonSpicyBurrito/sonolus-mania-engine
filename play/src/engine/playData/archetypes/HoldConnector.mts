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

    head = this.entityMemory({
        time: Number,
        lane: Number,
    })

    tail = this.entityMemory({
        time: Number,
    })

    spawnTime = this.entityMemory(Number)

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

    sfxInstanceId = this.entityMemory(LoopedEffectClipInstanceId)

    effectInstanceId = this.entityMemory(ParticleEffectInstanceId)

    preprocess() {
        this.head.time = bpmChanges.at(this.headImport.beat).time
        this.tail.time = bpmChanges.at(this.tailImport.beat).time

        this.visualTime.min = this.head.time - note.duration

        this.spawnTime = this.visualTime.min

        if (this.shouldScheduleSFX) this.scheduleSFX()
    }

    spawnOrder() {
        return 1000 + this.spawnTime
    }

    shouldSpawn() {
        return time.now >= this.spawnTime
    }

    initialize() {
        this.head.lane = this.headSingleImport.lane

        this.visualTime.max = this.tail.time

        if (options.hidden > 0)
            this.visualTime.hidden = this.tail.time - note.duration * options.hidden

        this.connector.l = this.head.lane - 0.5 * options.noteSize
        this.connector.r = this.head.lane + 0.5 * options.noteSize

        this.connector.z = getZ(layer.note.connector, this.head.time, this.head.lane)

        noteLayout(this.head.lane, 1).copyTo(this.slide.layout)
        this.slide.z = getZ(layer.note.slide, this.head.time, this.head.lane)
    }

    updateParallel() {
        if (this.isDead) {
            this.despawn = true
            return
        }

        if (this.shouldPlaySFX && !this.sfxInstanceId && this.isActive) this.playSFX()

        if (this.shouldSpawnHoldEffect && !this.effectInstanceId && this.isActive)
            this.spawnHoldEffect()

        if (time.now < this.visualTime.min || time.now >= this.visualTime.max) return

        this.renderConnector()

        if (time.now < this.head.time) return

        this.renderSlide()
    }

    terminate() {
        if (this.shouldPlaySFX && this.sfxInstanceId) effect.clips.stopLoop(this.sfxInstanceId)

        if (this.shouldSpawnHoldEffect && this.effectInstanceId)
            particle.effects.destroy(this.effectInstanceId)
    }

    get headRef() {
        return this.tailHoldImport.prevRef
    }

    get headInfo() {
        return entityInfos.get(this.headRef)
    }

    get headImport() {
        return archetypes.HoldStartNote.import.get(this.headRef)
    }

    get headSingleImport() {
        return archetypes.HoldStartNote.singleImport.get(this.headRef)
    }

    get headSharedMemory() {
        return archetypes.HoldStartNote.sharedMemory.get(this.headRef)
    }

    get tailInfo() {
        return entityInfos.get(this.import.tailRef)
    }

    get tailImport() {
        return archetypes.HoldEndNote.import.get(this.import.tailRef)
    }

    get tailHoldImport() {
        return archetypes.HoldEndNote.holdImport.get(this.import.tailRef)
    }

    get shouldScheduleSFX() {
        return options.sfxEnabled && effect.clips.hold.exists && options.autoSFX
    }

    get shouldPlaySFX() {
        return options.sfxEnabled && effect.clips.hold.exists && !options.autoSFX
    }

    get shouldSpawnHoldEffect() {
        return options.noteEffectEnabled && particle.effects.hold.exists
    }

    get isActive() {
        return (
            this.headInfo.state === EntityState.Despawned && this.headSharedMemory.activatedTouchId
        )
    }

    get isDead() {
        return this.tailInfo.state === EntityState.Despawned
    }

    scheduleSFX() {
        const id = effect.clips.hold.scheduleLoop(this.head.time)
        effect.clips.scheduleStopLoop(id, this.tail.time)
    }

    playSFX() {
        this.sfxInstanceId = effect.clips.hold.loop()
    }

    spawnHoldEffect() {
        const layout = holdEffectLayout(this.head.lane)

        this.effectInstanceId = particle.effects.hold.spawn(layout, 1, true)
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
