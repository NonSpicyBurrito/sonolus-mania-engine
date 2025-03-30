import { SkinSpriteName } from '@sonolus/core'

export const skin = defineSkin({
    sprites: {
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
    note: 100,

    slide: 90,

    connector: 80,

    slot: 2,
    judgmentLine: 1,
    stage: 0,
}
