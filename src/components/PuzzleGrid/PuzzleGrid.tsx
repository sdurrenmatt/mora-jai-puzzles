
import type { Tile } from "../../lib/puzzle/types"
import PuzzleTile from "../PuzzleTile/PuzzleTile"
import "./PuzzleGrid.css"

type PuzzleGridProps = {
    tiles: Tile[][]
    onTileClick?: (i: number, j: number) => void
}

function PuzzleGrid({ tiles, onTileClick }: PuzzleGridProps) {
    return (
        <div className="puzzle-grid">
            {
                tiles.flatMap((row, i) =>
                    row.map((tile, j) => (
                        <PuzzleTile
                            key={`${i}-${j}`}
                            color={tile.color}
                            onClick={onTileClick ? () => onTileClick(i, j) : undefined}
                        />
                    ))
                )
            }
        </div>
    )
}

export default PuzzleGrid