import clsx from "clsx"
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
            [{ color: Colors.Pink }, { color: Colors.Pink }, { color: Colors.Gray }],
            [{ color: Colors.Gray }, { color: Colors.Gray }, { color: Colors.Gray }],
            [{ color: Colors.Orange }, { color: Colors.Orange }, { color: Colors.Orange }],
        ],
        solved: false
    })

    const clickAudio = useAudio(clickTileSound)
    const openAudio = useAudio(openBoxSound)

    useEffect(() => {
        if (puzzle.solved) {
            openAudio.play()
        }
    }, [puzzle.solved, openAudio])

    const onTileClick = useCallback((i: number, j: number) => {
        clickAudio.play()
        setPuzzle(p => pressTile(p, i, j))
    }, [clickAudio])

    return (
        <div className="puzzle-box-wrapper">
            <div className={clsx("puzzle-box", { "puzzle-box--solved": puzzle.solved }, "wood-texture wood-filter--dark")}>
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