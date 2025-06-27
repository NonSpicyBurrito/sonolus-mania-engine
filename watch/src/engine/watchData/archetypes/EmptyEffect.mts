import { options } from '../../configuration/options.mjs'
import { particle } from '../particle.mjs'

export class EmptyEffect extends SpawnableArchetype({
    l: Number,
}) {
    initialized = this.entityMemory(Boolean)

    layout = this.entityMemory(Rect)

    nextTime = this.entityMemory(Number)

    spawnTime() {
        return -999999
    }

    despawnTime() {
        return 999999
    }

    initialize() {
        if (this.initialized) return
        this.initialized = true

        this.globalInitialize()
    }

    updateParallel() {
        let shouldUpdate = false
        let shouldSpawn = false
        if (time.skip) {
            shouldUpdate = true
        } else if (time.now >= this.nextTime) {
            shouldUpdate = true
            shouldSpawn = true
        }

        if (shouldUpdate) {
            this.nextTime = streams.getNextKey(this.spawnData.l, time.now)
            if (this.nextTime === time.now) this.nextTime = 999999
        }

        if (shouldSpawn) {
            if (options.laneEffectEnabled) particle.effects.lane.spawn(this.layout, 0.2, false)
        }
    }

    globalInitialize() {
        this.layout.copyFrom(Rect.rb.scale(1, -1).translate(this.spawnData.l, 0))
    }
}
