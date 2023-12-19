import { options } from '../../../../configuration/options.mjs'
import { Note } from '../Note.mjs'

export abstract class SingleNote extends Note {
    singleData = this.defineData({
        lane: { name: 'lane', type: Number },
    })

    preprocess() {
        super.preprocess()

        if (options.mirror) this.singleData.lane *= -1
    }

    get lane() {
        return this.singleData.lane
    }
}
