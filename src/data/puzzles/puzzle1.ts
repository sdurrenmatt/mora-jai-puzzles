import { Colors } from "../../types/colors"
import type { Puzzle } from "../../types/puzzle"

export const puzzle1: Puzzle = {
    corners: {
        tl: { color: Colors.Pink },
        tr: { color: Colors.Pink },
        bl: { color: Colors.Pink },
        br: { color: Colors.Pink },
    },
    tiles: [
        [{ color: Colors.Pink }, { color: Colors.Pink }, { color: Colors.Gray }],
        [{ color: Colors.Gray }, { color: Colors.Gray }, { color: Colors.Gray }],
        [{ color: Colors.Orange }, { color: Colors.Orange }, { color: Colors.Orange }],
    ],
}