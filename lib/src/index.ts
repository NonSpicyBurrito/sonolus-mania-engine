import { DatabaseEngineItem } from '@sonolus/core'

export { mcToLevelData } from './mc/convert.js'
export * from './mc/index.js'
export { osuToMC } from './osu/convert.js'

export const version = '1.3.4'

export const databaseEngineItem = {
    name: 'mania',
    version: 13,
    title: {
        en: 'Mania',
    },
    subtitle: {
        en: 'Mania',
    },
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
