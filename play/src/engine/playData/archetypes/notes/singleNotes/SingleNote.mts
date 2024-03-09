import { options } from '../../../../configuration/options.mjs'
import { windows } from '../../../windows.mjs'
import { isUsed, markAsUsed } from '../../InputManager.mjs'
import { Note } from '../Note.mjs'

export abstract class SingleNote extends Note {
    singleData = this.defineData({
        lane: { name: 'lane', type: Number },
    })

    preprocess() {
        super.preprocess()

        if (options.mirror !== options.stageDirection > 1) this.singleData.lane *= -1

        this.spawnTime = Math.min(this.scheduleSFXTime, this.visualTime.min)
    }

    touch() {
        if (time.now < this.inputTime.min) return

        for (const touch of touches) {
            if (!touch.started) continue
            if (!this.hitbox.contains(touch.position)) continue
            if (isUsed(touch)) continue

            this.complete(touch)
            return
        }
    }

    get lane() {
        return this.singleData.lane
    }

    complete(touch: Touch) {
        markAsUsed(touch)

        this.result.judgment = input.judge(touch.startTime, this.targetTime, windows)
        this.result.accuracy = touch.startTime - this.targetTime

        this.result.bucket.index = this.bucket.index
        this.result.bucket.value = this.result.accuracy * 1000

        this.playHitEffects()

        this.despawn = true
    }
}
