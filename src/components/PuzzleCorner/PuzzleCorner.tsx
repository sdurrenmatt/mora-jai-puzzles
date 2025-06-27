import type { Color } from "../../types/colors"
import "./PuzzleCorner.css"

type PuzzleCornerProps = {
    position: "tl" | "tr" | "bl" | "br"
    color: Color
}

function PuzzleCorner({ position, color }: PuzzleCornerProps) {
    return (
        <div className={`puzzle-corner puzzle-corner--${position} wood-texture wood-filter--light`}
            style={{ backgroundColor: color }} />
    )
}

export default PuzzleCorner