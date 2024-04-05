import { EngineArchetypeName } from '@sonolus/core'
import { BpmChange } from './BpmChange.mjs'
import { HoldConnector } from './HoldConnector.mjs'
import { Initialization } from './Initialization.mjs'
import { Stage } from './Stage.mjs'
import { HoldEndNote } from './notes/HoldEndNote.mjs'
import { HoldStartNote } from './notes/singleNotes/HoldStartNote.mjs'
import { TapNote } from './notes/singleNotes/TapNote.mjs'

export const archetypes = defineArchetypes({
    Initialization,

    [EngineArchetypeName.BpmChange]: BpmChange,

    Stage,

    TapNote,
    HoldStartNote,
    HoldEndNote,

    HoldConnector,
})
