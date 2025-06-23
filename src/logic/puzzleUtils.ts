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

export function countColors(tiles: Tile[]): Record<Color, number> {
    return tiles.reduce((counts, tile) => {
        counts[tile.color] = (counts[tile.color] ?? 0) + 1
        return counts
    }, {} as Record<Color, number>)
}

export function findMajorColor(counts: Record<Color, number>): Color | null {
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1])
    const [majorColor, maxCount] = sorted[0]
    const secondCount = sorted[1]?.[1]
    return secondCount === maxCount ? null : majorColor as Color
}