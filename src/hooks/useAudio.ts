import { useCallback, useMemo, useRef } from "react"

export type AudioPlayer = {
  play: () => void
}

export function useAudio(src: string): AudioPlayer {
  const audioRef = useRef(new Audio(src))

  const play = useCallback(() => {
    audioRef.current.currentTime = 0
    audioRef.current.play()
  }, [])

  return useMemo(() => ({ play }), [play])
}
