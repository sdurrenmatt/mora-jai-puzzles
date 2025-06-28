import { useCallback, useEffect, useState } from "react"
import { pressTile, updateCorner, updateSolved } from "../logic/puzzleActions"
import { isCornerMatched } from "../logic/puzzleUtils"
import type { CornerPosition } from "../types/cornerPositions"
import type { Puzzle } from "../types/puzzle"
import type { AudioPlayer } from "./useAudio"

export function usePuzzleState(initialPuzzle: Puzzle, clickAudio: AudioPlayer, openAudio: AudioPlayer) {
    const [puzzle, setPuzzle] = useState(initialPuzzle)

    useEffect(() => {
        if (puzzle.solved) {
            openAudio.play()
        }
    }, [puzzle.solved, openAudio])

    const onCornerClick = useCallback((position: CornerPosition) => {
        clickAudio.play()
        setPuzzle(currentPuzzle => {
            if (currentPuzzle.corners[position].matched) return currentPuzzle

            if (isCornerMatched(currentPuzzle, position)) {
                const puzzleAfterUpdateCorner = updateCorner(currentPuzzle, position)
                return updateSolved(puzzleAfterUpdateCorner)
            }

            return initialPuzzle
        })
    }, [clickAudio, initialPuzzle])

    const onTileClick = useCallback((i: number, j: number) => {
        clickAudio.play()
        setPuzzle(currentPuzzle => {
            const puzzleAfterPressTile = pressTile(currentPuzzle, i, j)

            const corners: CornerPosition[] = ["tl", "tr", "bl", "br"]
            const cornersToUpdate = corners.filter(position => currentPuzzle.corners[position].matched)

            return cornersToUpdate.reduce(
                (puzzle, position) => updateCorner(puzzle, position),
                puzzleAfterPressTile
            )
        })
    }, [clickAudio])

    return { puzzle, onCornerClick, onTileClick }
}