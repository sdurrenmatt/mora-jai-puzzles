import { CornerPositions, type CornerPosition } from "../../types/cornerPositions"
import type { Corners } from "../../types/corners"
import PuzzleCorner from "../PuzzleCorner/PuzzleCorner"

type PuzzleCornersProps = {
    corners: Corners
    onCornerClick?: (position: CornerPosition) => void
}

function PuzzleCorners({ corners, onCornerClick }: PuzzleCornersProps) {
    return (
        <>
            {
                Object.values(CornerPositions).map(position => (
                    <PuzzleCorner
                        key={position}
                        position={position}
                        color={corners[position].color}
                        matched={corners[position].matched}
                        onClick={onCornerClick ? () => onCornerClick(position) : undefined}
                    />
                ))
            }
        </>
    )
}

export default PuzzleCorners