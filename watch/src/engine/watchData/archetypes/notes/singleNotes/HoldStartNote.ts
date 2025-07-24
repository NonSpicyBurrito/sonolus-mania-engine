import { buckets } from '../../../buckets.js'
import { particle } from '../../../particle.js'
import { skin } from '../../../skin.js'
import { SingleNote } from './SingleNote.js'

export class HoldStartNote extends SingleNote {
    sprite = skin.sprites.holdStartNote

    effect = particle.effects.holdNote

    bucket = buckets.holdStartNote

    render() {
        if (time.now >= this.targetTime) return

        super.render()
    }
}
