import clsx from "clsx"
import clickTileSound from "../../assets/sounds/click-tile.mp3"
import openBoxSound from "../../assets/sounds/open-box.mp3"
import { useAudio } from "../../hooks/useAudio"
import { usePuzzleState } from "../../hooks/usePuzzleState"
import type { Puzzle } from "../../types/puzzle"
import PuzzleCorners from "../PuzzleCorners/PuzzleCorners"
import PuzzleGrid from "../PuzzleGrid/PuzzleGrid"
import PuzzleNote from "../PuzzleNote/PuzzleNote"
import "./PuzzleBox.css"

type PuzzleBoxProps = {
    puzzleData: Puzzle
}

function PuzzleBox({ puzzleData }: PuzzleBoxProps) {
    const clickAudio = useAudio(clickTileSound)
    const openAudio = useAudio(openBoxSound)

    const { puzzle, onCornerClick, onTileClick } = usePuzzleState(puzzleData, clickAudio, openAudio)

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