import { useRef, useState } from "react"
import { Colors } from "../types/colors"
import "./PuzzleBox.css"
import type { Puzzle } from "../types/puzzle"
import { pressTile } from "../logic/puzzleActions"

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
            [{ color: Colors.Gray }, { color: Colors.Gray }, { color: Colors.Gray }],
            [{ color: Colors.Pink }, { color: Colors.Orange }, { color: Colors.Pink }],
        ],
        solved: false
    })

    const clickAudio = useRef(new Audio("/sounds/click.mp3"))

    function onTileClick(i: number, j: number) {
        playClickSound()
        updatePuzzle(i, j)
    }

    function playClickSound() {
        clickAudio.current.currentTime = 0.2
        clickAudio.current.play()
    }

    function updatePuzzle(i: number, j: number) {
        const newPuzzle = pressTile(puzzle, i, j)
        setPuzzle(newPuzzle)
    }

    return (
        <div className="puzzle-box-wrapper">
            <div className={`puzzle-box ${puzzle.solved ? "puzzle-box--solved" : ""} wood-texture wood-filter--dark`}>
                <div className="puzzle-box__corner puzzle-box__corner--tl wood-texture wood-filter--light" style={{ backgroundColor: puzzle.corners.tl.color }} />
                <div className="puzzle-box__corner puzzle-box__corner--tr wood-texture wood-filter--light" style={{ backgroundColor: puzzle.corners.tr.color }} />
                <div className="puzzle-box__corner puzzle-box__corner--bl wood-texture wood-filter--light" style={{ backgroundColor: puzzle.corners.bl.color }} />
                <div className="puzzle-box__corner puzzle-box__corner--br wood-texture wood-filter--light" style={{ backgroundColor: puzzle.corners.br.color }} />
                <div className="puzzle-box__grid-wrapper wood-texture wood-filter--dim">
                    <div className="puzzle-box__grid">
                        {
                            puzzle.tiles.flatMap((row, i) =>
                                row.map((tile, j) => (
                                    <div
                                        key={`${i}-${j}`}
                                        className="puzzle-box__tile wood-texture wood-filter--light"
                                        style={{ backgroundColor: tile.color }}
                                        onClick={puzzle.solved ? undefined : () => onTileClick(i, j)}
                                    />
                                ))
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PuzzleBox