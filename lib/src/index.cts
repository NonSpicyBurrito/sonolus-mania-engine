import { DatabaseEngineItem } from '@sonolus/core'

export { mcToLevelData } from './mc/convert.cjs'
export * from './mc/index.cjs'
export { osuToMC } from './osu/convert.cjs'

export const version = '1.2.2'

export const databaseEngineItem = {
    name: 'mania',
    version: 12,
    title: {
        en: 'Mania',
    },
    subtitle: {
        en: 'Mania',
    },
    author: {
        en: 'Burrito',
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
