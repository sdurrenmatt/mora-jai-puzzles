import type { CornerPosition } from "../../types/cornerPositions"
import type { Corners } from "../../types/corners"
import PuzzleCorner from "../PuzzleCorner/PuzzleCorner"

type PuzzleCornersProps = {
    corners: Corners
    onCornerClick?: (position: CornerPosition) => void
}

function PuzzleCorners({ corners, onCornerClick }: PuzzleCornersProps) {
    return (
        <>
            <PuzzleCorner position="tl" color={corners.tl.color} matched={corners.tl.matched} onClick={onCornerClick ? () => onCornerClick("tl") : undefined} />
            <PuzzleCorner position="tr" color={corners.tr.color} matched={corners.tr.matched} onClick={onCornerClick ? () => onCornerClick("tr") : undefined} />
            <PuzzleCorner position="bl" color={corners.bl.color} matched={corners.bl.matched} onClick={onCornerClick ? () => onCornerClick("bl") : undefined} />
            <PuzzleCorner position="br" color={corners.br.color} matched={corners.br.matched} onClick={onCornerClick ? () => onCornerClick("br") : undefined} />
        </>
    )
}

export default PuzzleCorners