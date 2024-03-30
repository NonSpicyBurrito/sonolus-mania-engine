import { particle } from '../../particle.mjs'
import { skin } from '../../skin.mjs'
import { archetypes } from '../index.mjs'
import { Note } from './Note.mjs'

export class HoldEndNote extends Note {
    sprite = skin.sprites.holdEndNote

    effect = particle.effects.holdNote

    holdImport = this.defineImport({
        prevRef: { name: 'prev', type: Number },
    })

    get prevSingleImport() {
        return archetypes.HoldStartNote.singleImport.get(this.holdImport.prevRef)
    }

    get lane() {
        return this.prevSingleImport.lane
    }
}
