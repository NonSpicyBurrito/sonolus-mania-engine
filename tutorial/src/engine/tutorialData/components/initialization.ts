import { hand } from '../hand.js'
import { note } from '../note.js'
import { particle } from '../particle.js'
import { scaledScreen } from '../scaledScreen.js'
import { skin } from '../skin.js'

export const initialization = {
    preprocess() {
        const w = (0.8 * screen.h) / 5

        const t = screen.r + w / 2
        const b = Math.lerp(screen.r, screen.l, 0.85)

        scaledScreen.w = screen.h / w
        scaledScreen.h = screen.w / (b - t)

        note.h = w / (t - b) / 2

        new Vec(0, -1)
            .rotate(Math.PI / 2 + Math.PI / 3)
            .mul(0.25 * ui.configuration.instruction.scale)
            .translate(-b, 0)
            .copyTo(hand.position)

        const transform = Mat.identity
            .scale(w, b - t)
            .translate(0, t)
            .rotate(Math.PI / 2)
        skin.transform.set(transform)
        particle.transform.set(transform)

        const gap = 0.05
        const uiRect = screen.rect.shrink(gap, gap)

        ui.menu.set({
            anchor: uiRect.lt,
            pivot: { x: 1, y: 1 },
            size: new Vec(0.15, 0.15).mul(ui.configuration.menu.scale),
            rotation: 90,
            alpha: ui.configuration.menu.alpha,
            background: true,
        })

        ui.navigation.previous.set({
            anchor: uiRect.cb,
            pivot: { x: 0, y: 0.5 },
            size: new Vec(0.15, 0.15).mul(ui.configuration.navigation.scale),
            rotation: 90,
            alpha: ui.configuration.navigation.alpha,
            background: true,
        })
        ui.navigation.next.set({
            anchor: uiRect.ct,
            pivot: { x: 1, y: 0.5 },
            size: new Vec(0.15, 0.15).mul(ui.configuration.navigation.scale),
            rotation: 90,
            alpha: ui.configuration.navigation.alpha,
            background: true,
        })

        ui.instruction.set({
            anchor: Vec.zero,
            pivot: { x: 0.5, y: 0.5 },
            size: new Vec(1.2, 0.15).mul(ui.configuration.instruction.scale),
            rotation: 90,
            alpha: ui.configuration.instruction.alpha,
            background: true,
        })
    },
}
