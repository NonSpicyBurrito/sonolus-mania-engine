import { EngineArchetypeDataName } from '@sonolus/core'
import { options } from '../../../configuration/options.js'
import { chart } from '../../chart.js'
import { panel } from '../../panel.js'
import { scaledScreen } from '../../scaledScreen.js'
import { getZ, layer } from '../../skin.js'

export abstract class Note extends Archetype {
    abstract sprite: SkinSprite

    import = this.defineImport({
        beat: { name: EngineArchetypeDataName.Beat, type: Number },
    })

    preprocess() {
        chart.beats = Math.max(chart.beats, this.import.beat)
        chart.duration = Math.max(chart.duration, bpmChanges.at(this.import.beat).time)
    }

    abstract lane: number

    render() {
        const time = bpmChanges.at(this.import.beat).time
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
