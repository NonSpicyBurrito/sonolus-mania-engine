import { hand } from '../hand.mjs'
import { note } from '../note.mjs'
import { particle } from '../particle.mjs'
import { scaledScreen } from '../scaledScreen.mjs'
import { skin } from '../skin.mjs'

export const initialization = {
    preprocess() {
        const w = (0.8 * screen.w) / 5

        const t = screen.t + w / 2
        const b = Math.lerp(screen.t, screen.b, 0.85)

        scaledScreen.w = screen.w / w
        scaledScreen.h = screen.h / (b - t)

        note.h = w / (t - b) / 2

        new Vec(0, -1)
            .rotate(Math.PI / 3)
            .mul(0.25 * ui.configuration.instruction.scale)
            .translate(0, b)
            .copyTo(hand.position)

        const transform = Mat.identity.scale(w, b - t).translate(0, t)
        skin.transform.set(transform)
        particle.transform.set(transform)

        const gap = 0.05
        const uiRect = screen.rect.shrink(gap, gap)

        ui.menu.set({
            anchor: uiRect.rt,
            pivot: { x: 1, y: 1 },
            size: new Vec(0.15, 0.15).mul(ui.configuration.menu.scale),
            rotation: 0,
            alpha: ui.configuration.menu.alpha,
            background: true,
        })

        ui.navigation.previous.set({
            anchor: uiRect.cl,
            pivot: { x: 0, y: 0.5 },
            size: new Vec(0.15, 0.15).mul(ui.configuration.navigation.scale),
            rotation: 0,
            alpha: ui.configuration.navigation.alpha,
            background: true,
        })
        ui.navigation.next.set({
            anchor: uiRect.cr,
            pivot: { x: 1, y: 0.5 },
            size: new Vec(0.15, 0.15).mul(ui.configuration.navigation.scale),
            rotation: 0,
            alpha: ui.configuration.navigation.alpha,
            background: true,
        })

        ui.instruction.set({
            anchor: Vec.zero,
            pivot: { x: 0.5, y: 0.5 },
            size: new Vec(1.2, 0.15).mul(ui.configuration.instruction.scale),
            rotation: 0,
            alpha: ui.configuration.instruction.alpha,
            background: true,
        })
    },
}
