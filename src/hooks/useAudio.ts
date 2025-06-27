import { useRef } from "react"

export function useAudio(src: string) {
  const audioRef = useRef(new Audio(src))

  function play() {
    audioRef.current.currentTime = 0
    audioRef.current.play()
  }

  return { play }
}