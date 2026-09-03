import { DatabaseEngineItem, TextFunction } from '@sonolus/core'

export { mcToLevelData } from './mc/convert.js'
export * from './mc/index.js'
export { osuToMC } from './osu/convert.js'

export const version = '1.4.3'

export const engineFullName = {
    en: 'Mania',
} as const

export const engineShortName = {
    en: 'Mania',
} as const

export const databaseEngineItem = {
    name: 'mania',
    version: 13,
    title: { en: `${TextFunction.Localize}:${JSON.stringify(engineShortName)}` },
    subtitle: { en: `${TextFunction.Localize}:${JSON.stringify(engineFullName)}` },
    author: {
        en: 'Burrito#1000',
    },
    description: {
        en: [
            'A Beatmania inspired engine in Sonolus.',
            '',
            'Version:',
            version,
            '',
            'GitHub Repository:',
            'https://github.com/NonSpicyBurrito/sonolus-mania-engine',
        ].join('\n'),
    },
} as const satisfies Partial<DatabaseEngineItem>
