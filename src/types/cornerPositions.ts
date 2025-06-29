export const CornerPositions = {
    TL: "tl",
    TR: "tr",
    BL: "bl",
    BR: "br",
} as const

export type CornerPosition = typeof CornerPositions[keyof typeof CornerPositions]