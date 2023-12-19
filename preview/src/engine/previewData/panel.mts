import { archetypes } from './archetypes/index.mjs'
import { chart } from './chart.mjs'

export const panel = {
    get w() {
        return this.lanes + 4
    },

    h: 2,

    get lanes() {
        return archetypes.Initialization.data.get(0).lanes
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
