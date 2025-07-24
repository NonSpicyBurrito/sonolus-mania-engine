import { ParticleEffectName } from '@sonolus/core'
import { note } from './note.js'

export const particle = defineParticle({
    effects: {
        lane: ParticleEffectName.LaneLinear,

        tapNote: ParticleEffectName.NoteCircularTapCyan,
        holdNote: ParticleEffectName.NoteCircularTapGreen,

        hold: ParticleEffectName.NoteCircularHoldGreen,
    },
})

export const hitEffectLayout = () => effectLayout(2)

export const holdEffectLayout = () => effectLayout(1.2)

const effectLayout = (size: number) => Rect.one.mul(size).scale(0.5, -note.h).translate(0, 1)

export const playHitEffect = (effect: ParticleEffect) => effect.spawn(hitEffectLayout(), 0.5, false)

export const playLaneEffect = () =>
    particle.effects.lane.spawn(new Rect({ l: -0.5, r: 0.5, b: 1, t: 0 }), 0.2, false)

export const spawnHoldEffect = () => particle.effects.hold.spawn(holdEffectLayout(), 1, true)
