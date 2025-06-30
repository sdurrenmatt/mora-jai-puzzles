import { CornerPositions, type Color, type CornerPosition, type Puzzle, type Tile } from "./types"

export function shiftRow(p: Puzzle, i: number) {
    const newTiles = p.tiles.map((row, rowIndex) => rowIndex === i ? [row[row.length - 1], ...row.slice(0, -1)] : row)

    return { ...p, tiles: newTiles }
}

export function swapTiles(p: Puzzle, i1: number, j1: number, i2: number, j2: number): Puzzle {
    if (i1 === i2 && j1 === j2) return p

    const newTiles = p.tiles.map(row => [...row])

    const tmpTile = newTiles[i1][j1]
    newTiles[i1][j1] = newTiles[i2][j2]
    newTiles[i2][j2] = tmpTile

    return { ...p, tiles: newTiles }
}

export function shiftTiles(p: Puzzle, positions: [number, number][]): Puzzle {
    const newTiles = p.tiles.map(row => [...row])
    const tilesToShift = positions.map(([x, y]) => p.tiles[x][y])
    const shiftedTiles = [tilesToShift[tilesToShift.length - 1], ...tilesToShift.slice(0, -1)]

    positions.forEach(([x, y], i) => {
        newTiles[x][y] = shiftedTiles[i]
    })

    return { ...p, tiles: newTiles }
}

export function getAdjacentTiles(p: Puzzle, i: number, j: number): Tile[] {
    return [
        i > 0 ? p.tiles[i - 1][j] : null,
        i < p.tiles.length - 1 ? p.tiles[i + 1][j] : null,
        j > 0 ? p.tiles[i][j - 1] : null,
        j < p.tiles[0].length - 1 ? p.tiles[i][j + 1] : null,
    ].filter(Boolean) as Tile[]
}

export function getAdjacentPositions(p: Puzzle, i: number, j: number): [number, number][] {
    return [
        [i - 1, j],
        [i + 1, j],
        [i, j - 1],
        [i, j + 1],
    ].filter(([x, y]) => x >= 0 && x < p.tiles.length && y >= 0 && y < p.tiles[0].length) as [number, number][]
}

export function getSurroundingPositions(p: Puzzle, i: number, j: number): [number, number][] {
    return [
        [i - 1, j],
        [i - 1, j + 1],
        [i, j + 1],
        [i + 1, j + 1],
        [i + 1, j],
        [i + 1, j - 1],
        [i, j - 1],
        [i - 1, j - 1],
    ].filter(([x, y]) => x >= 0 && x < p.tiles.length && y >= 0 && y < p.tiles[0].length) as [number, number][]
}

export function findMajorColor(tiles: Tile[]): Color | null {
    if (tiles.length === 0) return null

    const counts = tiles.reduce((counts, tile) => {
        counts[tile.color] = (counts[tile.color] ?? 0) + 1
        return counts
    }, {} as Record<Color, number>)

    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1])
    const [majorColor, maxCount] = sorted[0]
    const secondCount = sorted[1]?.[1]

    return secondCount === maxCount ? null : majorColor as Color
}

export function checkMatched(p: Puzzle, position: CornerPosition): boolean {
    const cornerColor = p.corners[position].color
    switch (position) {
        case CornerPositions.TL: return cornerColor === p.tiles[0][0].color
        case CornerPositions.TR: return cornerColor === p.tiles[0][p.tiles[0].length - 1].color
        case CornerPositions.BL: return cornerColor === p.tiles[p.tiles.length - 1][0].color
        case CornerPositions.BR: return cornerColor === p.tiles[p.tiles.length - 1][p.tiles[0].length - 1].color
    }
}

export function markMatched(p: Puzzle, position: CornerPosition): Puzzle {
    return {
        ...p,
        corners: {
            ...p.corners,
            [position]: {
                ...p.corners[position],
                matched: true,
            },
        }
    }
}

export function unmarkMatched(p: Puzzle, position: CornerPosition): Puzzle {
    return {
        ...p,
        corners: {
            ...p.corners,
            [position]: {
                ...p.corners[position],
                matched: false,
            },
        }
    }
}

export function checkSolved(p: Puzzle): boolean {
    return Object.values(CornerPositions).every(position => p.corners[position].matched)
}

export function markSolved(p: Puzzle): Puzzle {
    return { ...p, solved: true }
}