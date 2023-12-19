import { buckets } from '../../../buckets.mjs'
import { particle } from '../../../particle.mjs'
import { skin } from '../../../skin.mjs'
import { SingleNote } from './SingleNote.mjs'

export class HoldStartNote extends SingleNote {
    sprite = skin.sprites.holdStartNote

    effect = particle.effects.holdNote

    bucket = buckets.holdStartNote

    sharedMemory = this.defineSharedMemory({
        activatedTouchId: TouchId,
    })

    render() {
        if (time.now >= this.targetTime) return

        super.render()
    }

    complete(touch: Touch) {
        super.complete(touch)

        this.sharedMemory.activatedTouchId = touch.id
    }
}
