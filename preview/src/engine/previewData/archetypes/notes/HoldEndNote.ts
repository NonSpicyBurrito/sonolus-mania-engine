import { skin } from '../../skin.js'
import { archetypes } from '../index.js'
import { Note } from './Note.js'

export class HoldEndNote extends Note {
    sprite = skin.sprites.holdEndNote

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
