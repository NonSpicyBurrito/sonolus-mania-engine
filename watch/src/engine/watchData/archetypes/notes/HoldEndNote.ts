import { buckets } from '../../buckets.js'
import { particle } from '../../particle.js'
import { skin } from '../../skin.js'
import { archetypes } from '../index.js'
import { Note } from './Note.js'

export class HoldEndNote extends Note {
    sprite = skin.sprites.holdEndNote

    effect = particle.effects.holdNote

    bucket = buckets.holdEndNote

    holdImport = this.defineImport({
        prevRef: { name: 'prev', type: Number },
        accuracyDiff: { name: 'accuracyDiff', type: Number },
    })

    get hitTime() {
        return replay.isReplay
            ? this.prevImport.judgment
                ? this.targetTime + this.import.accuracy + this.holdImport.accuracyDiff
                : this.prevSharedMemory.despawnTime
            : this.targetTime
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
}
