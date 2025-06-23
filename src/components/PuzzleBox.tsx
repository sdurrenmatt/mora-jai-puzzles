import { useState } from "react"
import { Colors } from "../types/colors"
import "./PuzzleBox.css"
import type { Puzzle } from "../types/puzzle";

function PuzzleBox() {
    const [puzzle, setPuzzle] = useState<Puzzle>({
        corners: {
            tl: { color: Colors.Black },
            tr: { color: Colors.Black },
            bl: { color: Colors.Black },
            br: { color: Colors.Black },
        },
        tiles: [
            [{ color: Colors.Black }, { color: Colors.Gray }, { color: Colors.White }],
            [{ color: Colors.Green }, { color: Colors.Orange }, { color: Colors.Pink }],
            [{ color: Colors.Red }, { color: Colors.Violet }, { color: Colors.Yellow }],
        ]
    }
    )

    function handleTileClick(i: number, j: number) {
        const tile = puzzle.tiles[i][j]
        console.log("color is: " + tile.color)
    }

    return (
        <div className="box-wrapper">
            <div className="box">
                <div className="corner corner-tl" style={{backgroundColor: puzzle.corners.tl.color }} />
                <div className="corner corner-tr" style={{backgroundColor: puzzle.corners.tr.color }} />
                <div className="corner corner-bl" style={{backgroundColor: puzzle.corners.bl.color }} />
                <div className="corner corner-br" style={{backgroundColor: puzzle.corners.br.color }} />
                <div className="inner-box">
                    <div className="grid">
                        {
                            puzzle.tiles.map((row, i) =>
                                row.map((tile, j) => (
                                    <div key={`${i}-${j}`}
                                        className="tile"
                                        style={{ backgroundColor: tile.color }}
                                        onClick={() => handleTileClick(i, j)}
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