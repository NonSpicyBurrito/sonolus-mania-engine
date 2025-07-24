import { options } from '../configuration/options.js'

export const note = {
    ...levelData({
        h: Number,
    }),

    get duration() {
        return 13720 / options.noteSpeed / 1000
    },
}

export const noteLayout = (lane: number, y: number) =>
    Rect.one.mul(options.noteSize).scale(0.5, -note.h).translate(lane, y)
