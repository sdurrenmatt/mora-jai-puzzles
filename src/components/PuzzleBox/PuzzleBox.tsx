import { useCallback, useEffect, useState } from "react"
import clickTileSound from "../../assets/sounds/click-tile.mp3"
import openBoxSound from "../../assets/sounds/open-box.mp3"
import { useAudio } from "../../hooks/useAudio"
import { pressTile } from "../../logic/puzzleActions"
import { Colors } from "../../types/colors"
import type { Puzzle } from "../../types/puzzle"
import PuzzleCorners from "../PuzzleCorners/PuzzleCorners"
import PuzzleGrid from "../PuzzleGrid/PuzzleGrid"
import PuzzleNote from "../PuzzleNote/PuzzleNote"
import "./PuzzleBox.css"

function PuzzleBox() {
    const [puzzle, setPuzzle] = useState<Puzzle>({
        corners: {
            tl: { color: Colors.Pink },
            tr: { color: Colors.Pink },
            bl: { color: Colors.Pink },
            br: { color: Colors.Pink },
        },
        tiles: [
            [{ color: Colors.Pink }, { color: Colors.Pink }, { color: Colors.Pink }],
            [{ color: Colors.Pink }, { color: Colors.Pink }, { color: Colors.Gray }],
            [{ color: Colors.Pink }, { color: Colors.Pink }, { color: Colors.Pink }],
        ],
        solved: false
    })

    const clickAudio = useAudio(clickTileSound)
    const openAudio = useAudio(openBoxSound)

    useEffect(() => {
        if (puzzle.solved) {
            openAudio.play()
        }
    }, [puzzle.solved])

    const updatePuzzle = useCallback((i: number, j: number) => {
        const newPuzzle = pressTile(puzzle, i, j)
        setPuzzle(newPuzzle)
    }, [puzzle])

    const onTileClick = useCallback((i: number, j: number) => {
        clickAudio.play()
        updatePuzzle(i, j)
    }, [clickAudio, updatePuzzle])

    return (
        <div className="puzzle-box-wrapper">
            <div className={`puzzle-box${puzzle.solved ? " puzzle-box--solved" : ""} wood-texture wood-filter--dark`}>
                <PuzzleCorners corners={puzzle.corners} />
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