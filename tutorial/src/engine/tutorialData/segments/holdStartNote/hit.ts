import { connector } from '../../components/connector.js'
import { effect } from '../../effect.js'
import { drawHand } from '../../instruction.js'
import { particle, playHitEffect, playLaneEffect, spawnHoldEffect } from '../../particle.js'

let sfxInstanceId = tutorialMemory(LoopedEffectClipInstanceId)
let effectInstanceId = tutorialMemory(ParticleEffectInstanceId)

export const holdStartNoteHit = {
    enter() {
        connector.showFrozen()

        effect.clips.perfect.play(0)

        playHitEffect(particle.effects.holdNote)
        playLaneEffect()

        sfxInstanceId = effect.clips.hold.loop()
        effectInstanceId = spawnHoldEffect()
    },

    update() {
        drawHand(Math.PI / 3, 1)
    },

    exit() {
        connector.clear()

        effect.clips.stopLoop(sfxInstanceId)
        particle.effects.destroy(effectInstanceId)
    },
}
