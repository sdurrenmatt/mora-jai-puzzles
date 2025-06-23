import { useState } from "react"
import type { Tile } from "../types/tile"
import { Colors } from "../types/colors"
import "./PuzzleBox.css"

function PuzzleBox() {
    const [tiles, setTiles] = useState<Tile[][]>([
        [{ id: 1, color: Colors.Orange }, { id: 2, color: Colors.Orange }, { id: 3, color: Colors.Orange }],
        [{ id: 4, color: Colors.Orange }, { id: 5, color: Colors.Orange }, { id: 6, color: Colors.Orange }],
        [{ id: 7, color: Colors.Orange }, { id: 8, color: Colors.Orange }, { id: 9, color: Colors.Orange }],
    ])

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