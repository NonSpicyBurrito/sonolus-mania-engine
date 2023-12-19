import { options } from '../../configuration/options.mjs'
import { panel } from '../panel.mjs'
import { getZ, layer, skin } from '../skin.mjs'
import { archetypes } from './index.mjs'

export class HoldConnector extends Archetype {
    data = this.defineData({
        tailRef: { name: 'tail', type: Number },
    })

    render() {
        const t = {
            min: bpmChanges.at(this.headData.beat).time,
            max: bpmChanges.at(this.tailData.beat).time,
        }

        const index = {
            min: Math.floor(t.min / panel.h),
            max: Math.floor(t.max / panel.h),
        }

        const lane = this.headSingleData.lane
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
        return this.tailHoldData.prevRef
    }

    get headData() {
        return archetypes.HoldStartNote.data.get(this.headRef)
    }

    get headSingleData() {
        return archetypes.HoldStartNote.singleData.get(this.headRef)
    }

    get tailData() {
        return archetypes.HoldEndNote.data.get(this.data.tailRef)
    }

    get tailHoldData() {
        return archetypes.HoldEndNote.holdData.get(this.data.tailRef)
    }
}
