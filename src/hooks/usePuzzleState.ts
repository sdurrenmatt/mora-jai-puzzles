import { useCallback, useEffect, useRef, useState } from "react"
import clickSound from "../assets/sounds/click.mp3"
import lightSwitchSound from "../assets/sounds/light-switch.mp3"
import openingLittleBoxSound from "../assets/sounds/opening-little-box.mp3"
import { pressTile, updateCorner, updateSolved } from "../logic/puzzleActions"
import { isCornerMatched } from "../logic/puzzleUtils"
import { CornerPositions, type CornerPosition } from "../types/cornerPositions"
import type { Puzzle } from "../types/puzzle"
import { useAudio } from "./useAudio"

export function usePuzzleState(initialPuzzle: Puzzle) {
    const initialPuzzleRef = useRef(initialPuzzle)
    const [puzzle, setPuzzle] = useState(initialPuzzle)

    const lightSwitchAudio = useAudio(lightSwitchSound)
    const clickAudio = useAudio(clickSound)
    const openingLittleBoxAudio = useAudio(openingLittleBoxSound)

    useEffect(() => {
        if (puzzle.solved) {
            openingLittleBoxAudio.play()
        }
    }, [puzzle.solved, openingLittleBoxAudio])

    const onCornerClick = useCallback((position: CornerPosition) => {
        lightSwitchAudio.play()
        setPuzzle(currentPuzzle => {
            if (currentPuzzle.corners[position].matched) return currentPuzzle

            if (isCornerMatched(currentPuzzle, position)) {
                const puzzleAfterUpdateCorner = updateCorner(currentPuzzle, position)
                return updateSolved(puzzleAfterUpdateCorner)
            }

            return initialPuzzleRef.current
        })
    }, [lightSwitchAudio])

    const onTileClick = useCallback((i: number, j: number) => {
        clickAudio.play()
        setPuzzle(currentPuzzle => {
            const puzzleAfterPressTile = pressTile(currentPuzzle, i, j)
            const cornersToUpdate = Object.values(CornerPositions).filter(position => currentPuzzle.corners[position].matched)
            return cornersToUpdate.reduce(
                (puzzle, position) => updateCorner(puzzle, position),
                puzzleAfterPressTile
            )
        })
    }, [clickAudio])

    return { puzzle, onCornerClick, onTileClick }
}