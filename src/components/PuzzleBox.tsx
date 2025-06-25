import { useEffect, useRef, useState } from "react"
import type { Puzzle } from "../types/puzzle"
import { Colors } from "../types/colors"
import { pressTile } from "../logic/puzzleActions"
import "./PuzzleBox.css"
import "../styles/textures.css"

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

    const clickAudio = useRef(new Audio("/sounds/click.mp3"))
    const openingLittleBoxAudio = useRef(new Audio("/sounds/opening-little-box.mp3"))

    function playClickAudio() {
        clickAudio.current.currentTime = 0
        clickAudio.current.play()
    }

    function playOpeningLittleBoxAudio() {
        openingLittleBoxAudio.current.currentTime = 0
        openingLittleBoxAudio.current.play()
    }

    useEffect(() => {
        if (puzzle.solved) {
            playOpeningLittleBoxAudio()
        }
    }, [puzzle.solved])

    function updatePuzzle(i: number, j: number) {
        const newPuzzle = pressTile(puzzle, i, j)
        setPuzzle(newPuzzle)
    }

    function onTileClick(i: number, j: number) {
        playClickAudio()
        updatePuzzle(i, j)
    }

    return (
        <div className="puzzle-box-wrapper">
            <div className={`puzzle-box ${puzzle.solved ? "puzzle-box--solved" : ""} wood-texture wood-filter--dark`}>
                <div className="puzzle-box__corner puzzle-box__corner--tl wood-texture wood-filter--light" style={{ backgroundColor: puzzle.corners.tl.color }} />
                <div className="puzzle-box__corner puzzle-box__corner--tr wood-texture wood-filter--light" style={{ backgroundColor: puzzle.corners.tr.color }} />
                <div className="puzzle-box__corner puzzle-box__corner--bl wood-texture wood-filter--light" style={{ backgroundColor: puzzle.corners.bl.color }} />
                <div className="puzzle-box__corner puzzle-box__corner--br wood-texture wood-filter--light" style={{ backgroundColor: puzzle.corners.br.color }} />
                <div className="puzzle-box__inner-base wood-texture wood-filter--light">
                    <div className="puzzle-box__outer-base wood-texture wood-filter--dim">
                        <div className="puzzle-box__grid">
                            {
                                puzzle.tiles.flatMap((row, i) =>
                                    row.map((tile, j) => (
                                        <div
                                            key={`${i}-${j}`}
                                            className="puzzle-box__tile wood-texture wood-filter--light"
                                            style={{ backgroundColor: tile.color }}
                                            onClick={() => onTileClick(i, j)}
                                        />
                                    ))
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PuzzleBox