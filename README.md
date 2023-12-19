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

### `engineInfo`

Partial engine information compatible with [sonolus-express](https://github.com/NonSpicyBurrito/sonolus-express).

### `engineConfiguration`

Engine Configuration.

-   `engineConfiguration.path`: path to file.
-   `engineConfiguration.buffer`: buffer of file.
-   `engineConfiguration.hash`: hash of file.

### `enginePlayData`

Engine Play Data.

-   `enginePlayData.path`: path to file.
-   `enginePlayData.buffer`: buffer of file.
-   `enginePlayData.hash`: hash of file.

### `engineWatchData`

Engine Watch Data.

-   `engineWatchData.path`: path to file.
-   `engineWatchData.buffer`: buffer of file.
-   `engineWatchData.hash`: hash of file.

### `enginePreviewData`

Engine Preview Data.

-   `enginePreviewData.path`: path to file.
-   `enginePreviewData.buffer`: buffer of file.
-   `enginePreviewData.hash`: hash of file.

### `engineTutorialData`

Engine Tutorial Data.

-   `engineTutorialData.path`: path to file.
-   `engineTutorialData.buffer`: buffer of file.
-   `engineTutorialData.hash`: hash of file.

### `engineThumbnail`

Engine Thumbnail.

-   `engineThumbnail.path`: path to file.
-   `engineThumbnail.buffer`: buffer of file.
-   `engineThumbnail.hash`: hash of file.

### `osuToMC(osu)`

Converts osu to MC (Mania Chart).

-   `osu`: osu.

### `mcToLevelData(mc, offset?)`

Converts MC (Mania Chart) to Level Data.

-   `mc`: Mania chart.
-   `offset`: offset (default: `0`).
