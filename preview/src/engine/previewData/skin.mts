import { SkinSpriteName } from 'sonolus-core'
import { panel } from './panel.mjs'

export const skin = defineSkin({
    sprites: {
        lane: SkinSpriteName.Lane,
        stageLeftBorder: SkinSpriteName.StageLeftBorder,
        stageRightBorder: SkinSpriteName.StageRightBorder,

        tapNote: SkinSpriteName.NoteHeadCyan,

        holdStartNote: SkinSpriteName.NoteHeadGreen,
        holdEndNote: SkinSpriteName.NoteTailGreen,

        connector: SkinSpriteName.NoteConnectionGreen,

        beatLine: SkinSpriteName.GridNeutral,
        bpmChangeLine: SkinSpriteName.GridPurple,
    },
})

export const layer = {
    note: 100,
    connector: 99,

    line: 10,

    stage: 0,
}

export const line = (sprite: SkinSprite, beat: number, a: number) => {
    const pos = panel.getPos(bpmChanges.at(beat).time)

    sprite.draw(
        new Rect({
            l: -panel.lanes / 2,
            r: panel.lanes / 2,
            b: -panel.h * 0.0025,
            t: panel.h * 0.0025,
        }).add(pos),
        layer.line,
        a,
    )
}

export const getZ = (layer: number, time: number, lane: number) =>
    layer - time / 1000 - lane / 100000
