import { useCallback, useEffect, useRef, useState } from "react"
import clickSound from "../assets/sounds/click.mp3"
import lightSwitchSound from "../assets/sounds/light-switch.mp3"
import openingLittleBoxSound from "../assets/sounds/opening-little-box.mp3"
import { handleCornerClick, handleTileClick } from "../lib/puzzle"
import type { CornerPosition, Puzzle } from "../lib/puzzle/types"
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
        setPuzzle(currentPuzzle => handleCornerClick(currentPuzzle, position, initialPuzzleRef.current))
    }, [lightSwitchAudio])

    const onTileClick = useCallback((i: number, j: number) => {
        clickAudio.play()
        setPuzzle(currentPuzzle => handleTileClick(currentPuzzle, i, j))
    }, [clickAudio])

    return { puzzle, onCornerClick, onTileClick }
}