export const Colors = {
    Black: "Black",
    Blue: "Blue",
    Gray: "Gray",
    Green: "Green",
    Orange: "Orange",
    Pink: "Pink",
    Red: "Red",
    Violet: "Violet",
    White: "White",
    Yellow: "Yellow",
} as const

export type Color = typeof Colors[keyof typeof Colors]

export type Corner = {
    color: Color,
    matched?: boolean,
}

export const CornerPositions = {
    TL: "tl",
    TR: "tr",
    BL: "bl",
    BR: "br",
} as const

export type CornerPosition = typeof CornerPositions[keyof typeof CornerPositions]

export type Corners = {
    [key in CornerPosition]: Corner
}

export type Tile = {
    color: Color,
}

export type Puzzle = {
    corners: Corners
    tiles: Tile[][]
    solved?: boolean
}
