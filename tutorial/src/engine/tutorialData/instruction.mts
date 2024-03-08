import { InstructionIconName, InstructionText } from 'sonolus-core'
import { hand } from './hand.mjs'

export const instruction = defineInstruction({
    texts: {
        tap: InstructionText.Tap,
        tapAndHold: InstructionText.TapAndHold,
        release: InstructionText.Release,
    },

    icons: {
        hand: InstructionIconName.Hand,
    },
})

export const drawHand = (angle: number, a: number) =>
    instruction.icons.hand.paint(
        new Vec(-1, 0)
            .rotate(angle)
            .mul(0.25 * ui.configuration.instruction.scale)
            .add(hand.position),
        0.25 * ui.configuration.instruction.scale,
        (180 * angle) / Math.PI + 90,
        0,
        a * ui.configuration.instruction.alpha,
    )
