import { options } from '../configuration/options.js'
import { archetypes } from './archetypes/index.js'
import { chart } from './chart.js'

export const panel = {
    get w() {
        return this.lanes + 4
    },
    get h() {
        return 2 / options.previewVerticalScale
    },

    get lanes() {
        return archetypes.Initialization.import.get(0).lanes
    },

    get count() {
        return Math.ceil(chart.duration / this.h)
    },

    getX(time: number) {
        return Math.floor(time / this.h) * this.w
    },

    getY(time: number) {
        return time % this.h
    },

    getPos(time: number) {
        return new Vec(this.getX(time), this.getY(time))
    },
}
