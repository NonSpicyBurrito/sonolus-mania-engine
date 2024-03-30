import { options } from '../../configuration/options.mjs'
import { panel } from '../panel.mjs'
import { getZ, layer, skin } from '../skin.mjs'
import { archetypes } from './index.mjs'

export class HoldConnector extends Archetype {
    import = this.defineImport({
        tailRef: { name: 'tail', type: Number },
    })

    render() {
        const t = {
            min: bpmChanges.at(this.headImport.beat).time,
            max: bpmChanges.at(this.tailImport.beat).time,
        }

        const index = {
            min: Math.floor(t.min / panel.h),
            max: Math.floor(t.max / panel.h),
        }

        const lane = this.headSingleImport.lane
        const l = lane - 0.5 * options.noteSize
        const r = lane + 0.5 * options.noteSize

        const z = getZ(layer.connector, t.min, lane)

        for (let i = index.min; i <= index.max; i++) {
            const pt = {
                min: Math.max(t.min, i * panel.h),
                max: Math.min(t.max, (i + 1) * panel.h),
            }

            skin.sprites.connector.draw(
                new Rect({
                    l,
                    r,
                    b: pt.min - i * panel.h,
                    t: pt.max - i * panel.h,
                }).translate(i * panel.w, 0),
                z,
                options.connectorAlpha,
            )
        }
    }

    get headRef() {
        return this.tailHoldImport.prevRef
    }

    get headImport() {
        return archetypes.HoldStartNote.import.get(this.headRef)
    }

    get headSingleImport() {
        return archetypes.HoldStartNote.singleImport.get(this.headRef)
    }

    get tailImport() {
        return archetypes.HoldEndNote.import.get(this.import.tailRef)
    }

    get tailHoldImport() {
        return archetypes.HoldEndNote.holdImport.get(this.import.tailRef)
    }
}
