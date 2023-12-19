import { particle } from '../../particle.mjs'
import { skin } from '../../skin.mjs'
import { archetypes } from '../index.mjs'
import { Note } from './Note.mjs'

export class HoldEndNote extends Note {
    sprite = skin.sprites.holdEndNote

    effect = particle.effects.holdNote

    holdData = this.defineData({
        prevRef: { name: 'prev', type: Number },
    })

    get prevSingleData() {
        return archetypes.HoldStartNote.singleData.get(this.holdData.prevRef)
    }

    get lane() {
        return this.prevSingleData.lane
    }
}
