import clsx from "clsx"
import type { Color, CornerPosition } from "../../lib/puzzle/types"
import { ColorHexCodes } from "../../styles/colors"
import "./PuzzleCorner.css"

type PuzzleCornerProps = {
    position: CornerPosition
    color: Color
    matched?: boolean
    onClick?: () => void
}

function PuzzleCorner({ position, color, matched, onClick }: PuzzleCornerProps) {
    return (
        <div className={clsx(
            "puzzle-corner",
            `puzzle-corner--${position}`,
            matched && "puzzle-corner--lit",
            "wood-texture",
            "wood-filter--light"
        )}
            style={{ backgroundColor: ColorHexCodes[color] }}
            onClick={onClick} />
    )
}

export default PuzzleCorner
