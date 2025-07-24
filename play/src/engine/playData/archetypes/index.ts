import { HoldConnector } from './HoldConnector.js'
import { Initialization } from './Initialization.js'
import { InputManager } from './InputManager.js'
import { Stage } from './Stage.js'
import { HoldEndNote } from './notes/HoldEndNote.js'
import { HoldStartNote } from './notes/singleNotes/HoldStartNote.js'
import { TapNote } from './notes/singleNotes/TapNote.js'

export const archetypes = defineArchetypes({
    Initialization,
    InputManager,

    Stage,

    TapNote,
    HoldStartNote,
    HoldEndNote,

    HoldConnector,
})
