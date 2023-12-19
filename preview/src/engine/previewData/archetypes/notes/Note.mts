import { EngineArchetypeDataName } from 'sonolus-core'
import { options } from '../../../configuration/options.mjs'
import { chart } from '../../chart.mjs'
import { panel } from '../../panel.mjs'
import { scaledScreen } from '../../scaledScreen.mjs'
import { getZ, layer } from '../../skin.mjs'

export abstract class Note extends Archetype {
    abstract sprite: SkinSprite

    data = this.defineData({
        beat: { name: EngineArchetypeDataName.Beat, type: Number },
    })

    preprocess() {
        chart.beats = Math.max(chart.beats, this.data.beat)
        chart.duration = Math.max(chart.duration, bpmChanges.at(this.data.beat).time)
    }

    abstract lane: number

    render() {
        const time = bpmChanges.at(this.data.beat).time
        const pos = panel.getPos(time)

        const z = getZ(layer.note, time, this.lane)

        const layout = new Rect({
            l: this.lane - 0.5 * options.noteSize,
            r: this.lane + 0.5 * options.noteSize,
            b: -0.5 * options.noteSize * scaledScreen.wToH,
            t: 0.5 * options.noteSize * scaledScreen.wToH,
        }).add(pos)

        this.sprite.draw(layout, z, 1)
    }
}
