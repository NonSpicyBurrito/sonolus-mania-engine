import { connector } from '../../components/connector.mjs'
import { noteDisplay } from '../../components/noteDisplay.mjs'
import { effect } from '../../effect.mjs'
import { drawHand } from '../../instruction.mjs'
import { particle, spawnHoldEffect } from '../../particle.mjs'

let sfxInstanceId = tutorialMemory(LoopedEffectClipInstanceId)
let effectInstanceId = tutorialMemory(ParticleEffectInstanceId)

export const holdEndNoteFall = {
    enter() {
        noteDisplay.showFall('holdEnd')
        connector.showFallOut()

        sfxInstanceId = effect.clips.hold.loop()
        effectInstanceId = spawnHoldEffect()
    },

    update() {
        drawHand(Math.PI / 3, 1)
    },

    exit() {
        noteDisplay.clear()
        connector.clear()

        effect.clips.stopLoop(sfxInstanceId)
        particle.effects.destroy(effectInstanceId)
    },
}
