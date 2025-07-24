import { buckets } from '../../../buckets.js'
import { particle } from '../../../particle.js'
import { skin } from '../../../skin.js'
import { SingleNote } from './SingleNote.js'

export class TapNote extends SingleNote {
    sprite = skin.sprites.tapNote

    effect = particle.effects.tapNote

    bucket = buckets.tapNote
}
