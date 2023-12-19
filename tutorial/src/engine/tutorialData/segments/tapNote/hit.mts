import { effect } from '../../effect.mjs'
import { particle, playHitEffect, playLaneEffect } from '../../particle.mjs'

export const tapNoteHit = {
    enter() {
        effect.clips.perfect.play(0)

        playHitEffect(particle.effects.tapNote)
        playLaneEffect()
    },
}
