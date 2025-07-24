import { options } from '../../../../configuration/options.js'
import { Note } from '../Note.js'

export abstract class SingleNote extends Note {
    singleImport = this.defineImport({
        lane: { name: 'lane', type: Number },
    })

    preprocess() {
        super.preprocess()

        if (options.mirror) this.singleImport.lane *= -1
    }

    get lane() {
        return this.singleImport.lane
    }
}
