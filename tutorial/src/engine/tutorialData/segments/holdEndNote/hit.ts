import { effect } from '../../effect.js'
import { particle, playHitEffect, playLaneEffect } from '../../particle.js'

export const holdEndNoteHit = {
    enter() {
        effect.clips.perfect.play(0)

        playHitEffect(particle.effects.holdNote)
        playLaneEffect()
    },
}
