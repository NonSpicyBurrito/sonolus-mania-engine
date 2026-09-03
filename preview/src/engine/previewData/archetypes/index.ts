import { EngineArchetypeName } from '@sonolus/core'

import { BpmChange } from './BpmChange.js'
import { HoldConnector } from './HoldConnector.js'
import { Initialization } from './Initialization.js'
import { HoldEndNote } from './notes/HoldEndNote.js'
import { HoldStartNote } from './notes/singleNotes/HoldStartNote.js'
import { TapNote } from './notes/singleNotes/TapNote.js'
import { Stage } from './Stage.js'

export const archetypes = defineArchetypes({
    Initialization,

    [EngineArchetypeName.BpmChange]: BpmChange,

    Stage,

    TapNote,
    HoldStartNote,
    HoldEndNote,

    HoldConnector,
})
