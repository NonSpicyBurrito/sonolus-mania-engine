export const note = tutorialData({
    h: Number,
})

export const noteLayout = (lane: number, y: number) =>
    Rect.one.mul(0.5).scale(0.5, -note.h).translate(lane, y)
