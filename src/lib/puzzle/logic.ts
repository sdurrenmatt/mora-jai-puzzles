import { Colors, CornerPositions, type Color, type CornerPosition, type Puzzle } from "./types"
import {
    checkMatched,
    checkSolved,
    findMajorColor,
    getAdjacentPositions,
    getAdjacentTiles,
    getSurroundingPositions,
    markMatched,
    markSolved,
    shiftRow,
    shiftTiles,
    swapTiles,
    unmarkMatched
} from "./utils"

function pressBlackTile(p: Puzzle, i: number): Puzzle {
    return shiftRow(p, i)
}

function pressBlueTile(p: Puzzle, i: number, j: number): Puzzle {
    const middleTileColor = p.tiles[1][1].color

    if (middleTileColor === Colors.Blue) return p

    const tilePresser = colorTilePressers[middleTileColor]
    return tilePresser ? tilePresser(p, i, j) : p
}

function pressGrayTile(p: Puzzle): Puzzle {
    return p
}

function pressGreenTile(p: Puzzle, i: number, j: number): Puzzle {
    return swapTiles(p, i, j, 2 - i, 2 - j)
}

function pressOrangeTile(p: Puzzle, i: number, j: number): Puzzle {
    const adjacentTiles = getAdjacentTiles(p, i, j)
    const majorColor = findMajorColor(adjacentTiles)

    if (majorColor === null) return p

    const newTiles = p.tiles.map(row => [...row])
    newTiles[i][j] = { ...newTiles[i][j], color: majorColor }
    return { ...p, tiles: newTiles }
}

function pressPinkTile(p: Puzzle, i: number, j: number): Puzzle {
    const positions = getSurroundingPositions(p, i, j)
    return shiftTiles(p, positions)
}

function pressRedTile(p: Puzzle): Puzzle {
    const colorSwitch: Partial<Record<Color, Color>> = {
        [Colors.White]: Colors.Black,
        [Colors.Black]: Colors.Red,
    }

    const newTiles = p.tiles.map(row => row.map(tile => ({ ...tile, color: colorSwitch[tile.color] ?? tile.color })))
    return { ...p, tiles: newTiles }
}

function pressVioletTile(p: Puzzle, i: number, j: number): Puzzle {
    if (i === 2) return p
    return swapTiles(p, i, j, i + 1, j)
}

function pressWhiteTile(p: Puzzle, i: number, j: number): Puzzle {
    const newTiles = p.tiles.map((row) => [...row])

    newTiles[i][j] = { ...newTiles[i][j], color: Colors.Gray }

    const adjacentPositions = getAdjacentPositions(p, i, j)
    for (const [x, y] of adjacentPositions) {
        if (newTiles[x][y].color === Colors.Gray) {
            newTiles[x][y] = { ...newTiles[x][y], color: Colors.White }
        } else if (newTiles[x][y].color === Colors.White) {
            newTiles[x][y] = { ...newTiles[x][y], color: Colors.Gray }
        }
    }

    return { ...p, tiles: newTiles }
}

function pressYellowTile(p: Puzzle, i: number, j: number): Puzzle {
    if (i === 0) return p
    return swapTiles(p, i, j, i - 1, j)
}

type ColorTilePresser = (p: Puzzle, i: number, j: number) => Puzzle

const colorTilePressers: Record<Color, ColorTilePresser> = {
    [Colors.Black]: (p, i, _j) => pressBlackTile(p, i),
    [Colors.Blue]: (p, i, j) => pressBlueTile(p, i, j),
    [Colors.Gray]: (p, _i, _j) => pressGrayTile(p),
    [Colors.Green]: (p, i, j) => pressGreenTile(p, i, j),
    [Colors.Orange]: (p, i, j) => pressOrangeTile(p, i, j),
    [Colors.Pink]: (p, i, j) => pressPinkTile(p, i, j),
    [Colors.Red]: (p, _i, _j) => pressRedTile(p),
    [Colors.Violet]: (p, i, j) => pressVioletTile(p, i, j),
    [Colors.White]: (p, i, j) => pressWhiteTile(p, i, j),
    [Colors.Yellow]: (p, i, j) => pressYellowTile(p, i, j),
}

function pressTile(p: Puzzle, i: number, j: number): Puzzle {
    const color = p.tiles[i][j].color
    const tilePresser = colorTilePressers[color]
    return tilePresser(p, i, j)
}

export function handleCornerClick(puzzle: Puzzle, position: CornerPosition, initialPuzzle: Puzzle): Puzzle {
    if (puzzle.corners[position].matched) return puzzle

    if (checkMatched(puzzle, position)) {
        const puzzleAfterUpdateCorner = markMatched(puzzle, position)
        return checkSolved(puzzleAfterUpdateCorner) ? markSolved(puzzleAfterUpdateCorner) : puzzleAfterUpdateCorner
    }

    return initialPuzzle
}

export function handleTileClick(p: Puzzle, i: number, j: number): Puzzle {
    const puzzleAfterPressTile = pressTile(p, i, j)

    const cornersToUpdate = Object.values(CornerPositions).filter(position => puzzleAfterPressTile.corners[position].matched)
    return cornersToUpdate.reduce(
        (puzzle, position) => checkMatched(puzzle, position) ? puzzle : unmarkMatched(puzzle, position),
        puzzleAfterPressTile
    )
}