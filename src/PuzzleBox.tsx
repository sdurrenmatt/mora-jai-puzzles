import { useState } from "react"
import { ORANGE } from './colors';
import "./PuzzleBox.css"

function PuzzleBox() {
    const [tiles, setTiles] = useState([
        [{ id: 1, color: ORANGE }, { id: 2, color: ORANGE }, { id: 3, color: ORANGE }],
        [{ id: 4, color: ORANGE }, { id: 5, color: ORANGE }, { id: 6, color: ORANGE }],
        [{ id: 7, color: ORANGE }, { id: 8, color: ORANGE }, { id: 9, color: ORANGE }],
    ]);

    function handleTileClick(i: number, j: number) {
        const tile = tiles[i][j]
        console.log("color is: " + tile.color)
    }

    return (
        <div className="box-wrapper">
            <div className="box">
                <div className="corner corner-tl" />
                <div className="corner corner-tr" />
                <div className="corner corner-bl" />
                <div className="corner corner-br" />
                <div className="inner-box">
                    <div className="grid">
                        {
                            tiles.map((row, i) =>
                                row.map((tile, j) => (
                                    <div key={tile.id}
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