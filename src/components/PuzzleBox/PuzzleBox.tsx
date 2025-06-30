import clsx from "clsx"
import { usePuzzleState } from "../../hooks/usePuzzleState"
import type { Puzzle } from "../../lib/puzzle/types"
import PuzzleCorners from "../PuzzleCorners/PuzzleCorners"
import PuzzleGrid from "../PuzzleGrid/PuzzleGrid"
import PuzzleNote from "../PuzzleNote/PuzzleNote"
import "./PuzzleBox.css"

type PuzzleBoxProps = {
    puzzleData: Puzzle
}

function PuzzleBox({ puzzleData }: PuzzleBoxProps) {
    const { puzzle, onCornerClick, onTileClick } = usePuzzleState(puzzleData)

    return (
        <div className="puzzle-box-wrapper">
            <div className={clsx("puzzle-box", puzzle.solved && "puzzle-box--solved", "wood-texture wood-filter--dark")}>
                <PuzzleCorners corners={puzzle.corners} onCornerClick={onCornerClick} />
                <div className="puzzle-box__base wood-texture wood-filter--light">
                    <div className="puzzle-box__puzzle-note">
                        <PuzzleNote />
                    </div>
                    <div className="puzzle-box__puzzle-grid wood-texture wood-filter--dim">
                        <PuzzleGrid tiles={puzzle.tiles} onTileClick={onTileClick} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PuzzleBox