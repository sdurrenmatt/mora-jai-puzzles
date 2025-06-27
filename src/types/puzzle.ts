import type { Corners } from "./corners"
import type { Tile } from "./tile"

export type Puzzle = {
    corners: Corners
    tiles: Tile[][]
    solved: boolean
}