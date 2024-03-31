import { particle } from '../../particle.mjs'
import { skin } from '../../skin.mjs'
import { archetypes } from '../index.mjs'
import { Note } from './Note.mjs'

export class HoldEndNote extends Note {
    sprite = skin.sprites.holdEndNote

    effect = particle.effects.holdNote

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
