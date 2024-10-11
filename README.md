# Sonolus Mania Engine

A Beatmania inspired engine in [Sonolus](https://sonolus.com).

## Links

-   [Sonolus Website](https://sonolus.com)
-   [Sonolus Wiki](https://github.com/NonSpicyBurrito/sonolus-wiki)

## Installation

```
npm install sonolus-mania-engine
```

## Documentation

### `version`

Package version.

### `databaseEngineItem`

Partial database engine item compatible with [sonolus-express](https://github.com/NonSpicyBurrito/sonolus-express).

### `osuToMC(osu)`

Converts osu to MC (Mania Chart).

-   `osu`: osu.

### `mcToLevelData(mc, offset?)`

Converts MC (Mania Chart) to Level Data.

-   `mc`: Mania chart.
-   `offset`: offset (default: `0`).

### Assets

The following assets are exposed as package entry points:

-   `EngineConfiguration`
-   `EnginePlayData`
-   `EngineWatchData`
-   `EnginePreviewData`
-   `EngineTutorialData`
-   `EngineThumbnail`

In Node.js, you can obtain path to assets using `require.resolve('sonolus-taiko-engine/EngineConfiguration')` or `import.meta.resolve('sonolus-taiko-engine/EngineConfiguration')`.
