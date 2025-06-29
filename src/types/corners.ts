import type { Corner } from "./corner"
import type { CornerPosition } from "./cornerPositions"

export type Corners = {
    [key in CornerPosition]: Corner
}