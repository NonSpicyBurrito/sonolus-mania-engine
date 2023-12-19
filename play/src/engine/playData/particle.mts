import { ParticleEffectName } from 'sonolus-core'
import { options } from '../configuration/options.mjs'
import { note } from './note.mjs'

export const particle = defineParticle({
    effects: {
        lane: ParticleEffectName.LaneLinear,

        tapNote: ParticleEffectName.NoteCircularTapCyan,
        holdNote: ParticleEffectName.NoteCircularTapGreen,

        hold: ParticleEffectName.NoteCircularHoldGreen,
    },
})

export const hitEffectLayout = (lane: number) => effectLayout(2, lane)

export const holdEffectLayout = (lane: number) => effectLayout(1.2, lane)

const effectLayout = (size: number, lane: number) =>
    Rect.one
        .mul(options.noteEffectSize * size)
        .scale(0.5, -note.h)
        .translate(lane, 1)
