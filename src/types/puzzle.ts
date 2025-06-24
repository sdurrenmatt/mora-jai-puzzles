import type { Corner } from "./corner"
import type { Tile } from "./tile"

export type Puzzle = {
    corners: {
        tl: Corner
        tr: Corner
        bl: Corner
        br: Corner
    }
    tiles: Tile[][]
    solved: boolean
}