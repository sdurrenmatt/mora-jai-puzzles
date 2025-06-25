import type { Color } from "../types/colors"
import type { Puzzle } from "../types/puzzle"
import type { Tile } from "../types/tile"

export function getAdjacentTiles(p: Puzzle, i: number, j: number): Tile[] {
    return [
        i > 0 ? p.tiles[i - 1][j] : null,
        i < 2 ? p.tiles[i + 1][j] : null,
        j > 0 ? p.tiles[i][j - 1] : null,
        j < 2 ? p.tiles[i][j + 1] : null,
    ].filter(Boolean) as Tile[]
}

export function getAdjacentPositions(i: number, j: number): [number, number][] {
    return [
        [i - 1, j],
        [i + 1, j],
        [i, j - 1],
        [i, j + 1],
    ].filter(([x, y]) => x >= 0 && x < 3 && y >= 0 && y < 3) as [number, number][]
}

export function getSurroundingPositions(i: number, j: number): [number, number][] {
    return [
        [i - 1, j],
        [i - 1, j + 1],
        [i, j + 1],
        [i + 1, j + 1],
        [i + 1, j],
        [i + 1, j - 1],
        [i, j - 1],
        [i - 1, j - 1],
    ].filter(([x, y]) => x >= 0 && x < 3 && y >= 0 && y < 3) as [number, number][]
}

export function findMajorColor(tiles: Tile[]): Color | null {
    const counts = tiles.reduce((counts, tile) => {
        counts[tile.color] = (counts[tile.color] ?? 0) + 1
        return counts
    }, {} as Record<Color, number>)

    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1])
    const [majorColor, maxCount] = sorted[0]
    const secondCount = sorted[1]?.[1]

    return secondCount === maxCount ? null : majorColor as Color
}

export function isSolved(p: Puzzle): boolean {
    return p.tiles[0][0].color === p.corners.tl.color
        && p.tiles[0][2].color === p.corners.tr.color
        && p.tiles[2][0].color === p.corners.bl.color
        && p.tiles[2][2].color === p.corners.br.color
}