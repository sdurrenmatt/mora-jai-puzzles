import { Colors, type Color } from "../types/colors"
import type { Puzzle } from "../types/puzzle"
import { getAdjacentTiles, countColors, findMajorColor, getSurroundingPositions, getAdjacentPositions, isSolved } from "./puzzleUtils"

function swapTiles(p: Puzzle, i1: number, j1: number, i2: number, j2: number) {
    if (i1 === i2 && j1 === j2) return p

    const newTiles = p.tiles.map(row => [...row])

    const tmpTile = newTiles[i1][j1]
    newTiles[i1][j1] = newTiles[i2][j2]
    newTiles[i2][j2] = tmpTile

    return { ...p, tiles: newTiles }
}

function shiftTiles(p: Puzzle, positions: [number, number][]): Puzzle {
    const newTiles = p.tiles.map(row => [...row])
    const tilesToShift = positions.map(([x, y]) => p.tiles[x][y])
    const shiftedTiles = [tilesToShift[tilesToShift.length - 1], ...tilesToShift.slice(0, -1)]

    positions.forEach(([x, y], i) => {
        newTiles[x][y] = shiftedTiles[i]
    })

    return { ...p, tiles: newTiles }
}

function pressBlackTile(p: Puzzle, i: number) {
    const newTiles = p.tiles.map((row, rowIndex) => rowIndex === i ? [row[row.length - 1], ...row.slice(0, -1)] : row)
    return { ...p, tiles: newTiles }
}

function pressBlueTile(p: Puzzle, i: number, j: number) {
    const middleTileColor = p.tiles[1][1].color

    if (middleTileColor === Colors.Blue) return p

    const tilePresser = colorTilePressers[middleTileColor]
    return tilePresser ? tilePresser(p, i, j) : p
}

function pressGrayTile(p: Puzzle) {
    return p
}

function pressGreenTile(p: Puzzle, i: number, j: number) {
    return swapTiles(p, i, j, 2 - i, 2 - j)
}

function pressOrangeTile(p: Puzzle, i: number, j: number) {
    const adjacentTiles = getAdjacentTiles(p, i, j)
    const colorCounts = countColors(adjacentTiles)
    const majorColor = findMajorColor(colorCounts)

    if (majorColor === null) return p

    const newTiles = p.tiles.map(row => [...row])
    newTiles[i][j] = { ...newTiles[i][j], color: majorColor }
    return { ...p, tiles: newTiles }
}

function pressPinkTile(p: Puzzle, i: number, j: number) {
    const positions = getSurroundingPositions(i, j)
    return shiftTiles(p, positions)
}

function pressRedTile(p: Puzzle) {
    const colorSwitch: Partial<Record<Color, Color>> = {
        [Colors.White]: Colors.Black,
        [Colors.Black]: Colors.Red,
    }

    const newTiles = p.tiles.map(row => row.map(tile => ({ ...tile, color: colorSwitch[tile.color] ?? tile.color })))
    return { ...p, tiles: newTiles }
}

function pressVioletTile(p: Puzzle, i: number, j: number) {
    if (i === 2) return p
    return swapTiles(p, i, j, i + 1, j)
}

function pressWhiteTile(p: Puzzle, i: number, j: number) {
    const newTiles = p.tiles.map(row => [...row])

    newTiles[i][j] = { ...newTiles[i][j], color: Colors.Gray }

    const adjacentPositions = getAdjacentPositions(i, j)
    for (const [x, y] of adjacentPositions) {
        if (newTiles[x][y].color === Colors.Gray) {
            newTiles[x][y] = { ...newTiles[x][y], color: Colors.White }
        } else if (newTiles[x][y].color === Colors.White) {
            newTiles[x][y] = { ...newTiles[x][y], color: Colors.Gray }
        }
    }

    return { ...p, tiles: newTiles }
}

function pressYellowTile(p: Puzzle, i: number, j: number) {
    if (i === 0) return p
    return swapTiles(p, i, j, i - 1, j)
}

type ColorTilePresser = (p: Puzzle, i: number, j: number) => Puzzle

const colorTilePressers: Record<string, ColorTilePresser> = {
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

export function pressTile(p: Puzzle, i: number, j: number) {
    const color = p.tiles[i][j].color
    const tilePresser = colorTilePressers[color]

    const newPuzzle = tilePresser ? tilePresser(p, i, j) : p
    const solved = isSolved(newPuzzle)

    return solved === p.solved ? newPuzzle : { ...newPuzzle, solved }
}