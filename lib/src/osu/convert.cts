import { MC, MCObject } from '../mc/index.cjs'

export const osuToMC = (osu: string): MC => {
    const sections: Record<string, string[]> = {
        '': [],
    }
    let section = sections['']

    const lines = osu
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => !!line)
        .filter((line) => !line.startsWith('//'))

    for (const line of lines) {
        if (line.startsWith('[') && line.endsWith(']')) {
            section = []
            sections[line.slice(1, -1)] = section

            continue
        }

        section.push(line)
    }

    const circleSizeLine = sections.Difficulty.map((line) =>
        line.split(':').map((value) => value.trim()),
    ).find(([name]) => name === 'CircleSize')
    if (!circleSizeLine) throw new Error('Unexpected missing CircleSize in Difficulty')

    const lanes = +circleSizeLine[1]

    const bpms = [
        {
            from: -Infinity,
            to: Infinity,
            value: 0,
        },
    ]

    for (const line of sections.TimingPoints) {
        const [ms, value] = line
            .split(',')
            .map((value) => value.trim())
            .map((value) => +value)

        if (value < 0) continue

        const time = ms / 1000

        bpms[bpms.length - 1].to = time
        bpms.push({
            from: time,
            to: Infinity,
            value: (60 * 1000) / value,
        })
    }

    const bpmSections: {
        from: number
        to: number
        beat: number
        value: number
    }[] = []

    let offset = 0
    const objects: MCObject[] = []

    let beat = 0

    const [firstBpm, ...restBpms] = bpms

    if (firstBpm.to > 0) {
        bpmSections.push({
            from: 0,
            to: firstBpm.to,
            value: 240 / firstBpm.to,
            beat,
        })
        objects.push({
            type: 'bpm',
            beat: 0,
            bpm: 240 / firstBpm.to,
        })

        beat = 4
    } else {
        offset = firstBpm.to
    }

    for (const bpm of restBpms) {
        bpmSections.push({ ...bpm, beat })
        objects.push({
            type: 'bpm',
            beat,
            bpm: bpm.value,
        })

        beat += ((bpm.to - bpm.from) * bpm.value) / 60
    }

    const timeToBeat = (time: number) => {
        const bpmSection = bpmSections.find(
            (bpmSection) => time >= bpmSection.from && time < bpmSection.to,
        )
        if (!bpmSection) throw new Error(`Unexpected missing bpmSection ${time}`)

        return bpmSection.beat + ((time - bpmSection.from) * bpmSection.value) / 60
    }

    for (const line of sections.HitObjects) {
        const [x, , ms, type, , tailMs] = line
            .split(',')
            .map((value) => value.split(':')[0].trim())
            .map((value) => +value)

        const lane =
            Math.max(0, Math.min(lanes - 1, Math.floor((x * lanes) / 512))) - (lanes - 1) / 2
        const time = ms / 1000
        const beat = timeToBeat(time)

        if (type & 1) {
            objects.push({
                type: 'tap',
                beat,
                lane,
            })
        } else if (type & 128) {
            const tailTime = tailMs / 1000
            const tailBeat = timeToBeat(tailTime)

            objects.push({
                type: 'hold',
                beat,
                lane,
                tailBeat,
            })
        }
    }

    return {
        offset,
        lanes,
        objects,
    }
}
