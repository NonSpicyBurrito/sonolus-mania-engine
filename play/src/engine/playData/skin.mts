import { SkinSpriteName } from '@sonolus/core'

export const skin = defineSkin({
    renderMode: 'lightweight',
    sprites: {
        cover: SkinSpriteName.StageCover,

        lane: SkinSpriteName.Lane,
        stageLeftBorder: SkinSpriteName.StageLeftBorder,
        stageRightBorder: SkinSpriteName.StageRightBorder,
        judgmentLine: SkinSpriteName.JudgmentLine,
        slot: SkinSpriteName.NoteSlot,

        tapNote: SkinSpriteName.NoteHeadCyan,

        holdStartNote: SkinSpriteName.NoteHeadGreen,
        holdEndNote: SkinSpriteName.NoteTailGreen,

        connector: SkinSpriteName.NoteConnectionGreen,
    },
})

export const layer = {
    cover: 1000,

    note: {
        body: 100,
        slide: 99,
        connector: 98,
    },

    slot: 2,
    judgmentLine: 1,
    stage: 0,
}

export const getZ = (layer: number, time: number, lane: number) =>
    layer - time / 1000 - lane / 100000
