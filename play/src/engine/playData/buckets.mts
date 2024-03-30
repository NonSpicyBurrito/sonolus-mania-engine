import { Text } from 'sonolus-core'
import { skin } from './skin.mjs'

export const buckets = defineBuckets({
    tapNote: {
        sprites: [
            {
                id: skin.sprites.tapNote.id,
                x: 0,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
        ],
        unit: Text.MillisecondUnit,
    },
    holdStartNote: {
        sprites: [
            {
                id: skin.sprites.connector.id,
                x: 0.5,
                y: 0,
                w: 2,
                h: 5,
                rotation: -90,
            },
            {
                id: skin.sprites.holdStartNote.id,
                x: -2,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
        ],
        unit: Text.MillisecondUnit,
    },
    holdEndNote: {
        sprites: [
            {
                id: skin.sprites.connector.id,
                x: -0.5,
                y: 0,
                w: 2,
                h: 5,
                rotation: -90,
            },
            {
                id: skin.sprites.holdEndNote.id,
                x: 2,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
        ],
        unit: Text.MillisecondUnit,
    },
})
