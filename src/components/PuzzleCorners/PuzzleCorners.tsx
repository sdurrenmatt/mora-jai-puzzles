import type { Corners } from "../../types/corners"
import PuzzleCorner from "../PuzzleCorner/PuzzleCorner"

type PuzzleCornersProps = {
    corners: Corners
}

function PuzzleCorners({ corners }: PuzzleCornersProps) {
    return (
        <>
            <PuzzleCorner position="tl" color={corners.tl.color} />
            <PuzzleCorner position="tr" color={corners.tr.color} />
            <PuzzleCorner position="bl" color={corners.bl.color} />
            <PuzzleCorner position="br" color={corners.br.color} />
        </>
    )
}

export default PuzzleCorners