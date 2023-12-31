import { EngineConfigurationOption, NameText, UnitText } from 'sonolus-core'

export const optionsDefinition = {
    speed: {
        name: NameText.LevelSpeed,
        standard: true,
        advanced: true,
        type: 'slider',
        def: 1,
        min: 0.5,
        max: 2,
        step: 0.05,
        unit: UnitText.Percentage,
    },
    hidden: {
        name: NameText.Hidden,
        standard: true,
        advanced: true,
        type: 'slider',
        def: 0,
        min: 0,
        max: 1,
        step: 0.05,
        unit: UnitText.Percentage,
    },
    noteSpeed: {
        name: NameText.NoteSpeed,
        scope: 'Mania',
        type: 'slider',
        def: 10,
        min: 1,
        max: 80,
        step: 0.1,
    },
    mirror: {
        name: NameText.MirrorLevel,
        type: 'toggle',
        def: 0,
    },
    sfxEnabled: {
        name: NameText.SFX,
        scope: 'Mania',
        type: 'toggle',
        def: 1,
    },
    autoSFX: {
        name: NameText.AutoSFX,
        scope: 'Mania',
        type: 'toggle',
        def: 0,
    },
    noteSize: {
        name: NameText.NoteSize,
        scope: 'Mania',
        type: 'slider',
        def: 0.5,
        min: 0.1,
        max: 2,
        step: 0.05,
        unit: UnitText.Percentage,
    },
    noteEffectEnabled: {
        name: NameText.NoteEffect,
        scope: 'Mania',
        type: 'toggle',
        def: 1,
    },
    noteEffectSize: {
        name: NameText.NoteEffectSize,
        scope: 'Mania',
        type: 'slider',
        def: 1,
        min: 0.1,
        max: 2,
        step: 0.05,
        unit: UnitText.Percentage,
    },
    connectorAlpha: {
        name: NameText.ConnectorTransparency,
        scope: 'Mania',
        type: 'slider',
        def: 1,
        min: 0.1,
        max: 1,
        step: 0.05,
        unit: UnitText.Percentage,
    },
    laneEffectEnabled: {
        name: NameText.LaneEffect,
        scope: 'Mania',
        type: 'toggle',
        def: 1,
    },
    judgeLinePosition: {
        name: NameText.JudgmentLinePosition,
        scope: 'Mania',
        type: 'slider',
        def: 0.85,
        min: 0.5,
        max: 1,
        step: 0.05,
        unit: UnitText.Percentage,
    },
    stageCover: {
        name: NameText.VerticalStageCover,
        scope: 'Mania',
        advanced: true,
        type: 'slider',
        def: 0,
        min: 0,
        max: 1,
        step: 0.05,
        unit: UnitText.Percentage,
    },
    stageSize: {
        name: NameText.StageSize,
        scope: 'Mania',
        type: 'slider',
        def: 0.8,
        min: 0.1,
        max: 2,
        step: 0.05,
        unit: UnitText.Percentage,
    },
    lockStageAspectRatio: {
        name: NameText.LockStageAspectRatio,
        scope: 'Mania',
        type: 'toggle',
        def: 0,
    },
} satisfies Record<string, EngineConfigurationOption>
