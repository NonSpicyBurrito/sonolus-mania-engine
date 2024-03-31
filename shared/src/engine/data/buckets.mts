import { EngineDataBucket, Text } from 'sonolus-core'

export const createBucketDefinition = (
    sprites: Record<'tapNote' | 'connector' | 'holdStartNote' | 'holdEndNote', { id: number }>,
) =>
    ({
        tapNote: {
            sprites: [
                {
                    id: sprites.tapNote.id,
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
                    id: sprites.connector.id,
                    x: 0.5,
                    y: 0,
                    w: 2,
                    h: 5,
                    rotation: -90,
                },
                {
                    id: sprites.holdStartNote.id,
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
                    id: sprites.connector.id,
                    x: -0.5,
                    y: 0,
                    w: 2,
                    h: 5,
                    rotation: -90,
                },
                {
                    id: sprites.holdEndNote.id,
                    x: 2,
                    y: 0,
                    w: 2,
                    h: 2,
                    rotation: -90,
                },
            ],
            unit: Text.MillisecondUnit,
        },
    }) as const satisfies Record<string, EngineDataBucket>
