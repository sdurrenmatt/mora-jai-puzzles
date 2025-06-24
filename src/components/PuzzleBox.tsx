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
            [{ color: Colors.Pink }, { color: Colors.Pink }, { color: Colors.Gray }],
            [{ color: Colors.Gray }, { color: Colors.Gray }, { color: Colors.Gray }],
            [{ color: Colors.Orange }, { color: Colors.Orange }, { color: Colors.Orange }],
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
        <div className="box-wrapper">
            <div className="box">
                <div className="corner corner-tl" style={{ backgroundColor: puzzle.corners.tl.color }} />
                <div className="corner corner-tr" style={{ backgroundColor: puzzle.corners.tr.color }} />
                <div className="corner corner-bl" style={{ backgroundColor: puzzle.corners.bl.color }} />
                <div className="corner corner-br" style={{ backgroundColor: puzzle.corners.br.color }} />
                <div className="inner-box">
                    <div className="grid">
                        {
                            puzzle.tiles.map((row, i) =>
                                row.map((tile, j) => (
                                    <div key={`${i}-${j}`}
                                        className="tile"
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
    )
}

export default PuzzleBox