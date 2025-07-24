import {
    EngineArchetypeDataName,
    EngineArchetypeName,
    LevelData,
    LevelDataEntity,
} from '@sonolus/core'
import { MC, MCBpmChangeObject, MCHoldNote, MCObject, MCTapNote } from './index.js'

type Handler<T extends MCObject> = (object: T) => {
    archetype: string
    data: Record<string, number | object>
}[]

export const mcToLevelData = (mc: MC, offset = 0): LevelData => {
    const entities: LevelDataEntity[] = [
        {
            archetype: 'Initialization',
            data: [
                {
                    name: 'lanes',
                    value: mc.lanes,
                },
            ],
        },
        {
            archetype: 'Stage',
            data: [],
        },
    ]

    let i = 0
    const getRef = () => (i++).toString(36)

    const entityMap = new Map<object, LevelDataEntity>()

    for (const object of mc.objects) {
        for (const obj of handlers[object.type](object as never)) {
            const entity: LevelDataEntity = {
                archetype: obj.archetype,
                data: Object.entries(obj.data).map(([name, value]) => {
                    if (typeof value === 'number') return { name, value }

                    const entity = entityMap.get(value)
                    if (!entity) throw new Error('Unexpected missing entity')

                    const ref = getRef()
                    entity.name = ref

                    return { name, ref }
                }),
            }

            entityMap.set(obj, entity)
            entities.push(entity)
        }
    }

    return {
        bgmOffset: mc.offset + offset,
        entities,
    }
}

const bpm: Handler<MCBpmChangeObject> = (object) => [
    {
        archetype: EngineArchetypeName.BpmChange,
        data: {
            [EngineArchetypeDataName.Beat]: object.beat,
            [EngineArchetypeDataName.Bpm]: object.bpm,
        },
    },
]

const tap: Handler<MCTapNote> = (object) => [
    {
        archetype: 'TapNote',
        data: {
            [EngineArchetypeDataName.Beat]: object.beat,
            lane: object.lane,
        },
    },
]

const hold: Handler<MCHoldNote> = (object) => {
    const head = {
        archetype: 'HoldStartNote',
        data: {
            [EngineArchetypeDataName.Beat]: object.beat,
            lane: object.lane,
        },
    }

    const tail = {
        archetype: 'HoldEndNote',
        data: {
            [EngineArchetypeDataName.Beat]: object.tailBeat,
            prev: head,
        },
    }

    const connector = {
        archetype: 'HoldConnector',
        data: {
            tail,
        },
    }

    return [head, tail, connector]
}

const handlers: {
    [K in MCObject['type']]: Handler<Extract<MCObject, { type: K }>>
} = {
    bpm,
    tap,
    hold,
}
