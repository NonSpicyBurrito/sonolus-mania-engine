import { effect } from '../../effect.mjs'
import { particle, playHitEffect, playLaneEffect } from '../../particle.mjs'

export const holdEndNoteHit = {
    enter() {
        effect.clips.perfect.play(0)

        playHitEffect(particle.effects.holdNote)
        playLaneEffect()
    },
}
