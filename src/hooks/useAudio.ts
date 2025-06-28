import { useCallback, useMemo, useRef } from "react"

export function useAudio(src: string) {
  const audioRef = useRef(new Audio(src))

  const play = useCallback(() => {
    audioRef.current.currentTime = 0
    audioRef.current.play()
  }, [])

  return useMemo(() => ({ play }), [play])
}