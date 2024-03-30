import { bounds } from '../../../../../shared/src/engine/data/utils.mjs'
import { options } from '../../configuration/options.mjs'
import { note } from '../note.mjs'
import { particle } from '../particle.mjs'
import { scaledScreen } from '../scaledScreen.mjs'
import { skin } from '../skin.mjs'
import { archetypes } from './index.mjs'

export class Initialization extends Archetype {
    import = this.defineImport({
        lanes: { name: 'lanes', type: Number },
    })

    preprocess() {
        const angle = (options.stageDirection * Math.PI) / 2
        const inverted = options.stageDirection > 1

        const rotatedScreen = bounds(screen.rect.toQuad().rotate(angle))

        const w =
            options.stageSize *
            (options.lockStageAspectRatio
                ? rotatedScreen.h / 4
                : rotatedScreen.w / this.import.lanes)

        const t = rotatedScreen.t + w / 2
        const b = Math.lerp(rotatedScreen.t, rotatedScreen.b, options.judgeLinePosition)

        scaledScreen.l = rotatedScreen.l / w
        scaledScreen.r = rotatedScreen.r / w
        scaledScreen.b = (rotatedScreen.b - t) / (b - t)
        scaledScreen.t = (rotatedScreen.t - t) / (b - t)

        scaledScreen.w = rotatedScreen.w / w
        scaledScreen.h = rotatedScreen.h / (b - t)

        note.h = w / (t - b) / 2

        const transform = Mat.identity
            .scale(w, b - t)
            .translate(0, t)
            .rotate(angle)
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

        if (options.stageDirection % 2 === 0) {
            this.setupHorizontalUI(inverted)
        } else {
            this.setupVerticalUI(inverted)
        }

        for (const archetype of Object.values(archetypes)) {
            if (!('globalPreprocess' in archetype)) continue

            archetype.globalPreprocess()
        }
    }

    setupVerticalUI(inverted: boolean) {
        const gap = 0.05
        const uiRect = screen.rect.shrink(gap, gap)

        ui.menu.set({
            anchor: uiRect.lt,
            pivot: { x: 1, y: 1 },
            size: new Vec(0.15, 0.15).mul(ui.configuration.menu.scale),
            rotation: 90,
            alpha: ui.configuration.menu.alpha,
            horizontalAlign: HorizontalAlign.Center,
            background: true,
        })

        ui.metric.primary.bar.set({
            anchor: uiRect.lb,
            pivot: { x: 0, y: 1 },
            size: new Vec(0.75, 0.15).mul(ui.configuration.metric.primary.scale),
            rotation: 90,
            alpha: ui.configuration.metric.primary.alpha,
            horizontalAlign: HorizontalAlign.Left,
            background: true,
        })
        ui.metric.primary.value.set({
            anchor: uiRect.lb.add(new Vec(0.035, 0.715).mul(ui.configuration.metric.primary.scale)),
            pivot: { x: 1, y: 1 },
            size: new Vec(0, 0.08).mul(ui.configuration.metric.primary.scale),
            rotation: 90,
            alpha: ui.configuration.metric.primary.alpha,
            horizontalAlign: HorizontalAlign.Right,
            background: false,
        })

        ui.metric.secondary.bar.set({
            anchor: uiRect.lt
                .sub(new Vec(0, gap))
                .sub(new Vec(0, 0.15).mul(ui.configuration.menu.scale)),
            pivot: { x: 1, y: 1 },
            size: new Vec(0.55, 0.15).mul(ui.configuration.metric.secondary.scale),
            rotation: 90,
            alpha: ui.configuration.metric.secondary.alpha,
            horizontalAlign: HorizontalAlign.Left,
            background: true,
        })
        ui.metric.secondary.value.set({
            anchor: uiRect.lt
                .sub(new Vec(0, gap))
                .sub(new Vec(0, 0.15).mul(ui.configuration.menu.scale))
                .sub(new Vec(-0.035, 0.035).mul(ui.configuration.metric.secondary.scale)),
            pivot: { x: 1, y: 1 },
            size: new Vec(0, 0.08).mul(ui.configuration.metric.secondary.scale),
            rotation: 90,
            alpha: ui.configuration.metric.secondary.alpha,
            horizontalAlign: HorizontalAlign.Right,
            background: false,
        })

        const x = Math.lerp(screen.l, screen.r, inverted ? 0.5 : 0.25)

        const comboSize = new Vec(0, 0.15).mul(ui.configuration.combo.scale)
        const judgmentSize = new Vec(0, 0.1).mul(ui.configuration.judgment.scale)

        ui.combo.value.set({
            anchor: { x: x - (gap + comboSize.y) / 2, y: 0 },
            pivot: { x: 0.5, y: 0.5 },
            size: comboSize,
            rotation: 90,
            alpha: ui.configuration.combo.alpha,
            horizontalAlign: HorizontalAlign.Center,
            background: false,
        })

        ui.judgment.set({
            anchor: { x: x + (gap + comboSize.y) / 2, y: 0 },
            pivot: { x: 0.5, y: 0.5 },
            size: judgmentSize,
            rotation: 90,
            alpha: ui.configuration.judgment.alpha,
            horizontalAlign: HorizontalAlign.Center,
            background: false,
        })
    }

    setupHorizontalUI(inverted: boolean) {
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

        const y = Math.lerp(screen.t, screen.b, inverted ? 0.5 : 0.25)

        const comboSize = new Vec(0, 0.15).mul(ui.configuration.combo.scale)
        const judgmentSize = new Vec(0, 0.1).mul(ui.configuration.judgment.scale)

        ui.combo.value.set({
            anchor: { x: 0, y: y + (gap + comboSize.y) / 2 },
            pivot: { x: 0.5, y: 0.5 },
            size: comboSize,
            rotation: 0,
            alpha: ui.configuration.combo.alpha,
            horizontalAlign: HorizontalAlign.Center,
            background: false,
        })

        ui.judgment.set({
            anchor: { x: 0, y: y - (gap + judgmentSize.y) / 2 },
            pivot: { x: 0.5, y: 0.5 },
            size: judgmentSize,
            rotation: 0,
            alpha: ui.configuration.judgment.alpha,
            horizontalAlign: HorizontalAlign.Center,
            background: false,
        })
    }

    spawnOrder() {
        return 0
    }

    updateSequential() {
        archetypes.InputManager.spawn({})

        this.despawn = true
    }
}
