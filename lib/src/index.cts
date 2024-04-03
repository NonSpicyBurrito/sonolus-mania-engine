import { DatabaseEngineItem } from '@sonolus/core'
import { resolve } from 'node:path'

export { mcToLevelData } from './mc/convert.cjs'
export * from './mc/index.cjs'
export { osuToMC } from './osu/convert.cjs'

export const version = '1.1.1'

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

export const engineConfigurationPath = resolve(__dirname, 'EngineConfiguration')
export const enginePlayDataPath = resolve(__dirname, 'EnginePlayData')
export const engineWatchDataPath = resolve(__dirname, 'EngineWatchData')
export const enginePreviewDataPath = resolve(__dirname, 'EnginePreviewData')
export const engineTutorialDataPath = resolve(__dirname, 'EngineTutorialData')
export const engineThumbnailPath = resolve(__dirname, 'thumbnail.png')
