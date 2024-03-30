import { buckets } from '../../buckets.mjs'
import { particle } from '../../particle.mjs'
import { skin } from '../../skin.mjs'
import { windows } from '../../windows.mjs'
import { archetypes } from '../index.mjs'
import { Note } from './Note.mjs'

export class HoldEndNote extends Note {
    sprite = skin.sprites.holdEndNote

    effect = particle.effects.holdNote

    bucket = buckets.holdEndNote

    holdImport = this.defineImport({
        prevRef: { name: 'prev', type: Number },
    })

    preprocess() {
        super.preprocess()

        const minPrevInputTime =
            bpmChanges.at(this.prevImport.beat).time + windows.good.min + input.offset

        this.spawnTime = Math.min(this.scheduleSFXTime, this.visualTime.min, minPrevInputTime)
    }

    touch() {
        const id = this.prevSharedMemory.activatedTouchId
        if (!id) return

        for (const touch of touches) {
            if (touch.id !== id) continue

            if (!touch.ended) return

            if (time.now >= this.inputTime.min && this.hitbox.contains(touch.position)) {
                this.complete(touch.t)
            } else {
                this.despawn = true
            }
            return
        }

        if (time.now >= this.inputTime.min) {
            this.complete(time.now)
        } else {
            this.despawn = true
        }
    }

    updateParallel() {
        if (
            this.prevInfo.state === EntityState.Despawned &&
            !this.prevSharedMemory.activatedTouchId
        )
            this.despawn = true

        super.updateParallel()
    }

    get prevInfo() {
        return entityInfos.get(this.holdImport.prevRef)
    }

    get prevImport() {
        return archetypes.HoldStartNote.import.get(this.holdImport.prevRef)
    }

    get prevSingleImport() {
        return archetypes.HoldStartNote.singleImport.get(this.holdImport.prevRef)
    }

    get prevSharedMemory() {
        return archetypes.HoldStartNote.sharedMemory.get(this.holdImport.prevRef)
    }

    get lane() {
        return this.prevSingleImport.lane
    }

    complete(hitTime: number) {
        this.result.judgment = input.judge(hitTime, this.targetTime, windows)
        this.result.accuracy = hitTime - this.targetTime

        this.result.bucket.index = this.bucket.index
        this.result.bucket.value = this.result.accuracy * 1000

        this.playHitEffects()

        this.despawn = true
    }
}
