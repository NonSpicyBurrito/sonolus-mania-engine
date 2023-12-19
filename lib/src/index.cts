import { EngineInfo } from 'sonolus-core'
import { Resource } from './Resource.cjs'

export { mcToLevelData } from './mc/convert.cjs'
export * from './mc/index.cjs'
export { osuToMC } from './osu/convert.cjs'

export const version = '1.0.0'

export const engineInfo = {
    name: 'mania',
    version: 11,
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
} as const satisfies Partial<EngineInfo>

export const engineConfiguration = new Resource('EngineConfiguration')
export const enginePlayData = new Resource('EnginePlayData')
export const engineWatchData = new Resource('EngineWatchData')
export const enginePreviewData = new Resource('EnginePreviewData')
export const engineTutorialData = new Resource('EngineTutorialData')
export const engineThumbnail = new Resource('thumbnail.png')
