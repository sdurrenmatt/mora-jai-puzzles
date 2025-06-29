import type { Color } from "../types/colors"
import { CornerPositions, type CornerPosition } from "../types/cornerPositions"
import type { Puzzle } from "../types/puzzle"
import type { Tile } from "../types/tile"

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

export function isCornerMatched(p: Puzzle, position: CornerPosition): boolean {
    const cornerColor = p.corners[position].color
    switch (position) {
        case CornerPositions.TL: return cornerColor === p.tiles[0][0].color
        case CornerPositions.TR: return cornerColor === p.tiles[0][p.tiles[0].length - 1].color
        case CornerPositions.BL: return cornerColor === p.tiles[p.tiles.length - 1][0].color
        case CornerPositions.BR: return cornerColor === p.tiles[p.tiles.length - 1][p.tiles[0].length - 1].color
    }
}

export function isSolved(p: Puzzle): boolean {
    return !!(p.corners.tl.matched && p.corners.tr.matched && p.corners.bl.matched && p.corners.br.matched)
}