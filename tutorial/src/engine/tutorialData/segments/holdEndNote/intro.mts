import { connector } from '../../components/connector.mjs'
import { noteDisplay } from '../../components/noteDisplay.mjs'

export const holdEndNoteIntro = {
    enter() {
        noteDisplay.showOverlay('holdEnd')
        connector.showOverlayOut()
    },

    exit() {
        noteDisplay.clear()
        connector.clear()
    },
}
