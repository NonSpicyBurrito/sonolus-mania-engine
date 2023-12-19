import { options } from '../../configuration/options.mjs'
import { note } from '../note.mjs'
import { particle } from '../particle.mjs'
import { scaledScreen } from '../scaledScreen.mjs'
import { skin } from '../skin.mjs'
import { archetypes } from './index.mjs'

export class Initialization extends Archetype {
    data = this.defineData({
        lanes: { name: 'lanes', type: Number },
    })

    preprocess() {
        const w =
            options.stageSize *
            (options.lockStageAspectRatio ? screen.h / 4 : screen.w / this.data.lanes)

        const t = screen.t + w / 2
        const b = Math.lerp(screen.t, screen.b, options.judgeLinePosition)

        scaledScreen.l = screen.l / w
        scaledScreen.r = screen.r / w
        scaledScreen.b = (screen.b - t) / (b - t)
        scaledScreen.t = (screen.t - t) / (b - t)

        scaledScreen.w = screen.w / w
        scaledScreen.h = screen.h / (b - t)

        note.h = w / (t - b) / 2

        const transform = Mat.identity.scale(w, b - t).translate(0, t)
        skin.transform.set(transform)
        particle.transform.set(transform)

        score.base.set({
            perfect: 1,
            great: 0.8,
            good: 0.5,
        })
        score.consecutive.great.set({
            multiplier: 0.01,
            step: 100,
            cap: 1000,
        })

        const gap = 0.05
        const uiRect = screen.rect.shrink(gap, gap)

        ui.menu.set({
            anchor: uiRect.rt,
            pivot: { x: 1, y: 1 },
            size: new Vec(0.15, 0.15).mul(ui.configuration.menu.scale),
            rotation: 0,
            alpha: ui.configuration.menu.alpha,
            horizontalAlign: HorizontalAlign.Center,
            background: true,
        })

        ui.metric.primary.bar.set({
            anchor: uiRect.lt,
            pivot: { x: 0, y: 1 },
            size: new Vec(0.75, 0.15).mul(ui.configuration.metric.primary.scale),
            rotation: 0,
            alpha: ui.configuration.metric.primary.alpha,
            horizontalAlign: HorizontalAlign.Left,
            background: true,
        })
        ui.metric.primary.value.set({
            anchor: uiRect.lt.add(
                new Vec(0.715, -0.035).mul(ui.configuration.metric.primary.scale),
            ),
            pivot: { x: 1, y: 1 },
            size: new Vec(0, 0.08).mul(ui.configuration.metric.primary.scale),
            rotation: 0,
            alpha: ui.configuration.metric.primary.alpha,
            horizontalAlign: HorizontalAlign.Right,
            background: false,
        })

        ui.metric.secondary.bar.set({
            anchor: uiRect.rt
                .sub(new Vec(gap, 0))
                .sub(new Vec(0.15, 0).mul(ui.configuration.menu.scale)),
            pivot: { x: 1, y: 1 },
            size: new Vec(0.55, 0.15).mul(ui.configuration.metric.secondary.scale),
            rotation: 0,
            alpha: ui.configuration.metric.secondary.alpha,
            horizontalAlign: HorizontalAlign.Left,
            background: true,
        })
        ui.metric.secondary.value.set({
            anchor: uiRect.rt
                .sub(new Vec(gap, 0))
                .sub(new Vec(0.15, 0).mul(ui.configuration.menu.scale))
                .sub(new Vec(0.035, 0.035).mul(ui.configuration.metric.secondary.scale)),
            pivot: { x: 1, y: 1 },
            size: new Vec(0, 0.08).mul(ui.configuration.metric.secondary.scale),
            rotation: 0,
            alpha: ui.configuration.metric.secondary.alpha,
            horizontalAlign: HorizontalAlign.Right,
            background: false,
        })

        const center = new Vec(0, Math.lerp(screen.t, screen.b, 0.25))

        const comboSize = new Vec(0, 0.15).mul(ui.configuration.combo.scale)
        const judgmentSize = new Vec(0, 0.1).mul(ui.configuration.judgment.scale)

        ui.combo.value.set({
            anchor: center.translate(0, gap / 2).add(comboSize.mul(0.5)),
            pivot: { x: 0.5, y: 0.5 },
            size: comboSize,
            rotation: 0,
            alpha: ui.configuration.combo.alpha,
            horizontalAlign: HorizontalAlign.Center,
            background: false,
        })

        ui.judgment.set({
            anchor: center.translate(0, -gap / 2).sub(judgmentSize.mul(0.5)),
            pivot: { x: 0.5, y: 0.5 },
            size: judgmentSize,
            rotation: 0,
            alpha: ui.configuration.judgment.alpha,
            horizontalAlign: HorizontalAlign.Center,
            background: false,
        })

        for (const archetype of Object.values(archetypes)) {
            if (!('globalPreprocess' in archetype)) continue

            archetype.globalPreprocess()
        }
    }

    spawnOrder() {
        return 0
    }

    updateSequential() {
        this.despawn = true
    }
}
