export type MC = {
    offset: number
    lanes: number
    objects: MCObject[]
}

export type MCObject = MCBpmChangeObject | MCTapNote | MCHoldNote

type BaseMCObject = {
    beat: number
}

export type MCBpmChangeObject = BaseMCObject & {
    type: 'bpm'
    bpm: number
}

type BaseMCNote = BaseMCObject & {
    lane: number
}

export type MCTapNote = BaseMCNote & {
    type: 'tap'
}

export type MCHoldNote = BaseMCNote & {
    type: 'hold'
    tailBeat: number
}
