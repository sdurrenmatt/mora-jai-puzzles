export const CornerPositions = ["tl", "tr", "bl", "br"] as const

export type CornerPosition = typeof CornerPositions[number]